import Image from 'next/image';
import SignIn from '../SignIn';

interface BannerProps {
  username: string;
  avatarUrl: string;
}

const Banner: React.FC<BannerProps> = ({ username, avatarUrl }) => {
  return (
    <header
      className="bg-white text-black p-6 flex justify-between items-center shadow-lg"
      style={{
        backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      }}
    >
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Crate Logo"
          width={100}
          height={100}
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="flex items-center">
        {username !== 'Guest' ? (
          <>
            <Image
              src={avatarUrl}
              alt={`${username}'s avatar`}
              width={50}
              height={50}
              className="rounded-full transition-transform duration-300 hover:scale-110"
            />
            <span className="ml-2 text-black font-heading">{username}</span>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
};

export default Banner;
