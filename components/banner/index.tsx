import Image from 'next/image';
import SignIn from '../signIn';

interface BannerProps {
  avatarUrl: string;
  username: string;
}

const Banner: React.FC<BannerProps> = ({ avatarUrl, username }) => {
  
  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center">
      <Image src="/logo.svg" alt="Crate Logo" width={50} height={50} />
      <h1 className="text-xl font-bold text-gray-700">Welcome to Crate</h1>
      <div className="flex items-center">
        {username !== "Guest" ? (
          <>
           <Image src={avatarUrl} alt={`${username}'s avatar`} width={50} height={50} className="rounded-full" />
            <span className="ml-2 text-gray-700">{username}</span>
          </>
        ) : (
          <SignIn />
        )} 
      </div>
    </header>
  );
};

export default Banner;
