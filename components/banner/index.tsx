import Image from 'next/image';
import SignIn from '../signIn';

interface BannerProps {
  avatarUrl: string;
  username: string;
}

const Banner: React.FC<BannerProps> = ({ avatarUrl, username }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Crate Logo" width={50} height={50} className="transition-transform duration-300 hover:scale-110" />
        {/* <h1 className="text-2xl font-bold text-white ml-4">Welcome to Crate</h1> */}
      </div>
      {/* <div className="flex items-center">
        {username !== "Guest" ? (
          <>
            <Image src={avatarUrl} alt={`${username}'s avatar`} width={50} height={50} className="rounded-full transition-transform duration-300 hover:scale-110" />
            <span className="ml-2 text-white font-semibold">{username}</span>
          </>
        ) : (
          <SignIn />
        )}
      </div> */}
    </header>
  );
};

export default Banner;
