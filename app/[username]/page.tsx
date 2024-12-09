import fs from 'fs';
import path from 'path';
import Banner from '@/components/Banner';
import { redirect } from 'next/navigation';

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = params;

  // Default data for guest fallback
  let avatarUrl = '/default-avatar.png';

  // Path to the storage.json file
  const storagePath = path.join(process.cwd(), 'storage.json');

  try {
    // Read and parse the storage.json file
    const storageData = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

    // Use the userIdentity data if available
    if (storageData.userIdentity && storageData.userIdentity.username === username) {
      avatarUrl = storageData.userIdentity.avatar_url || avatarUrl;
    } else {
      throw new Error('User not found in storage.');
    }
  } catch (error: any) {
    console.error('Error loading user data:', error.message);

    // Redirect to the homepage if the user doesn't exist
    redirect('/');
    return null; // This line is necessary to satisfy the return type
  }

  return (
    <div>
      <main>
        <Banner username={username} avatarUrl={avatarUrl} />
      </main>
    </div>
  );
}

