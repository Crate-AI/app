import fs from 'fs';
import path from 'path';
import Banner from '@/components/Banner';

export default async function Home() {
  let username = 'Guest';
  let avatarUrl = '/default-avatar.png';
  const storagePath = path.join(process.cwd(), 'storage.json');

  try {
    const storageData = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

    if (storageData.userIdentity) {
      username = storageData.userIdentity.username || username;
      avatarUrl = storageData.userIdentity.avatar_url || avatarUrl;
    }
  } catch (error: any) {
    console.error('Error reading storage.json:', error.message);
  }

  return (
    <div>
      <main>
        <Banner username={username} avatarUrl={avatarUrl} />
      </main>
    </div>
  );
}
