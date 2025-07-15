import { NextResponse } from 'next/server';
import { DiscogsSDK } from '@crate.ai/discogs-sdk';
import { cookies } from 'next/headers';
import type { SearchParams, SearchResult, SearchResponse } from '@/types';

function buildSearchParams(originalQuery: string): SearchParams {
  const terms = originalQuery.trim().split(/\s+/);

  // If searching for a specific release (contains hyphen)
  if (originalQuery.includes('-')) {
    const [artist, title] = originalQuery.split('-').map((s) => s.trim());
    return {
      artist: artist,
      releaseTitle: title,
      type: 'release', // Changed from 'master' to 'release' to find specific releases
    };
  }

  // Multi-word search without hyphen
  if (terms.length > 1) {
    return {
      query: originalQuery,
      type: 'release',
      format: 'Vinyl', // Add format to narrow down results
    };
  }

  return {
    query: originalQuery,
    type: 'release',
  };
}

export async function POST(request: Request) {
  try {
    const { query: originalQuery } = await request.json();

    if (!originalQuery?.trim()) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 },
      );
    }

    const accessToken = cookies().get('access_token')?.value;
    const accessTokenSecret = cookies().get('access_token_secret')?.value;

    if (!accessToken || !accessTokenSecret) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    const sdk = new DiscogsSDK({
      DiscogsConsumerKey: process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_KEY || '',
      DiscogsConsumerSecret:
        process.env.NEXT_PUBLIC_DISCOGS_CONSUMER_SECRET || '',
      userAgent: 'CrateApp/1.0 +https://crate.ai',
    });

    const tokenManager = sdk.auth.base.getTokenManager();
    await tokenManager.setAccessToken(accessToken);
    await tokenManager.setAccessTokenSecret(accessTokenSecret);

    const searchParams = buildSearchParams(originalQuery);

    const response = (await sdk.search.getSearchResults(
      searchParams,
    )) as unknown as SearchResponse;

    // Enhance relevance sorting
    const normalizedQuery = originalQuery.toLowerCase().trim();
    const terms = normalizedQuery.split(/\s+/);

    const sortedResults = [...response.results].sort(
      (a: SearchResult, b: SearchResult) => {
        const titleA = (a.title || '').toLowerCase();
        const titleB = (b.title || '').toLowerCase();

        // Match all terms
        const aMatchesAll = terms.every((term: string) =>
          titleA.includes(term.toLowerCase()),
        );
        const bMatchesAll = terms.every((term: string) =>
          titleB.includes(term.toLowerCase()),
        );

        if (aMatchesAll && !bMatchesAll) return -1;
        if (!aMatchesAll && bMatchesAll) return 1;

        // Count matching terms
        const aMatchCount = terms.filter((term: string) =>
          titleA.includes(term.toLowerCase()),
        ).length;
        const bMatchCount = terms.filter((term: string) =>
          titleB.includes(term.toLowerCase()),
        ).length;

        if (aMatchCount !== bMatchCount) {
          return bMatchCount - aMatchCount;
        }

        // Prefer matches at the start of the title
        const aStartsWithTerm = terms.some((term: string) =>
          titleA.startsWith(term.toLowerCase()),
        );
        const bStartsWithTerm = terms.some((term: string) =>
          titleB.startsWith(term.toLowerCase()),
        );

        if (aStartsWithTerm && !bStartsWithTerm) return -1;
        if (!aStartsWithTerm && bStartsWithTerm) return 1;

        return 0;
      },
    );

    return NextResponse.json({
      results: sortedResults,
      pagination: response.pagination,
    });
  } catch (error) {
    console.error('Discogs search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Discogs' },
      { status: 500 },
    );
  }
}
