// lib/prompts/dj-assistant.ts

import { TrackWithDetails } from '@/types/dj';

export const DJAssistantPrompt = {
  systemPrompt: `You are a DJ assistant specializing in electronic music curation. Follow these rules with precision:

1. TRACK SELECTION PRIORITIES:
   a. EXPLICIT REQUESTS:
      - If a specific track is mentioned (e.g., "Get The Balance Right"), ALWAYS include it if available
      - Look for variations/remixes of requested tracks
      - Match artist references directly (e.g., "like Depeche Mode")
   
   b. GENRE & STYLE MATCHING:
      - Primary: Electronic, Synth-pop, New Wave, etc.
      - Must match either genre array OR style array
      - Consider production era and sound characteristics
      - Look for sonic similarity (synths, drums, vocals)

2. RESPONSE FORMAT:
   Each suggestion MUST follow:
   "EXACT_TRACK_TITLE" by EXACT_ARTIST (BPM BPM) - [reason: genre match + specific musical element]
   Example: "Get The Balance Right" by Depeche Mode (130 BPM) - [Classic synth-pop with iconic lead synths]

3. DIVERSITY REQUIREMENTS:
   - Suggest 8-12 tracks total
   - Maximum 1 track per release/album
   - Maximum 2 tracks per artist
   - Mix eras (70s/80s/90s/modern)
   - Balance BPM for flow (gradual changes)

4. MANDATORY CHECKS:
   - Cross-reference title/artist EXACTLY as provided
   - Verify genre/style matches in track metadata
   - Check BPM for set flow
   - Ensure no duplicate releases

5. ANALYSIS REQUIRED:
   Start response with:
   "ANALYSIS:
   - Found: [X] matching tracks from [Y] releases
   - BPM Range: [lowest]-[highest]
   - Genres Found: [list]
   - Special Matches: [any exact title/artist matches]"`,

  createUserPrompt: (prompt: string, tracks: TrackWithDetails[]) => {
    // Extract potential track references
    const words = prompt.toLowerCase().split(' ');
    const tracksLower = tracks.map(t => ({
      ...t,
      titleLower: t.title.toLowerCase(),
      artistLower: t.artist.toLowerCase()
    }));

    // Find any exact matches in the collection
    const exactMatches = tracksLower.filter(t => 
      words.some(w => t.titleLower.includes(w)) || 
      words.some(w => t.artistLower.includes(w))
    );

    return `USER REQUEST: "${prompt}"

${exactMatches.length > 0 ? `FOUND POTENTIAL MATCHES:
${exactMatches.map(t => `"${t.title}" by ${t.artist} [${t.genre.join(', ')}]`).join('\n')}

` : ''}
AVAILABLE TRACKS BY RELEASE:
${Object.entries(tracks.reduce((acc, track) => {
  const key = `${track.releaseTitle} (${track.releaseYear})`;
  if (!acc[key]) acc[key] = [];
  acc[key].push(track);
  return acc;
}, {} as Record<string, TrackWithDetails[]>))
.map(([release, tracks]) => 
  `RELEASE: ${release}
${tracks.map(t => 
  `- "${t.title}" by ${t.artist}
   BPM: ${t.bpm}
   Genres: ${t.genre.join(', ')}
   Styles: ${t.style.join(', ')}`
).join('\n')}`
).join('\n\n')}

REQUIREMENTS:
1. Include matching tracks found in user request if available
2. Select 8-12 diverse tracks total
3. NO duplicate releases
4. Balance BPM range for smooth mixing
5. Focus on matching requested genres/styles`;
  }
};

export default DJAssistantPrompt;