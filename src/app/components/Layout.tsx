import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Maximize, Minimize, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [votesCount, setVotesCount] = useState(0);

  // Check votes count - updated to look for dreamJobsVotes
  const checkVotes = () => {
    const storedVotes = localStorage.getItem('dreamJobsVotes');
    const count = storedVotes ? JSON.parse(storedVotes).length : 0;
    setVotesCount(count);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    checkVotes();
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      checkVotes();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(checkVotes, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Job emojis for the background
  const jobEmojis = ['🩺', '🍎', '🏗️', '🚒', '🚔', '💻', '🧑‍🍳', '🔧', '🧪', '⚖️', '✈️', '👷', '🚑', '🎨', '📐', '🔨', '🔌', '🦷', '🖋️', '🛠️'];

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#f1f2f6] relative font-sans">
      {/* Animated Glassmorphism Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full opacity-70 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168, 208, 255, 0.9) 0%, rgba(168, 208, 255, 0) 70%)', top: '5%', left: '5%' }}
          animate={{ x: [0, 70, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-65 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 184, 160, 0.85) 0%, rgba(255, 184, 160, 0) 70%)', top: '50%', right: '10%' }}
          animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[650px] h-[650px] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(208, 232, 168, 0.9) 0%, rgba(208, 232, 168, 0) 70%)', bottom: '0%', left: '45%' }}
          animate={{ x: [0, 80, 0], y: [0, -70, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Job Icons Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {jobEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-5xl opacity-20"
            style={{ left: `${(index * 5) + 2}%`, bottom: '-100px' }}
            animate={{
              y: [0, -1300],
              x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 1.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-center border-b border-[#e0e0f0] bg-[#f1f2f6]/80 backdrop-blur-md py-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
          >
            <Briefcase className="h-8 w-8 text-[#6a6a7e]" />
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-[#5a5a6e]"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Dream Job Vote
          </motion.h1>
        </div>

        {/* Header Buttons */}
        <div className="absolute right-6 flex items-center gap-3">
          {votesCount > 0 && location.pathname === '/' && (
            <motion.button
              onClick={() => navigate('/analytics')}
              className="rounded-2xl p-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)] transition-all bg-[#f1f2f6]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="h-5 w-5 text-[#6a6a7e]" />
            </motion.button>
          )}

          <motion.button
            onClick={toggleFullscreen}
            className="rounded-2xl p-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)] transition-all bg-[#f1f2f6]"
            whileHover={{ scale: 1.05 }}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5 text-[#6a6a7e]" />
            ) : (
              <Maximize className="h-5 w-5 text-[#6a6a7e]" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full overflow-y-auto pt-24 relative z-10">{children}</main>
    </div>
  );
}
