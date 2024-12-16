'use client';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Crate
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your AI-powered music collection analyzer. Sign in with Discogs to get
          started.
        </p>
      </div>
    </div>
  );
}
