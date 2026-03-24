import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Edit2, Trash2, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import confetti from 'canvas-confetti';

const CLASS_GROUPS = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Staff'] as const;
type ClassGroup = (typeof CLASS_GROUPS)[number];

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

interface Vote {
  id: string;
  name: string;
  class: string;
  picks: string[];
  timestamp: number;
}

interface VotingPageProps {
  title: string;
  description: string;
  animals: string[];
}

const STORAGE_KEY = 'favouriteAnimalsVotes';
const LEGACY_STORAGE_KEY = 'worldBookDayVotes';
const POINTS_BY_RANK = [3, 2, 1];

export function VotingPage({ title, description, animals }: VotingPageProps) {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);
  const [name, setName] = useState('');
  const [picks, setPicks] = useState<string[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [editingVoteId, setEditingVoteId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const storedVotes = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!storedVotes) return;

    try {
      const parsedVotes = JSON.parse(storedVotes) as Array<Vote & { answers?: Record<string, 'A' | 'B'> }>;
      const normalized = parsedVotes
        .map((vote) => {
          if (Array.isArray(vote.picks)) {
            return { id: vote.id, name: vote.name, class: vote.class, picks: vote.picks.slice(0, 3), timestamp: vote.timestamp };
          }
          return null;
        })
        .filter((vote): vote is Vote => vote !== null);

      setVotes(normalized);
    } catch (error) {
      console.error('Error loading votes from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  const hasVoted = (voterName: string, voterClass: string) =>
    votes.some((v) => v.name.toLowerCase() === voterName.toLowerCase() && v.class === voterClass);

  const topAnimals = useMemo(() => {
    const totals: Record<string, number> = {};
    animals.forEach((animal) => {
      totals[animal] = 0;
    });

    votes.forEach((vote) => {
      vote.picks.forEach((animal, index) => {
        totals[animal] = (totals[animal] ?? 0) + (POINTS_BY_RANK[index] ?? 0);
      });
    });

    return Object.entries(totals)
      .map(([animal, points]) => ({ animal, points }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  }, [animals, votes]);

  const togglePick = (animal: string) => {
    setPicks((prev) => {
      if (prev.includes(animal)) {
        return prev.filter((item) => item !== animal);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, animal];
    });
  };

  const resetForm = () => {
    setSelectedClass(null);
    setName('');
    setPicks([]);
    setEditingVoteId(null);
  };

  const handleSubmit = () => {
    if (!selectedClass || !name || picks.length !== 3) return;

    const newVote: Vote = {
      id: editingVoteId || Date.now().toString(),
      name,
      class: selectedClass,
      picks,
      timestamp: Date.now()
    };

    if (editingVoteId) {
      setVotes((prev) => prev.map((vote) => (vote.id === editingVoteId ? newVote : vote)));
      setEditingVoteId(null);
    } else {
      setVotes((prev) => [...prev, newVote]);
    }

    setShowCelebration(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => setShowCelebration(false), 1200);

    setTimeout(() => {
      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleDeleteVote = (id: string) => {
    setVotes((prev) => prev.filter((vote) => vote.id !== id));
  };

  const handleEditVote = (vote: Vote) => {
    setEditingVoteId(vote.id);
    setSelectedClass(vote.class as ClassGroup);
    setName(vote.name);
    setPicks(vote.picks);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f1f2f6] px-4 py-12">
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-3xl bg-white px-10 py-8 text-center shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="text-5xl">Thanks!</div>
              <p className="mt-2 text-[#6a6a7e]">Your top 3 has been saved.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl text-[#4a4a5e]">{title}</h2>
          <p className="text-lg text-[#6a6a7e]">{description}</p>
        </div>

        {votes.length > 0 && (
          <div className="mb-8 flex justify-center gap-3">
            <motion.button
              onClick={() => setShowStats((prev) => !prev)}
              className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <BarChart3 className="h-5 w-5 text-[#6a6a7e]" />
              <span className="text-[#5a5a6e]">{showStats ? 'Hide Stats' : 'Quick Stats'}</span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/analytics')}
              className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <BarChart3 className="h-5 w-5 text-[#6a6a7e]" />
              <span className="text-[#5a5a6e]">Full Analytics</span>
            </motion.button>
          </div>
        )}

        {showStats && votes.length > 0 && (
          <div className="mb-12 rounded-3xl p-8 shadow-[8px_8px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)]">
            <h3 className="mb-6 text-xl text-[#5a5a6e]">Top Animals by Points</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {topAnimals.map((item, index) => (
                <div key={item.animal} className="rounded-2xl p-4 shadow-[3px_3px_6px_rgba(163,177,198,0.15),-3px_-3px_6px_rgba(255,255,255,0.5)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4a4a5e]">{index + 1}. {item.animal}</span>
                    <span className="font-medium text-[#5a5a6e]">{item.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {votes.length > 0 && !showStats && (
          <div className="mb-12 rounded-3xl p-8 shadow-[8px_8px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)]">
            <h3 className="mb-6 text-xl text-[#5a5a6e]">Recent Votes ({votes.length})</h3>
            <div className="space-y-3">
              {votes.slice().reverse().slice(0, 10).map((vote) => (
                <div key={vote.id} className="flex items-center justify-between rounded-2xl p-4 shadow-[3px_3px_6px_rgba(163,177,198,0.15),-3px_-3px_6px_rgba(255,255,255,0.5)]">
                  <div>
                    <span className="font-medium text-[#4a4a5e]">{vote.name}</span>
                    <span className="ml-2 text-sm text-[#8a8a9e]">({vote.class})</span>
                    <div className="mt-1 text-sm text-[#6a6a7e]">1st: {vote.picks[0]} | 2nd: {vote.picks[1]} | 3rd: {vote.picks[2]}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditVote(vote)} className="rounded-xl p-2">
                      <Edit2 className="h-4 w-4 text-[#6a6a7e]" />
                    </button>
                    <button onClick={() => handleDeleteVote(vote.id)} className="rounded-xl p-2">
                      <Trash2 className="h-4 w-4 text-[#ff6b6b]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl p-8 shadow-[8px_8px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)]">
          <h3 className="mb-8 text-center text-2xl text-[#4a4a5e]">
            {editingVoteId ? 'Edit Your Top 3' : 'Pick Your Top 3'}
          </h3>

          <div className="mb-10">
            <h4 className="mb-6 text-center text-lg text-[#5a5a6e]">Select Your Class</h4>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
              {CLASS_GROUPS.map((classGroup) => (
                <button
                  key={classGroup}
                  onClick={() => {
                    setSelectedClass(classGroup);
                    setName('');
                  }}
                  className={`rounded-2xl p-4 ${selectedClass === classGroup ? 'shadow-inner' : 'shadow'}`}
                >
                  {classGroup}
                </button>
              ))}
            </div>
          </div>

          {selectedClass && (
            <div className="mb-10">
              <h4 className="mb-6 text-center text-lg text-[#5a5a6e]">
                {selectedClass === 'Staff' ? 'Enter Your Name' : 'Select Your Name'}
              </h4>
              {selectedClass === 'Staff' ? (
                <div className="mx-auto max-w-md">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full rounded-2xl px-6 py-4 text-center"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {CLASS_NAMES[selectedClass].map((studentName) => {
                    const voted = hasVoted(studentName, selectedClass);
                    return (
                      <button
                        key={studentName}
                        onClick={() => !voted && setName(studentName)}
                        disabled={voted && !editingVoteId}
                        className={`rounded-2xl p-3 ${name === studentName ? 'shadow-inner' : 'shadow'} ${voted && !editingVoteId ? 'opacity-40' : ''}`}
                      >
                        {studentName}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {selectedClass && name && (
            <div>
              <h4 className="mb-4 text-center text-lg text-[#5a5a6e]">Choose your Top 3 Animals</h4>
              <p className="mb-6 text-center text-sm text-[#8a8a9e]">Tap to select in order: 1st = 3 pts, 2nd = 2 pts, 3rd = 1 pt</p>

              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {animals.map((animal) => {
                  const rankIndex = picks.indexOf(animal);
                  const selected = rankIndex !== -1;
                  return (
                    <button
                      key={animal}
                      onClick={() => togglePick(animal)}
                      className={`relative rounded-2xl p-4 ${selected ? 'shadow-inner bg-[#eaf3ff]' : 'shadow'}`}
                    >
                      <span className="text-[#4a4a5e]">{animal}</span>
                      {selected && (
                        <span className="absolute right-2 top-2 rounded-full bg-[#a8d0ff] px-2 py-0.5 text-xs text-[#4a4a5e]">
                          #{rankIndex + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mb-6 rounded-2xl p-4 shadow">
                <p className="text-sm text-[#6a6a7e]">
                  1st: {picks[0] ?? '-'} | 2nd: {picks[1] ?? '-'} | 3rd: {picks[2] ?? '-'}
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button onClick={resetForm} className="rounded-2xl px-6 py-3 shadow">Start Over</button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={picks.length !== 3 || !selectedClass || !name}
                  className={`rounded-2xl px-6 py-3 ${picks.length === 3 ? 'shadow' : 'opacity-40 cursor-not-allowed shadow'}`}
                  whileHover={{ scale: picks.length === 3 ? 1.04 : 1 }}
                  whileTap={{ scale: picks.length === 3 ? 0.96 : 1 }}
                >
                  <span className="flex items-center gap-2 text-[#5a5a6e]"><Check className="h-4 w-4" />Submit Top 3</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
