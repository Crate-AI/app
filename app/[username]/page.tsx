import fs from 'fs';
import path from 'path';
import Banner from '@/components/Banner';
import { redirect } from 'next/navigation';

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  let avatarUrl = '/default-avatar.png';
  const storagePath = path.join(process.cwd(), 'storage.json');

  try {
    const storageData = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

    if (!storageData.userIdentity) {
      redirect('/');
    }

    const storedUsername = storageData.userIdentity.username;
    if (storedUsername.toLowerCase() === username.toLowerCase()) {
      avatarUrl = storageData.userIdentity.avatar_url || avatarUrl;
    } else {
      redirect('/');
    }
  } catch (error: any) {
    console.error('Error reading storage.json:', error.message);
    redirect('/');
    return null;
  }
  return (
    <div>
      <main>
        <Banner username={username} avatarUrl={avatarUrl} />
      </main>
    </div>
  );
};

export default UserPage;
