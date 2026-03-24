import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ArrowLeft, Users, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Vote {
  id: string;
  name: string;
  class: string;
  picks: string[];
  timestamp: number;
}

const ANIMALS = [
  'Dolphin', 'Elephant', 'Lion', 'Tiger', 'Penguin', 'Giraffe', 'Panda', 'Horse',
  'Owl', 'Wolf', 'Axolotl', 'Capybara', 'Tortoise', 'Koala', 'Octopus'
];

const STORAGE_KEY = 'favouriteAnimalsVotes';
const LEGACY_STORAGE_KEY = 'worldBookDayVotes';
const POINTS_BY_RANK = [3, 2, 1];
const PASTEL_COLORS = ['#a8d0ff', '#ffb8a0', '#d0e8a8', '#ffe0a8', '#d8b8ff', '#a0d0e8', '#ffd0e0', '#ffd8e8', '#b8d8ff', '#d0d0e0', '#a0d8e8', '#ffb8c8'];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const storedVotes = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!storedVotes) return;

    try {
      const parsedVotes = JSON.parse(storedVotes) as Array<Vote & { picks?: string[] }>;
      const normalized = parsedVotes
        .map((vote) => {
          if (!Array.isArray(vote.picks)) return null;
          return { id: vote.id, name: vote.name, class: vote.class, picks: vote.picks.slice(0, 3), timestamp: vote.timestamp };
        })
        .filter((vote): vote is Vote => vote !== null);
      setVotes(normalized);
    } catch (error) {
      console.error('Error loading votes:', error);
    }
  }, []);

  const classBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    votes.forEach((vote) => {
      breakdown[vote.class] = (breakdown[vote.class] || 0) + 1;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [votes]);

  const animalScores = useMemo(() => {
    const totals: Record<string, number> = {};
    ANIMALS.forEach((animal) => {
      totals[animal] = 0;
    });

    votes.forEach((vote) => {
      vote.picks.forEach((animal, index) => {
        totals[animal] = (totals[animal] ?? 0) + (POINTS_BY_RANK[index] ?? 0);
      });
    });

    return Object.entries(totals)
      .map(([animal, points]) => ({ animal, points }))
      .sort((a, b) => b.points - a.points);
  }, [votes]);

  const topFive = animalScores.slice(0, 5);

  if (votes.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f2f6] p-4">
        <div className="text-center">
          <p className="mb-4 text-xl text-[#6a6a7e]">No animal votes yet!</p>
          <motion.button onClick={() => navigate('/')} className="rounded-2xl px-6 py-3 shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="text-[#5a5a6e]">Go Back</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f2f6] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl text-[#4a4a5e]">Animal Analytics Dashboard</h1>
            <p className="text-[#6a6a7e]">Top 3 ranking results using 3/2/1 scoring</p>
          </div>
          <motion.button onClick={() => navigate('/')} className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ArrowLeft className="h-5 w-5 text-[#6a6a7e]" />
            <span className="text-[#5a5a6e]">Back to Animal Voting</span>
          </motion.button>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl p-6 shadow">
            <div className="mb-3 flex items-center gap-3"><Users className="h-6 w-6 text-[#6a6a7e]" /><h3 className="text-lg text-[#5a5a6e]">Total Votes</h3></div>
            <p className="text-3xl font-medium text-[#4a4a5e]">{votes.length}</p>
          </div>
          <div className="rounded-3xl p-6 shadow">
            <div className="mb-3 flex items-center gap-3"><TrendingUp className="h-6 w-6 text-[#6a6a7e]" /><h3 className="text-lg text-[#5a5a6e]">Animals</h3></div>
            <p className="text-3xl font-medium text-[#4a4a5e]">{ANIMALS.length}</p>
          </div>
          <div className="rounded-3xl p-6 shadow">
            <div className="mb-3 flex items-center gap-3"><Award className="h-6 w-6 text-[#6a6a7e]" /><h3 className="text-lg text-[#5a5a6e]">Most Loved Animal</h3></div>
            <p className="text-xl font-medium text-[#4a4a5e]">{animalScores[0]?.animal ?? 'N/A'}</p>
          </div>
        </div>

        <div className="mb-12 rounded-3xl p-8 shadow">
          <h2 className="mb-6 text-2xl text-[#4a4a5e]">Votes by Class</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={classBreakdown} cx="50%" cy="50%" dataKey="value" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100}>
                  {classBreakdown.map((_, index) => <Cell key={index} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-12 rounded-3xl p-8 shadow">
          <h2 className="mb-6 text-2xl text-[#4a4a5e]">Animal Points Leaderboard</h2>
          <div className="h-[520px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={animalScores} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="animal" width={90} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="points" radius={[0, 8, 8, 0]}>
                  {animalScores.map((_, index) => <Cell key={index} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl p-8 shadow">
          <h2 className="mb-6 text-2xl text-[#4a4a5e]">Top 5 Most Popular Animals</h2>
          <div className="space-y-4">
            {topFive.map((item, index) => (
              <div key={item.animal} className="flex items-center gap-4 rounded-2xl p-4 shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-[#4a4a5e]" style={{ backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length] }}>{index + 1}</div>
                <div className="flex-1">
                  <div className="font-medium text-[#4a4a5e]">{item.animal}</div>
                  <div className="text-sm text-[#8a8a9e]">{item.points} points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
