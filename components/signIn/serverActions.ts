// serverActions.t
export const fetchRequestToken = async () => {
    const response = await fetch('/api/auth/discogs/request-token');
    const data = await response.json();
    return data;
};