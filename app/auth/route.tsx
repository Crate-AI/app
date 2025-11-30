import SignInButton from '@/components/signIn';

export default function AuthPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h1>Sign In to Crate</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Enter your email to receive a verification code
        </p>
        <SignInButton />
      </div>
    </div>
  );
}
