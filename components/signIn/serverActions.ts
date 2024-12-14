import { useUserStore } from "@/lib/store/userStore";

// serverActions.ts
export const fetchRequestToken = async () => {
  try {
    const response = await fetch('/api/auth/discogs/request-token');
    const data = await response.json();
    return data.authorizationUrl;
  } catch (error: any) {
    console.error('Error fetching authorization URL:', error.message);
    throw new Error('Failed to start authentication.');
  }
};
