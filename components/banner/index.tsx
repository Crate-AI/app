import Image from "next/image";
import { Github, X } from "lucide-react";
import Link from "next/link";
=======
import Image from 'next/image';
import SignIn from '../SignIn';

interface BannerProps {
  username: string;
  avatarUrl: string;
}

const Header: React.FC<BannerProps> = ({ username, avatarUrl }) => {
  return (
    <header
      className="bg-white text-black p-6 flex justify-between items-center shadow-lg"
      style={{
        backgroundImage: "radial-gradient(#FFDC58 1px, transparent 1px)",
        backgroundSize: "10px 10px",
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
        {/* <h1 className="text-2xl font-heading text-black ml-4">Welcome to Crate</h1> */}
      </div>
      <div className="flex items-center">
        {username !== "Guest" ? (
          <>
            <Image src={avatarUrl} alt={`${username}'s avatar`} width={50} height={50} className="rounded-full transition-transform duration-300 hover:scale-110" />
            <span className="ml-2 text-black font-heading">{username}</span>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
};

export default Header;

// import Image from 'next/image';
// import { Github, X } from 'lucide-react';
// import Link from 'next/link';

// const Banner: React.FC = () => {
//   return (
//     <header className="bg-white text-black p-6 flex justify-between items-center shadow-lg" style={{ backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
//       <div className="flex items-center">
//         <Image src="/logo.svg" alt="Crate Logo" width={100} height={100} className="transition-transform duration-300 hover:scale-110" />
//         {/* <h1 className="text-2xl font-heading text-black ml-4">Welcome to Crate</h1> */}
//       </div>
//       <div className="flex items-center space-x-4">
//         <Link href="https://github.com/orgs/Crate-AI/repositories" className="transition-transform duration-300 hover:scale-110">
//           <div className="p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark">
//             <Github className="w-8 h-8" />
//           </div>
//         </Link>
//         <Link href="https://x.com/zpaprikaf" className="transition-transform duration-300 hover:scale-110">
//           <div className="p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark">
//             <X className="w-8 h-8" />
//           </div>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Banner;
