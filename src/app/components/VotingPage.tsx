import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Edit2, Trash2, Check, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router';
import confetti from 'canvas-confetti';
import OnScreenKeyboard from './OnScreenKeyboard';

const CLASS_GROUPS = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Staff'] as const;
type ClassGroup = typeof CLASS_GROUPS[number];

const CLASS_NAMES: Record<ClassGroup, string[]> = {
  'Class 1': [
    'Alexander', 'Alfie', 'Arrianne', 'Bella', 'Cade', 'Edward', 'Elena', 'Eliza', 
    'Evalyn', 'Freddie', 'George', 'Jack', 'Jackson', 'Jasper', 'John', 'Jules', 
    'Kai', 'Layla', 'Lenny', 'Lucas', 'Milo', 'Myla', 'Nancy', 'Olly', 'Oscar', 
    'Polly', 'Reuben', 'Wren'
  ],
  'Class 2': [
    'Alben', 'Amelia', 'Archie', 'Arthur', 'Brandon', 'Charlotte', 'Evie', 'Fia', 
    'Florence', 'Freddie', 'G', 'Harper', 'Henry', 'Ishbel', 'Ivy', 'Leo', 'Lily', 
    'Lottie', 'Mila', 'Nancy', 'Oliver', 'Oscar', 'Sebastian', 'Sofia', 'Teddy', 'Troy'
  ],
  'Class 3': [
    'A', 'Alba', 'Bobby', 'Frankie', 'George L', 'George S', 'Grace', 'Hunter', 'Jack', 
    'Lacey', 'Maddie-Bee', 'Molly P', 'Molly W', 'Natalie', 'Otis', 'Ruby', 'Rupert', 
    'Sophie', 'Tilly', 'Violette'
  ],
  'Class 4': [
    'Candice', 'Eva', 'Felix', 'Frankie', 'Jack', 'Joshua', 'Jude', 'Katie', 
    'Maja', 'Matthew F', 'Matthew G', 'Rocky', 'Rosie', 'Ruby', 'Serenity', 'W'
  ],
  'Staff': []
};

// UK Dream Jobs List
const DREAM_JOBS = [
  'Veterinary Surgeon',
  'Doctor',
  'Primary School Teacher',
  'Secondary School Teacher',
  'Nurse',
  'Paramedic',
  'Firefighter',
  'Police Officer',
  'Builder',
  'Electrician',
  'Plumber',
  'Architect',
  'Civil Engineer',
  'Software Developer',
  'Graphic Designer',
  'Chef',
  'Mechanic',
  'Scientist',
  'Lawyer',
  'Pilot'
];

interface Vote {
  id: string; // Added ID for editing/deleting logic
  name: string;
  class: string;
  choices: string[];
  timestamp: number;
}

interface VotingPageProps {
  title: string;
  description: string;
}

const PASTEL_COLORS = ['#ffd8e8', '#d0e5ff', '#e8f5d0', '#ffe0d0', '#f0d8ff', '#d0e8f5', '#ffe8f0', '#fff0d0', '#d8f0ff', '#e8e8f0', '#d0f0f8', '#ffe0e8'];

