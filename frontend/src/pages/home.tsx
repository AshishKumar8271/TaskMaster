import AuthModal from '@/components/auth-modal';
import Features from '@/components/features';
import Header from '@/components/header';
import Hero from '@/components/hero';
import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuthContext();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  }

  const handleSignUpClick = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      navigate("/todos");
    }
    else {
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  };
  return (
    <div className='min-h-screen'>
      <Header handleSignInClick={handleSignInClick} handleSignUpClick={handleSignUpClick} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}

export default Home;