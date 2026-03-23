import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ArrowLeft, Users, Briefcase, Award } from 'lucide-react';
import { useNavigate } from 'react-router';

// Realistic UK Dream Jobs List
const DREAM_JOBS = [
  'Veterinary Surgeon',
  'Doctor',
  'Primary School Teacher',
  'Secondary School Teacher',
  'Nurse',
  'Paramedic',
  'Firefighter',
  'Police Officer',
  'Builder / Bricklayer',
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
  name: string;
  class: string;
  choices: string[]; 
  timestamp: number;
}

const PASTEL_COLORS = ['#a8d0ff', '#ffb8a0', '#d0e8a8', '#ffe0a8', '#d8b8ff', '#a0d0e8', '#ffd0e0', '#ffd8e8', '#b8d8ff', '#d0d0e0', '#a0d8e8', '#ffb8c8', '#c8e0ff', '#ffe8d0', '#e0d0ff'];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    // Ensure this key matches what your voting page uses!
    const storedVotes = localStorage.getItem('dreamJobsVotes');
    if (storedVotes) {
      try {
        setVotes(JSON.parse(storedVotes));
      } catch (error) {
        console.error('Error loading votes:', error);
      }
    }
  }, []);

  const getJobResults = () => {
    const counts: Record<string, number> = {};
    DREAM_JOBS.forEach(job => {
      counts[job] = 0;
    });
    
    votes.forEach(vote => {
      vote.choices.forEach(choice => {
        if (counts[choice] !== undefined) {
          counts[choice]++;
        }
      });
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getClassBreakdown = () => {
    const breakdown: Record<string, number> = {};
    votes.forEach(vote => {
      breakdown[vote.class] = (breakdown[vote.class] || 0) + 1;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  };

  const getTopJob = () => {
    const results = getJobResults();
    return results.length > 0 && results[0].value > 0 ? results[0] : null;
  };

  const jobResults = getJobResults();
  const classBreakdown = getClassBreakdown();
  const topJob = getTopJob();
  const totalVotes = votes.length;

  if (totalVotes === 0) {
    return (
      <div className="min-h-screen bg-[#f1f2f6] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 text-[#6a6a7e]" />
            <span className="text-[#5a5a6e]">Back to Voting</span>
          </motion.button>
          <div className="rounded-3xl p-12 shadow-[8px_8px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)] text-center">
            <p className="text-2xl text-[#6a6a7e]">No career choices submitted yet! 🏗️</p>
            <p className="mt-4 text-[#8a8a9e]">Pick your dream jobs to see the data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f2f6] px-4 py-12 font-sans">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-2xl px-6 py-3 shadow-[3px_3px_8px_rgba(163,177,198,0.25),-3px_-3px_8px_rgba(255,255,255,0.7)] bg-[#f1f2f6]"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft className="h-5 w-5 text-[#6a6a7e]" />
            <span className="text-[#5a5a6e]">Back to Voting</span>
          </motion.button>
          <h1 className="text-3xl font-bold text-[#4a4a5e]">Dream Jobs Analytics 📊</h1>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl p-6 shadow-[6px_6px_12px_rgba(163,177,198,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#a8d0ff] p-3"><Users className="h-6 w-6 text-[#4a4a5e]" /></div>
              <div>
                <p className="text-sm text-[#8a8a9e]">Total Students</p>
                <p className="text-3xl font-bold text-[#4a4a5e]">{totalVotes}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-[6px_6px_12px_rgba(163,177,198,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#ffb8a0] p-3"><Briefcase className="h-6 w-6 text-[#4a4a5e]" /></div>
              <div>
                <p className="text-sm text-[#8a8a9e]">Career Interests</p>
                <p className="text-3xl font-bold text-[#4a4a5e]">{totalVotes * 3}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-[6px_6px_12px_rgba(163,177,198,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#d0e8a8] p-3"><Award className="h-6 w-6 text-[#4a4a5e]" /></div>
              <div className="overflow-hidden">
                <p className="text-sm text-[#8a8a9e]">Top Career Choice</p>
                <p className="text-lg font-bold text-[#4a4a5e] truncate">{topJob ? topJob.name : 'Tied'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <motion.div className="mb-8 rounded-3xl p-8 shadow-[8px_8px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)]">
          <h2 className="mb-6 text-2xl font-semibold text-[#4a4a5e]">Career Popularity</h2>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobResults.filter(j => j.value > 0)} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={180} style={{ fontSize: '12px', fill: '#6a6a7e' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '15px', border: 'none' }} />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={25}>
                  {jobResults.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