export function VotingPage({
  title,
  description
}: VotingPageProps) {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);
  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [editingVoteId, setEditingVoteId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showKeyboard && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showKeyboard]);

  useEffect(() => {
    const storedVotes = localStorage.getItem('dreamJobsVotes');
    if (storedVotes) {
      try {
        setVotes(JSON.parse(storedVotes));
      } catch (error) {
        console.error('Error loading votes:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dreamJobsVotes', JSON.stringify(votes));
  }, [votes]);

  const fireConfetti = () => {
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        spread: randomInRange(50, 100),
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffd8e8', '#d0e5ff', '#e8f5d0']
      });
      confetti({
        particleCount,
        spread: randomInRange(50, 100),
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd8e8', '#d0e5ff', '#e8f5d0']
      });
    }, 250);
  };

  const handleCompleteVote = (finalChoices: string[]) => {
    if (!selectedClass || !name) return;

    const newVote: Vote = {
      id: editingVoteId || Math.random().toString(36).substr(2, 9),
      name,
      class: selectedClass,
      choices: finalChoices,
      timestamp: Date.now()
    };

    if (editingVoteId) {
      setVotes(votes.map(v => v.id === editingVoteId ? newVote : v));
      setEditingVoteId(null);
    } else {
      setVotes([...votes, newVote]);
    }

    setShowCelebration(true);
    fireConfetti();

    setTimeout(() => {
      setShowCelebration(false);
      setSelectedClass(null);
      setName('');
      setSelectedItems([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(t => t !== item));
    } else if (selectedItems.length < 3) {
      const newItems = [...selectedItems, item];
      setSelectedItems(newItems);
      
      if (newItems.length === 3) {
        setTimeout(() => handleCompleteVote(newItems), 300);
      }
    }
  };

  const handleDeleteVote = (id: string) => {
    setVotes(votes.filter(v => v.id !== id));
  };

  const handleEditVote = (vote: Vote) => {
    setEditingVoteId(vote.id);
    setSelectedClass(vote.class as ClassGroup);
    setName(vote.name);
    setSelectedItems(vote.choices);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getItemVotes = () => {
    const itemCounts: Record<string, number> = {};
    DREAM_JOBS.forEach(item => { itemCounts[item] = 0; });
    votes.forEach(vote => {
      vote.choices.forEach(item => {
        if (itemCounts[item] !== undefined) itemCounts[item]++;
      });
    });
    return Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([item, count]) => ({ item, count }));
  };

  const hasVoted = (voterName: string, voterClass: string) => {
    return votes.some(v => v.name.toLowerCase() === voterName.toLowerCase() && v.class === voterClass);
  };

  return (
    <div className={`min-h-screen bg-[#f1f2f6] px-4 py-12 font-sans ${showKeyboard ? 'pb-80' : ''}`}>
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-[3rem] p-16 shadow-[12px_12px_24px_rgba(163,177,198,0.3)] bg-white/90"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            >
              <div className="text-center">
                <div className="mb-6 text-8xl">✨</div>
                <h2 className="text-4xl font-bold text-[#4a4a5e] mb-2">Great Choice!</h2>
                <p className="text-xl text-[#6a6a7e]">Your dream job has been recorded.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-bold text-[#4a4a5e]">{title}</h2>
          <p className="text-lg text-[#6a6a7e]">{description}</p>
        </div>

        {/* Top Buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)]"
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 className="h-5 w-5 text-[#6a6a7e]" />
            <span className="text-[#5a5a6e]">{showStats ? 'Hide Stats' : 'Quick Stats'}</span>
          </motion.button>
          <motion.button
            onClick={() => navigate('/analytics')}
            className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)]"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="h-5 w-5 text-[#6a6a7e]" />
            <span className="text-[#5a5a6e]">Full Analytics</span>
          </motion.button>
        </div>

        {/* Quick Stats Panel */}
        {showStats && votes.length > 0 && (
          <motion.div className="mb-12 rounded-3xl p-8 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.1)] bg-white/50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="mb-6 text-xl font-semibold text-[#5a5a6e]">Most Popular Career Choices</h3>
            <div className="space-y-4">
              {getItemVotes().slice(0, 5).map(({ item, count }, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-40 text-sm text-[#4a4a5e] font-medium">{item}</div>
                  <div className="flex-1 h-3 rounded-full bg-[#e8e8f0] overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full" 
                      style={{ backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length] }}
                      initial={{ width: 0 }} 
                      animate={{ width: `${(count / getItemVotes()[0].count) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-[#8a8a9e]">{count}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Voting Card */}
        <div className="rounded-[2.5rem] p-10 shadow-[10px_10px_20px_rgba(163,177,198,0.2),-10px_-10px_20px_rgba(255,255,255,0.8)] bg-[#f1f2f6]">
          <h3 className="mb-10 text-center text-2xl font-semibold text-[#4a4a5e]">
            {editingVoteId ? '✏️ Update Your Choices' : '🚀 Start Your Journey'}
          </h3>

          {/* Step 1: Class */}
          <div className="mb-10">
            <p className="mb-6 text-center text-[#8a8a9e] font-medium uppercase tracking-wider text-xs">Step 1: Select Your Class</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {CLASS_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => { setSelectedClass(group); setName(''); }}
                  className={`p-4 rounded-2xl transition-all ${selectedClass === group ? 'shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3)] bg-[#eef0f5] text-[#4a4a5e] font-bold' : 'shadow-[4px_4px_8px_rgba(163,177,198,0.15),-4px_-4px_8px_rgba(255,255,255,0.7)] text-[#8a8a9e]'}`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Name */}
          {selectedClass && (
            <motion.div className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="mb-6 text-center text-[#8a8a9e] font-medium uppercase tracking-wider text-xs">Step 2: Find Your Name</p>
              {selectedClass === 'Staff' ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setShowKeyboard(true)}
                  placeholder="Enter name..."
                  className="w-full max-w-md mx-auto block p-4 rounded-2xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2)] bg-transparent outline-none text-center"
                />
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {CLASS_NAMES[selectedClass].map((sName) => {
                    const voted = hasVoted(sName, selectedClass);
                    return (
                      <button
                        key={sName}
                        disabled={voted && !editingVoteId}
                        onClick={() => setName(sName)}
                        className={`p-3 text-sm rounded-xl transition-all ${name === sName ? 'bg-[#a8d0ff] shadow-inner font-bold' : voted && !editingVoteId ? 'opacity-30 cursor-not-allowed' : 'shadow-[3px_3px_6px_rgba(163,177,198,0.1)]'}`}
                      >
                        {sName} {voted && !editingVoteId && '✅'}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Jobs */}
          {selectedClass && name && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="mb-6 text-center text-[#8a8a9e] font-medium uppercase tracking-wider text-xs">Step 3: Pick Top 3 Dream Jobs ({selectedItems.length}/3)</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                {DREAM_JOBS.map((job, index) => {
                  const active = selectedItems.includes(job);
                  return (
                    <button
                      key={job}
                      onClick={() => toggleItem(job)}
                      className={`p-5 rounded-2xl text-sm transition-all ${active ? 'font-bold shadow-inner' : 'shadow-[4px_4px_8px_rgba(163,177,198,0.15)] hover:scale-105'}`}
                      style={{ backgroundColor: active ? PASTEL_COLORS[index % PASTEL_COLORS.length] : 'transparent' }}
                    >
                      {job}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Recent Activity List */}
        {votes.length > 0 && !showStats && (
          <div className="mt-12 p-8 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.1)]">
            <h3 className="mb-4 text-lg font-semibold text-[#5a5a6e]">Recent Submissions</h3>
            <div className="grid gap-3">
              {votes.slice().reverse().slice(0, 5).map((v) => (
                <div key={v.id} className="flex justify-between items-center p-4 bg-white/40 rounded-2xl">
                  <div className="text-sm font-medium">{v.name} <span className="text-[#8a8a9e]">({v.class})</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditVote(v)} className="p-2 hover:bg-black/5 rounded-lg"><Edit2 size={16}/></button>
                    <button onClick={() => handleDeleteVote(v.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-400"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showKeyboard && (
        <OnScreenKeyboard 
          value={name}
          onKeyPress={(k) => setName(p => p + k)}
          onBackspace={() => setName(p => p.slice(0, -1))}
          onSpace={() => setName(p => p + ' ')}
          onClose={() => setShowKeyboard(false)}
        />
      )}
    </div>
  );
}
