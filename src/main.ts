import './style.css';

// ============================================
// SVG ICONS
// ============================================
const ICONS = {
  breathing: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  goals: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
  affirmations: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  reflections: `<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5.5 8.5c0-2.5 3-4.5 6.5-4.5"/><path d="M18.5 8.5c0-2.5-3-4.5-6.5-4.5"/><path d="M5.5 15.5c0 2.5 3 4.5 6.5 4.5"/><path d="M18.5 15.5c0 2.5-3 4.5-6.5 4.5"/></svg>`,
  checkin: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  progress: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 22V8a2 2 0 0 0-2-2H6v4"/><path d="M14 22V8a2 2 0 0 1 2-2h2v4"/><path d="M8 6l4-4 4 4"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" fill="currentColor"/></svg>`,
  wind: `<svg viewBox="0 0 24 24"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  heart: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  smile: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/></svg>`,
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  award: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
};

// ============================================
// STATE
// ============================================
interface AppState {
  activeCategory: string;
  activeModal: string | null;
  modalData: any;
  userName: string;
  moods: Record<string, number>;
  affirmationIndex: number;
  affirmationCount: number;
  affirmationCheckIn: { index: number; committedAt: string } | null;
  affirmationDateKey: string;
  affirmationTodayIndex: number | null;
  affirmationResultToday: 'achieved' | 'not_yet' | null;
  intentions: { text: string; done: boolean }[];
  dailyGoals: { text: string; done: boolean }[];
  longTermGoals: string[];
  longTermTargetDate: string;
  plannerActiveDay: string;
  plannerLessons: Record<string, { time: string; lesson: string }[]>;
  plannerDayPlans: Record<string, string>;
  plannerWeeklyFocus: string;
  goalsDateKey: string;
  reflectionDateKey: string;
  reflectionToday: string | null;
  reflections: { date: string; text: string }[];
  achievements: boolean[];
  breathingDuration: number;
  breathingActive: boolean;
}

const state: AppState = {
  activeCategory: 'checkin',
  activeModal: null,
  modalData: null,
  userName: '',
  moods: { happiness: 50, energy: 50, calmness: 50, confidence: 50 },
  affirmationIndex: 0,
  affirmationCount: 0,
  affirmationCheckIn: null,
  affirmationDateKey: (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })(),
  affirmationTodayIndex: null,
  affirmationResultToday: null,
  intentions: [],
  dailyGoals: [],
  longTermGoals: [],
  longTermTargetDate: '',
  plannerActiveDay: 'Monday',
  plannerLessons: {},
  plannerDayPlans: {},
  plannerWeeklyFocus: '',
  goalsDateKey: (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })(),
  reflectionDateKey: (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })(),
  reflectionToday: null,
  reflections: [],
  achievements: Array(15).fill(false),
  breathingDuration: 60,
  breathingActive: false,
};

const AFFIRMATIONS = [
  "I believe in myself", "I am brave and strong", "I can do hard things",
  "I am a good friend", "My mistakes help me learn", "I am kind and caring",
  "I deserve to be happy", "I can make a difference", "I am proud of who I am",
  "Today is full of possibilities", "I am growing every day", "I choose to be positive",
  "I am enough exactly as I am", "I can handle anything", "My feelings matter",
];

const GOAL_LIBRARY: Record<string, string[]> = {
  friendship: [
    'Ask a friend how they are feeling and listen',
    'Say something kind to someone in class',
    'Invite someone to play with you',
    'Smile at someone',
    'Speak to somebody you would not normally talk to',
    'Give someone a compliment',
    'Sit with somebody different for lunch',
    'Say thank you to a friend for helping you',
    'Do one helpful thing for someone today',
    'If you have a disagreement, talk kindly to sort it out',
  ],
  resilience: [
    'Try your hardest on one tricky task today',
    'Take a short calm break when something feels hard',
    'Turn one "I cannot" thought into "I can try"',
    'Finish one task you wanted to avoid',
    'Write one thing you learned from a challenge',
    'Keep going for 5 more minutes when it feels tough',
  ],
  love: [
    'Tell someone in your family you love them',
    'Do one kind thing at home',
    'Spend 20 minutes doing something fun with family',
    'Use kind words to yourself today',
    'Look at the person speaking and listen carefully',
    'Give someone a genuine compliment',
  ],
  honesty: [
    'Tell the truth, even when it is hard',
    'Own up to one mistake and fix it',
    'Say how you feel using calm words',
    'Have one honest, kind chat with someone',
    'Choose what is right instead of just following others',
    'Keep one promise you made to yourself',
  ],
  activity: [
    'Go for a 20-minute walk',
    'Do a short stretch session',
    'Take movement breaks during the day',
    'Drink water with each meal',
    'Do 15 minutes of active exercise',
    'Spend some time outside for fresh air',
  ],
};

const QUICK_WINS_LIBRARY: Record<string, string[]> = {
  friendship: [
    'Smile at someone new',
    'Say hello to someone you do not usually talk to',
    'Give someone a compliment',
    'Ask one person how their day is going',
    'Hold the door open for someone',
    'Say thank you to a teacher or helper',
  ],
  resilience: [
    'Start a task for just 2 minutes',
    'Take 3 slow breaths before your next task',
    'Try one question before asking for help',
    'Use "I can try" when something feels hard',
    'Put one thing away that is out of place',
    'Finish one tiny task you started',
  ],
  love: [
    'Tell someone at home you appreciate them',
    'Do one helpful job without being asked',
    'Write a quick kind note for someone',
    'Give someone your full attention for 2 minutes',
    'Share one positive thing from your day',
    'Use kind words to yourself once today',
  ],
  honesty: [
    'Tell the truth about one small thing',
    'Say sorry quickly if you made a mistake',
    'Admit when you need help',
    'Say how you feel in one clear sentence',
    'Own one mistake and fix a small part of it',
    'Keep one small promise to yourself today',
  ],
  activity: [
    'Do 10 star jumps',
    'Stretch for 2 minutes',
    'Walk around for 5 minutes',
    'Drink one glass of water now',
    'Stand up and shake out your body for 30 seconds',
    'Get some fresh air for a few minutes',
  ],
};

const BADGE_SYMS = ['★','✦','◆','●','▲','⬟','✧','◉','⬡','✶','◈','✸','⬢','✹','◇'];
const ACHIEVEMENT_LEVELS = [1, 3, 10, 25, 50, 80, 120, 170, 230, 300, 380, 470, 570, 680, 800];
const PLANNER_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MOOD_RGB: Record<string, string> = {
  happiness: '255, 55, 95',
  energy: '255, 159, 10',
  calmness: '50, 173, 230',
  confidence: '175, 82, 222',
};

let breathingInterval: number | null = null;
let breathingTimeout: number | null = null;

// ============================================
// CATEGORIES & SUB-TOOLS
// ============================================
interface SubTool {
  id: string;
  title: string;
  desc: string;
  icon: string;
  iconBg: string;
  span?: string;
}

interface Category {
  id: string;
  label: string;
  cls: string;
  icon: string;
  subTools: SubTool[];
}

const CATEGORIES: Category[] = [
  {
    id: 'checkin', label: 'Check-in', cls: 'cat-checkin', icon: ICONS.checkin,
    subTools: [
      { id: 'mood-check', title: 'Mood Check-in', desc: 'How are you feeling right now? Move the sliders to check in.', icon: ICONS.smile, iconBg: 'linear-gradient(135deg, #a78bfa, #818cf8)', span: 'span-full' },
      { id: 'mood-guide-happiness', title: 'My Happiness Levels', desc: 'Tips from your happiness level.', icon: ICONS.heart, iconBg: 'linear-gradient(135deg, #f472b6, #fb7185)' },
      { id: 'mood-guide-energy', title: 'My Energy Levels', desc: 'Tips from your energy level.', icon: ICONS.bolt, iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)' },
      { id: 'mood-guide-calmness', title: 'My Calmness Levels', desc: 'Tips from your calmness level.', icon: ICONS.wind, iconBg: 'linear-gradient(135deg, #22d3ee, #3b82f6)' },
      { id: 'mood-guide-confidence', title: 'My Confidence Levels', desc: 'Tips from your confidence level.', icon: ICONS.sparkle, iconBg: 'linear-gradient(135deg, #a78bfa, #8b5cf6)' },
    ],
  },
  {
    id: 'affirmations', label: 'Affirmations', cls: 'cat-affirmations', icon: ICONS.affirmations,
    subTools: [
      { id: 'daily-affirmation', title: 'Daily Affirmation', desc: 'Get a positive affirmation to carry with you through the day.', icon: ICONS.heart, iconBg: 'linear-gradient(135deg, #f472b6, #e879f9)', span: 'span-full' },
      { id: 'affirmation-streak', title: 'Affirmation Streak', desc: 'Track how many affirmations you\'ve lived — build a streak!', icon: ICONS.zap, iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)' },
      { id: 'badges', title: 'Achievement Badges', desc: 'Unlock badges by living your affirmations. Collect them all!', icon: ICONS.award, iconBg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    ],
  },
  {
    id: 'goals', label: 'Goals', cls: 'cat-goals', icon: ICONS.goals,
    subTools: [
      { id: 'daily-goals', title: 'Daily Goals', desc: 'Set your top priorities for today and tick them off as you go.', icon: ICONS.target, iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)', span: 'span-full' },
      { id: 'my-goals', title: 'My Goals', desc: 'Track today\'s selected goals and celebrate your progress.', icon: ICONS.trophy, iconBg: 'linear-gradient(135deg, #34d399, #10b981)', span: 'span-full' },
      { id: 'quick-wins', title: 'Quick Wins', desc: 'Small, achievable tasks to build momentum and confidence.', icon: ICONS.bolt, iconBg: 'linear-gradient(135deg, #34d399, #06b6d4)' },
      { id: 'work-towards', title: 'Things to Work Towards', desc: 'Bigger goals to keep in mind and work on over time.', icon: ICONS.compass, iconBg: 'linear-gradient(135deg, #a78bfa, #818cf8)' },
    ],
  },
  {
    id: 'reflections', label: 'Reflections', cls: 'cat-reflections', icon: ICONS.reflections,
    subTools: [
      { id: 'todays-reflection', title: "Today's Reflection", desc: 'Write about what went well, what you learned, or how you grew.', icon: ICONS.file, iconBg: 'linear-gradient(135deg, #34d399, #06b6d4)', span: 'span-full' },
      { id: 'growth-log', title: 'Growth Log', desc: 'Look back at all your reflections and see how far you\'ve come.', icon: ICONS.calendar, iconBg: 'linear-gradient(135deg, #22d3ee, #3b82f6)' },
      { id: 'skills-tracker', title: 'Skills Tracker', desc: 'Note down skills you\'re building and things you\'re getting better at.', icon: ICONS.star, iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)' },
    ],
  },
  {
    id: 'planner', label: 'Planner', cls: 'cat-planner', icon: ICONS.calendar,
    subTools: [
      { id: 'weekly-planner', title: 'Weekly Planner', desc: 'Plan your week.', icon: ICONS.calendar, iconBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)', span: 'span-full' },
      { id: 'weekly-look-forward', title: 'Look Forward To', desc: 'Things to look forward to this week.', icon: ICONS.sparkle, iconBg: 'linear-gradient(135deg, #a78bfa, #60a5fa)', span: 'span-full' },
    ],
  },
  {
    id: 'breathing', label: 'Breathing', cls: 'cat-breathing', icon: ICONS.wind,
    subTools: [
      { id: 'breath-box', title: 'Box Breathing', desc: 'A calming 4-count box breathing pattern to steady your mind.', icon: ICONS.breathing, iconBg: 'linear-gradient(135deg, #22d3ee, #3b82f6)', span: 'span-full' },
      { id: 'breath-30', title: '30 Seconds', desc: 'Quick reset. A short breathing session for a fast calm.', icon: ICONS.bolt, iconBg: 'linear-gradient(135deg, #34d399, #06b6d4)' },
      { id: 'breath-60', title: '1 Minute', desc: 'A steady one-minute session to centre yourself.', icon: ICONS.breathing, iconBg: 'linear-gradient(135deg, #22d3ee, #3b82f6)' },
      { id: 'breath-120', title: '2 Minutes', desc: 'A deeper session for when you need a proper pause.', icon: ICONS.compass, iconBg: 'linear-gradient(135deg, #a78bfa, #818cf8)' },
      { id: 'breath-180', title: '3 Minutes', desc: 'Full breathing session. Best for winding down or starting fresh.', icon: ICONS.sun, iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)' },
    ],
  },
  {
    id: 'progress', label: 'Progress', cls: 'cat-progress', icon: ICONS.progress,
    subTools: [
      { id: 'weekly-overview', title: 'Weekly Overview', desc: 'See your activity across the week in beautiful charts.', icon: ICONS.progress, iconBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)', span: 'span-full' },
      { id: 'my-achievements', title: 'My Achievements', desc: 'View all the badges and milestones you\'ve earned.', icon: ICONS.trophy, iconBg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
      { id: 'my-journey', title: 'My Journey', desc: 'A summary of everything — reflections, goals, and growth.', icon: ICONS.compass, iconBg: 'linear-gradient(135deg, #a78bfa, #818cf8)' },
    ],
  },
];

// ============================================
// RENDER
// ============================================
const app = document.getElementById('app')!;

function render() {
  ensureDailyGoalsFresh();
  ensureDailyAffirmationFresh();
  ensureDailyReflectionFresh();
  syncAchievementsWithAffirmations();
  const cat = CATEGORIES.find(c => c.id === state.activeCategory)!;

  app.innerHTML = `
    <div class="app-layout">
      ${renderLeftPanel()}
      ${renderRightPanel(cat)}
    </div>
    ${state.activeModal ? renderModal() : ''}
  `;
  bindEvents();
}

function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function ensureDailyGoalsFresh() {
  const today = getTodayKey();
  if (state.goalsDateKey !== today) {
    state.goalsDateKey = today;
    state.dailyGoals = [];
    state.modalData = { ...(state.modalData || {}), justAddedPreset: '', goalCelebrating: false };
  }
}

function ensureDailyAffirmationFresh() {
  const today = getTodayKey();
  if (state.affirmationDateKey !== today) {
    if (state.affirmationTodayIndex !== null) {
      state.affirmationIndex = (state.affirmationTodayIndex + 1) % AFFIRMATIONS.length;
    }
    state.affirmationDateKey = today;
    state.affirmationCheckIn = null;
    state.affirmationTodayIndex = null;
    state.affirmationResultToday = null;
    state.modalData = { ...(state.modalData || {}), affirmationCelebrating: false };
  }
}

function ensureDailyReflectionFresh() {
  const today = getTodayKey();
  if (state.reflectionDateKey !== today) {
    state.reflectionDateKey = today;
    state.reflectionToday = null;
    state.modalData = { ...(state.modalData || {}), reflectionCelebrating: false };
  }
}

function syncAchievementsWithAffirmations() {
  state.achievements = ACHIEVEMENT_LEVELS.map(level => state.affirmationCount >= level);
}

function pickRandomGoals(library: Record<string, string[]>, count: number, exclude: string[] = []): string[] {
  const excluded = new Set(exclude);
  const pool = Object.values(library).flat().filter(goal => !excluded.has(goal));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function getGoalLibraryForTool(toolId: string): Record<string, string[]> {
  if (toolId === 'quick-wins') return QUICK_WINS_LIBRARY;
  return GOAL_LIBRARY;
}

function renderLeftPanel(): string {
  return `
    <div class="left-panel">
      <div class="hero-brand">
        <div class="hero-title">
          <span>Evid</span><span class="hero-title-glow">Glow</span>
        </div>
      </div>

      <div class="category-nav">
        ${CATEGORIES.map(c => `
          <button class="category-btn ${c.cls} ${state.activeCategory === c.id ? 'active' : ''}"
                  data-cat="${c.id}">
            <div class="category-icon">${c.icon}</div>
            ${c.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderRightPanel(cat: Category): string {
  return `
    <div class="right-panel">
      <div class="bento-grid" id="bentoGrid">
        ${cat.subTools.map(tool => `
          <div class="glass-card ${tool.span === 'span-full' ? 'span-full hero-top' : ''} ${tool.id.startsWith('mood-guide-') ? 'mood-guide-preview' : ''}"
               data-subtool="${tool.id}"
               ${tool.id.startsWith('mood-guide-') ? `data-mood-guide="${tool.id.replace('mood-guide-', '')}"` : ''}>
            <div class="card-icon-wrap glow" style="background: ${tool.iconBg}">
              ${tool.icon}
            </div>
            <div class="card-heading">${tool.title}</div>
            <div class="card-desc">${tool.desc}</div>
            <button class="card-cta">Discover</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================
// MODAL — Tool interiors
// ============================================
function renderModal(): string {
  const content = getModalContent(state.activeModal!);
  return `
    <div class="tool-overlay" id="toolOverlay">
      <div class="tool-modal">
        <div class="tool-modal-header">
          <button class="modal-close-btn" id="modalCloseBtn">✕</button>
          <div class="modal-title">${content.title}</div>
        </div>
        ${content.body}
      </div>
    </div>
  `;
}

function getModalContent(toolId: string): { title: string; body: string } {
  // Breathing tools
  if (toolId.startsWith('breath-')) {
    const durMap: Record<string, number> = { 'breath-box': 60, 'breath-30': 30, 'breath-60': 60, 'breath-120': 120, 'breath-180': 180 };
    const dur = durMap[toolId] || 60;
    state.breathingDuration = dur;
    return {
      title: toolId === 'breath-box' ? 'Box Breathing' : `Breathing — ${formatTime(dur)}`,
      body: `
        <div class="breathing-circle-wrap">
          <div class="breathing-circle" id="breathCircle">
            <span class="breathing-prompt" id="breathPrompt">Ready</span>
          </div>
          <div class="breathing-timer" id="breathTimer">${formatTime(dur)}</div>
          <button class="modal-action-btn primary" id="breathStartBtn" style="width:auto;margin-top:20px;padding:12px 40px;border-radius:100px;">
            Start Breathing
          </button>
        </div>
      `,
    };
  }

  // Goal tools
  if (toolId === 'work-towards') {
    return {
      title: 'Things to Work Towards',
      body: `
        <div class="goal-library-wrap">
          <div class="goal-library-title">Target date</div>
          <div class="goal-date-row">
            <label class="goal-date-label" for="longTermDateInput">Target date</label>
            <input class="modal-input goal-date-input" id="longTermDateInput" type="date" value="${state.longTermTargetDate}" />
          </div>
          <div class="goal-selected-hint">Pick a date.</div>
        </div>
        <input class="modal-input" id="longTermGoalInput" type="text" placeholder="A bigger goal (e.g., get better at times tables, practise football)" maxlength="120" />
        <button class="modal-action-btn primary" id="addLongTermGoalBtn">Add Goal</button>
        <div id="longTermGoalsList" style="margin-top:12px;">
          ${state.longTermGoals.length === 0
            ? '<div style="text-align:center;color:var(--text-muted);padding:16px 10px;">No goals yet.</div>'
            : state.longTermGoals.map((goal, i) => `
                <div class="list-item">
                  <span class="list-item-text">${goal}</span>
                  <button class="goal-remove-btn" data-long-goal-rm="${i}">Remove</button>
                </div>
              `).join('')
          }
        </div>
      `,
    };
  }

  if (toolId === 'daily-goals' || toolId === 'quick-wins') {
    const titles: Record<string, string> = { 'daily-goals': 'Daily Goals', 'quick-wins': 'Quick Wins', 'work-towards': 'Things to Work Towards' };
    const placeholders: Record<string, string> = {
      'daily-goals': 'What do you want to do today? (e.g., finish homework, read 10 pages)',
      'quick-wins': 'One tiny task now (e.g., pack bag, tidy desk, drink water)',
      'work-towards': 'A bigger goal to keep in mind...',
    };
    const activeLibrary = getGoalLibraryForTool(toolId);
    const categories = Object.keys(activeLibrary);
    const selectedCategory = categories.includes(state.modalData?.goalCategory) ? state.modalData.goalCategory : categories[0];
    const presetGoals = activeLibrary[selectedCategory];
    const chosenGoals = new Set(state.dailyGoals.map(i => i.text));
    const justAddedPreset = state.modalData?.justAddedPreset || '';
    const surpriseGoals: string[] = Array.isArray(state.modalData?.surpriseGoals) ? state.modalData.surpriseGoals : [];
    return {
      title: titles[toolId],
      body: `
        <div class="goal-library-wrap">
          <div class="goal-library-title">Preset goal library</div>
          <div class="goal-surprise-row">
            <button class="goal-surprise-btn" id="surpriseGoalsBtn">Surprise me</button>
            <span class="goal-surprise-hint">Get 5 random ideas</span>
          </div>
          ${surpriseGoals.length > 0 ? `
            <div class="goal-surprise-list">
              ${surpriseGoals.map(goal => `
                <div class="goal-surprise-item">
                  <div class="goal-surprise-text">${goal}</div>
                  <div class="goal-surprise-actions">
                    <button class="goal-surprise-add" data-surprise-add="${goal.replace(/"/g, '&quot;')}">Add</button>
                    <button class="goal-surprise-bin" data-surprise-bin="${goal.replace(/"/g, '&quot;')}">Bin</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          <div class="goal-category-row">
            ${categories.map(cat => `
              <button class="goal-category-btn ${cat === selectedCategory ? 'active' : ''}" data-goal-cat="${cat}">
                ${cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            `).join('')}
          </div>
          <div class="goal-presets-grid">
            ${presetGoals.map(goal => {
              const isChosen = chosenGoals.has(goal);
              const isJustAdded = justAddedPreset === goal;
              return `
                <button class="goal-preset-chip ${isChosen ? 'chosen' : ''} ${isJustAdded ? 'just-added' : ''}"
                        data-goal-preset="${goal.replace(/"/g, '&quot;')}"
                        ${isChosen ? 'disabled' : ''}>
                  <span>${goal}</span>
                </button>
              `;
            }).join('')}
          </div>
          <div class="goal-selected-hint">${state.dailyGoals.length} selected for today</div>
        </div>
        <input class="modal-input" id="goalInput" type="text" placeholder="${placeholders[toolId]}" maxlength="120" />
        <button class="modal-action-btn primary" id="addGoalBtn">Add Goal</button>
      `,
    };
  }

  if (toolId === 'my-goals') {
    const total = state.dailyGoals.length;
    const completed = state.dailyGoals.filter(g => g.done).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    const celebrate = Boolean(state.modalData?.goalCelebrating);
    return {
      title: 'My Goals',
      body: `
        <div class="goal-progress-card ${celebrate ? 'celebrate' : ''}">
          <div class="goal-progress-top">
            <div class="goal-progress-label">Today's Progress</div>
            <div class="goal-progress-value">${pct}%</div>
          </div>
          <div class="goal-progress-track">
            <div class="goal-progress-fill" style="width:${pct}%"></div>
          </div>
          <div class="goal-progress-meta">${completed} of ${total} completed</div>
          <div class="goal-celebration" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div style="margin-top:12px;">
          ${total === 0
            ? '<div style="text-align:center;color:var(--text-muted);padding:26px 12px;">No goals yet.</div>'
            : state.dailyGoals.map((goal, i) => `
                <div class="list-item">
                  <button class="goal-done-btn ${goal.done ? 'checked' : ''}" data-goal-idx="${i}">${goal.done ? '✓' : ''}</button>
                  <span class="list-item-text ${goal.done ? 'completed' : ''}">${goal.text}</span>
                </div>
              `).join('')
          }
        </div>
      `,
    };
  }

  // Affirmation tools
  if (toolId === 'daily-affirmation') {
    const activeIndex = state.affirmationTodayIndex ?? state.affirmationCheckIn?.index ?? state.affirmationIndex;
    const aff = AFFIRMATIONS[activeIndex];
    const isLockedToday = Boolean(state.affirmationResultToday);
    const hasPendingCheckIn = Boolean(state.affirmationCheckIn);
    const isCelebrating = Boolean(state.modalData?.affirmationCelebrating);
    return {
      title: 'Daily Affirmation',
      body: `
        <div class="affirmation-display">
          <div class="affirmation-text">${aff}</div>
          <div class="affirmation-count">${state.affirmationCount} times achieved</div>
          ${isLockedToday && state.affirmationResultToday === 'achieved' ? `
            <div class="affirmation-celebration ${isCelebrating ? 'active' : ''}">
              <div class="affirmation-celebrate-title">Amazing work!</div>
              <div class="affirmation-celebrate-sub">You completed your daily affirmation.</div>
              <div class="affirmation-burst" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            </div>
          ` : ''}
          ${!isLockedToday ? `
            <div class="affirmation-actions">
            ${hasPendingCheckIn
              ? `
                <button class="modal-action-btn primary" id="affirmAchievedBtn" style="width:auto;display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:100px">${ICONS.sparkle} I Achieved It</button>
                <button class="modal-action-btn" id="affirmNotYetBtn" style="width:auto;display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:100px">Not Yet</button>
              `
              : `
                <button class="modal-action-btn" id="rerollBtn" style="width:auto;display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:100px">${ICONS.refresh} Reroll</button>
                <button class="modal-action-btn primary" id="commitAffBtn" style="width:auto;display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:100px">${ICONS.sparkle} I Will Do This</button>
              `
            }
            </div>
          ` : ''}
          <div class="affirmation-hint">
            ${isLockedToday
              ? (state.affirmationResultToday === 'achieved'
                ? 'You have completed today\'s affirmation. Come back tomorrow for a new one.'
                : 'You checked in for today. Come back tomorrow for a new affirmation.')
              : hasPendingCheckIn
              ? `You committed at ${state.affirmationCheckIn?.committedAt}. Check back honestly: did you live it?`
              : 'Commit to this affirmation now, then come back later to check whether you achieved it.'}
          </div>
        </div>
      `,
    };
  }

  if (toolId === 'affirmation-streak') {
    return {
      title: 'Affirmation Streak',
      body: `
        <div style="text-align:center;padding:20px;">
          <div style="font-size:48px;font-weight:800;color:var(--accent-goals);margin-bottom:8px;">${state.affirmationCount}</div>
          <div style="color:var(--text-light);font-size:16px;margin-bottom:8px;">Affirmations Lived</div>
          <div style="color:var(--text-muted);font-size:13px;">Keep going! Every affirmation builds strength.</div>
        </div>
      `,
    };
  }

  if (toolId === 'badges') {
    const unlocked = state.achievements.filter(Boolean).length;
    const nextLevel = ACHIEVEMENT_LEVELS.find(level => level > state.affirmationCount);
    const progressHint = nextLevel
      ? `${Math.max(nextLevel - state.affirmationCount, 0)} to next badge (${nextLevel})`
      : 'All badges unlocked!';
    return {
      title: 'Achievement Badges',
      body: `
        <div style="text-align:center;padding:8px;">
          <div style="font-size:16px;font-weight:600;color:var(--accent-goals);margin-bottom:4px;">${unlocked} / 15 Unlocked</div>
          <div style="color:var(--text-muted);font-size:13px;margin-bottom:4px;">Badge levels: ${ACHIEVEMENT_LEVELS.join(', ')}</div>
          <div style="color:var(--text-muted);font-size:12px;margin-bottom:20px;">${progressHint}</div>
          <div class="badge-grid">
            ${state.achievements.map((a, i) => `
              <div class="badge ${a ? 'unlocked' : 'locked'}">${BADGE_SYMS[i]}</div>
            `).join('')}
          </div>
        </div>
      `,
    };
  }

  // Reflections
  if (toolId === 'todays-reflection') {
    const hasReflectionToday = Boolean(state.reflectionToday);
    const celebrating = Boolean(state.modalData?.reflectionCelebrating);
    return {
      title: "Today's Reflection",
      body: `
        <div style="text-align:center;margin-bottom:16px;">
          <div style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">What went well today?</div>
          <div style="color:var(--text-muted);font-size:13px;">Write about something you're proud of</div>
        </div>
        ${hasReflectionToday
          ? `
            <div class="affirmation-celebration ${celebrating ? 'active' : ''}" style="max-width:none;margin-bottom:12px;">
              <div class="affirmation-celebrate-title">Reflection saved</div>
              <div class="affirmation-celebrate-sub">You have completed today's reflection. Come back tomorrow for the next one.</div>
              <div class="affirmation-burst" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            </div>
            <div class="reflection-entry">
              <div class="reflection-date">${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div class="reflection-text">${state.reflectionToday}</div>
            </div>
          `
          : `
            <textarea class="modal-textarea" id="reflectionInput" placeholder="I felt proud when... I learned... Next time I will..."></textarea>
            <button class="modal-action-btn primary" id="saveReflectionBtn">Save Reflection</button>
          `}
      `,
    };
  }

  if (toolId === 'growth-log') {
    return {
      title: 'Growth Log',
      body: `
        <div style="margin-top:8px;">
          ${state.reflections.length === 0 ? '<div style="text-align:center;color:var(--text-muted);padding:32px;">No reflections yet. Start writing!</div>' :
            state.reflections.map(r => `
              <div class="reflection-entry">
                <div class="reflection-date">${r.date}</div>
                <div class="reflection-text">${r.text}</div>
              </div>
            `).join('')
          }
        </div>
      `,
    };
  }

  if (toolId === 'skills-tracker') {
    return {
      title: 'Skills Tracker',
      body: `
        <div style="text-align:center;padding:32px;">
          <div style="font-size:16px;font-weight:600;color:var(--text-white);margin-bottom:8px;">Skills I'm Building</div>
          <div style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">Track the skills you're developing</div>
          <input class="modal-input" id="intentionInput" type="text" placeholder="A skill to grow (e.g., listening, teamwork, staying calm)" maxlength="120" />
          <button class="modal-action-btn primary" id="addIntentionBtn">Add Skill</button>
          <div id="intentionsList" style="margin-top:16px;">
            ${state.intentions.map((item, i) => `
              <div class="list-item">
                <button class="list-check ${item.done ? 'checked' : ''}" data-idx="${i}">${item.done ? '✓' : ''}</button>
                <span class="list-item-text ${item.done ? 'completed' : ''}">${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `,
    };
  }

  if (toolId === 'weekly-planner') {
    const day = PLANNER_DAYS.includes(state.plannerActiveDay) ? state.plannerActiveDay : 'Monday';
    const lessons = state.plannerLessons[day] || [];
    const dayPlan = state.plannerDayPlans[day] || '';
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    return {
      title: 'Weekly Planner',
      body: `
        <div class="planner-wrap">
          <div class="planner-day-tabs">
            ${PLANNER_DAYS.map(d => `
              <button class="planner-day-btn ${d === day ? 'active' : ''}" data-planner-day="${d}">${d.slice(0, 3)}</button>
            `).join('')}
          </div>
          <div class="planner-panel">
            <div class="planner-section-title">${day} Plan</div>
            ${!isWeekend ? `
              <div class="planner-lesson-inputs">
                <input class="modal-input planner-time-input" id="plannerTimeInput" type="time" title="Optional" />
                <input class="modal-input planner-lesson-input" id="plannerLessonInput" type="text" maxlength="80" placeholder="Lesson name (e.g., Maths, Reading, Science)" />
                <button class="modal-action-btn primary planner-add-btn" id="plannerAddLessonBtn">Add</button>
              </div>
              <div class="planner-lesson-list">
                ${lessons.length === 0
                  ? '<div class="planner-empty">No lessons yet.</div>'
                  : lessons.map((entry, i) => `
                      <div class="planner-lesson-item">
                        <div class="planner-lesson-time">${entry.time || '--:--'}</div>
                        <div class="planner-lesson-name">${entry.lesson}</div>
                        <button class="planner-remove-btn" data-planner-rm="${i}">Remove</button>
                      </div>
                    `).join('')
                }
              </div>
            ` : `
              <div class="planner-weekend-note">Weekend plans</div>
            `}
            <textarea class="modal-textarea planner-day-text" id="plannerDayText" placeholder="${isWeekend ? 'Weekend plans... Who are you seeing? What will you do? Any fun plans?' : 'Plan for the day... What are you looking forward to? Which teachers do you have? What is for lunch? Anything after school?'}">${dayPlan}</textarea>
          </div>
        </div>
      `,
    };
  }

  if (toolId === 'weekly-look-forward') {
    return {
      title: 'Things to Look Forward To',
      body: `
        <div class="planner-panel">
          <div class="planner-section-title">This week</div>
          <textarea class="modal-textarea planner-week-text" id="plannerWeekText" placeholder="This week I am excited for... Maybe: a club, a trip, a lesson, seeing family, weekend plans">${state.plannerWeeklyFocus}</textarea>
        </div>
      `,
    };
  }

  if (toolId.startsWith('mood-guide-')) {
    const mood = toolId.replace('mood-guide-', '') as 'happiness' | 'energy' | 'calmness' | 'confidence';
    const titleMap = {
      happiness: 'My Happiness Levels',
      energy: 'My Energy Levels',
      calmness: 'My Calmness Levels',
      confidence: 'My Confidence Levels',
    };
    const labelMap = {
      happiness: 'Happiness',
      energy: 'Energy',
      calmness: 'Calmness',
      confidence: 'Confidence',
    };
    const value = state.moods[mood];
    return {
      title: titleMap[mood],
      body: `
        <div class="mood-guide-grid single">
          <div class="mood-guide-card ${mood}">
            <div class="mood-guide-top">
              <div class="mood-guide-label">${labelMap[mood]}</div>
              <div class="mood-guide-value">${value}%</div>
            </div>
            <div class="mood-guide-tip">${getMoodAdvice(mood, value)}</div>
          </div>
        </div>
      `,
    };
  }

  // Check-in
  if (toolId === 'mood-check' || toolId === 'energy-check' || toolId === 'calm-check') {
    const sliders: Record<string, { key: string; label: string; low: string; high: string; cls: string }[]> = {
      'mood-check': [
        { key: 'happiness', label: 'Happiness', low: 'Low', high: 'High', cls: 'happiness' },
        { key: 'energy', label: 'Energy', low: 'Tired', high: 'Energised', cls: 'energy' },
        { key: 'calmness', label: 'Calmness', low: 'Stressed', high: 'Calm', cls: 'calmness' },
        { key: 'confidence', label: 'Confidence', low: 'Unsure', high: 'Confident', cls: 'confidence' },
      ],
      'energy-check': [
        { key: 'energy', label: 'Energy Level', low: 'Tired', high: 'Energised', cls: 'energy' },
      ],
      'calm-check': [
        { key: 'calmness', label: 'Calmness Level', low: 'Stressed', high: 'Calm', cls: 'calmness' },
      ],
    };
    const s = sliders[toolId];
    const titles: Record<string, string> = { 'mood-check': 'Mood Check-in', 'energy-check': 'Energy Check', 'calm-check': 'Calmness Check' };
    return {
      title: titles[toolId],
      body: `
        ${s.map(sl => `
          <div class="slider-card">
            <div class="slider-top">
              <span class="slider-label">${sl.label}</span>
            </div>
            <div class="slider-value" id="val-${sl.key}">${state.moods[sl.key]}%</div>
            <div class="slider-range-labels"><span>${sl.low}</span><span>${sl.high}</span></div>
            <input type="range" min="0" max="100" value="${state.moods[sl.key]}" class="mood-slider ${sl.cls}" data-mood="${sl.key}" />
          </div>
        `).join('')}
        <button class="modal-action-btn primary" id="modalCloseAction">Save & Close</button>
      `,
    };
  }

  // Progress
  if (toolId === 'weekly-overview') {
    const bars = [30, 55, 42, 70, 88, 65, 48];
    const colors = ['#a78bfa', '#22d3ee', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#f59e0b'];
    return {
      title: 'Weekly Overview',
      body: `
        <div class="progress-stats">
          <div class="stat-card"><div class="stat-number" style="color:#f472b6">${state.affirmationCount}</div><div class="stat-label">Affirmations</div></div>
          <div class="stat-card"><div class="stat-number" style="color:#fbbf24">${state.dailyGoals.filter(i => i.done).length}</div><div class="stat-label">Goals Done</div></div>
          <div class="stat-card"><div class="stat-number" style="color:#34d399">${state.reflections.length}</div><div class="stat-label">Reflections</div></div>
          <div class="stat-card"><div class="stat-number" style="color:#f59e0b">${state.achievements.filter(Boolean).length}</div><div class="stat-label">Badges</div></div>
        </div>
        <div class="mini-chart">
          ${bars.map((h, i) => `<div class="mini-chart-bar" style="height:${h}%;background:${colors[i]};"></div>`).join('')}
        </div>
      `,
    };
  }

  if (toolId === 'my-achievements') {
    const unlocked = state.achievements.filter(Boolean).length;
    return {
      title: 'My Achievements',
      body: `
        <div style="text-align:center;padding:8px;">
          <div style="font-size:16px;font-weight:600;color:var(--accent-goals);margin-bottom:16px;">${unlocked} / 15 Unlocked</div>
          <div class="badge-grid">
            ${state.achievements.map((a, i) => `<div class="badge ${a ? 'unlocked' : 'locked'}">${BADGE_SYMS[i]}</div>`).join('')}
          </div>
        </div>
      `,
    };
  }

  if (toolId === 'my-journey') {
    const unlocked = state.achievements.filter(Boolean).length;
    return {
      title: 'My Journey',
      body: `
        <div class="progress-stats">
          <div class="stat-card"><div class="stat-number">${state.reflections.length}</div><div class="stat-label">Reflections</div></div>
          <div class="stat-card"><div class="stat-number">${state.dailyGoals.length}</div><div class="stat-label">Goals Set</div></div>
          <div class="stat-card"><div class="stat-number">${state.affirmationCount}</div><div class="stat-label">Affirmations</div></div>
          <div class="stat-card"><div class="stat-number">${unlocked}</div><div class="stat-label">Badges</div></div>
        </div>
      `,
    };
  }

  return { title: 'Tool', body: '<div style="text-align:center;color:var(--text-muted);padding:32px;">Coming soon</div>' };
}

function formatTime(s: number): string {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}

function updateSliderVibe(slider: HTMLInputElement) {
  const mood = slider.dataset.mood || 'happiness';
  const rgb = MOOD_RGB[mood] || '0, 122, 255';
  const value = Math.max(0, Math.min(100, parseInt(slider.value, 10) || 0));
  const ratio = value / 100;
  const intensity = Math.pow(ratio, 0.9);
  const rise = 20 + intensity * 68;
  const highBlend = Math.max(0, (ratio - 0.78) / 0.22); // 0 -> 1 from 78% to 100%
  const ultraBlend = Math.max(0, (ratio - 0.9) / 0.1); // 0 -> 1 from 90% to 100%
  const softMid = Math.min(Math.max(rise - (22 + highBlend * 6), 20), 76);
  const softTop = Math.min(Math.max(rise + (6 - highBlend * 4 - ultraBlend * 3), 42), 89);
  const featherTop = Math.min(softTop + 12 + highBlend * 8 + ultraBlend * 10, 99.4);
  const hotspotY = 112 - intensity * 38;

  slider.style.background = `
    radial-gradient(
      52px 26px at ${value}% 50%,
      rgba(${rgb}, ${0.18 + intensity * 0.22}) 0%,
      rgba(${rgb}, ${0.1 + intensity * 0.15}) 48%,
      rgba(${rgb}, 0.02) 100%
    ),
    linear-gradient(
      90deg,
      rgba(${rgb}, ${0.12 + intensity * 0.14}) 0%,
      rgba(${rgb}, ${0.24 + intensity * 0.2}) 50%,
      rgba(${rgb}, ${0.12 + intensity * 0.14}) 100%
    )
  `;

  // Keep slider direction natural; only the visual treatment intensifies with value.
  slider.style.direction = 'ltr';

  slider.style.boxShadow = `0 0 ${8 + intensity * 16}px rgba(${rgb}, ${0.05 + intensity * 0.16})`;
  slider.style.setProperty('--thumb-glow', `0 0 ${8 + intensity * 14}px rgba(${rgb}, ${0.12 + intensity * 0.26})`);

  const card = slider.closest('.slider-card') as HTMLElement | null;
  if (card) {
    card.style.background = `
      radial-gradient(
        175% 105% at 50% 115%,
        rgba(${rgb}, ${0.055 + intensity * 0.11}) 0%,
        rgba(${rgb}, ${0.042 + intensity * 0.08}) ${softMid}%,
        rgba(${rgb}, ${0.02 + intensity * 0.038 - ultraBlend * 0.01}) ${softTop}%,
        rgba(${rgb}, ${0.006 + intensity * 0.012 - ultraBlend * 0.004}) ${featherTop}%,
        rgba(255, 255, 255, 0) 100%
      ),
      radial-gradient(
        145% 95% at ${value}% ${hotspotY}%,
        rgba(${rgb}, ${0.06 + intensity * 0.16}) 0%,
        rgba(${rgb}, ${0.03 + intensity * 0.08}) 46%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.86) 0%,
        rgba(255, 255, 255, 0.78) 68%,
        rgba(255, 255, 255, 0.68) 100%
      )
    `;
    card.style.borderColor = `rgba(${rgb}, ${0.08 + intensity * 0.2})`;
    card.style.boxShadow = `
      0 10px ${14 + intensity * 22}px rgba(${rgb}, ${0.04 + intensity * 0.11}),
      inset 0 -14px 30px rgba(${rgb}, ${0.02 + intensity * 0.07})
    `;
  }

  const valueEl = document.getElementById(`val-${mood}`);
  if (valueEl) {
    valueEl.style.color = `rgba(${rgb}, ${0.48 + intensity * 0.36})`;
    valueEl.style.textShadow = `0 0 ${5 + intensity * 11}px rgba(${rgb}, ${0.07 + intensity * 0.2})`;
  }
}

function applyMoodGuideCardVibe() {
  document.querySelectorAll('.glass-card[data-mood-guide]').forEach(cardEl => {
    const card = cardEl as HTMLElement;
    const mood = (card.dataset.moodGuide || 'happiness') as 'happiness' | 'energy' | 'calmness' | 'confidence';
    const rgb = MOOD_RGB[mood] || '0, 122, 255';
    const value = Math.max(0, Math.min(100, state.moods[mood] ?? 50));
    const ratio = value / 100;
    const intensity = Math.pow(ratio, 0.9);
    const rise = 20 + intensity * 68;
    const highBlend = Math.max(0, (ratio - 0.78) / 0.22);
    const ultraBlend = Math.max(0, (ratio - 0.9) / 0.1);
    const softMid = Math.min(Math.max(rise - (22 + highBlend * 6), 20), 76);
    const softTop = Math.min(Math.max(rise + (6 - highBlend * 4 - ultraBlend * 3), 42), 89);
    const featherTop = Math.min(softTop + 12 + highBlend * 8 + ultraBlend * 10, 99.4);
    const hotspotY = 112 - intensity * 38;

    card.style.background = `
      radial-gradient(
        175% 105% at 50% 115%,
        rgba(${rgb}, ${0.055 + intensity * 0.11}) 0%,
        rgba(${rgb}, ${0.042 + intensity * 0.08}) ${softMid}%,
        rgba(${rgb}, ${0.02 + intensity * 0.038 - ultraBlend * 0.01}) ${softTop}%,
        rgba(${rgb}, ${0.006 + intensity * 0.012 - ultraBlend * 0.004}) ${featherTop}%,
        rgba(255, 255, 255, 0) 100%
      ),
      radial-gradient(
        145% 95% at 50% ${hotspotY}%,
        rgba(${rgb}, ${0.06 + intensity * 0.16}) 0%,
        rgba(${rgb}, ${0.03 + intensity * 0.08}) 46%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.86) 0%,
        rgba(255, 255, 255, 0.78) 68%,
        rgba(255, 255, 255, 0.68) 100%
      )
    `;
    card.style.borderColor = `rgba(${rgb}, ${0.08 + intensity * 0.2})`;
    card.style.boxShadow = `
      0 10px ${14 + intensity * 22}px rgba(${rgb}, ${0.04 + intensity * 0.11}),
      inset 0 -14px 30px rgba(${rgb}, ${0.02 + intensity * 0.07})
    `;
  });
}

function getMoodAdvice(
  key: 'happiness' | 'energy' | 'calmness' | 'confidence',
  value: number,
): string {
  if (key === 'energy') {
    if (value < 35) return 'Low energy. Drink water, breathe, then do one tiny task.';
    if (value < 70) return 'Steady energy. This is normal. Check in again later.';
    return 'Great energy! Keep your rhythm and use it for a good start.';
  }
  if (key === 'happiness') {
    if (value < 35) return 'Tough moment. Talk to someone kind and do one small nice thing.';
    if (value < 70) return 'You are doing okay. Find one little thing to enjoy.';
    return 'You are feeling good. Share that positive vibe with someone.';
  }
  if (key === 'calmness') {
    if (value < 35) return 'Feeling stressed. Try 3 slow breaths and relax your shoulders.';
    if (value < 70) return 'Balanced and grounded. Keep this steady pace.';
    return 'Very calm. Great job. Use this calm for your next task.';
  }
  if (value < 35) return 'Confidence is low. Start with one easy win.';
  if (value < 70) return 'Your confidence is building. Keep going step by step.';
  return 'Strong confidence! You are ready for a challenge.';
}

// ============================================
// EVENTS
// ============================================
function bindEvents() {
  applyMoodGuideCardVibe();
  // Category nav
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = (btn as HTMLElement).dataset.cat!;
      render();
    });
  });

  // Card clicks
  document.querySelectorAll('.glass-card[data-subtool]').forEach(card => {
    card.addEventListener('click', () => {
      state.activeModal = (card as HTMLElement).dataset.subtool!;
      state.modalData = null;
      stopBreathing();
      render();
    });
  });

  // Modal close
  document.getElementById('toolOverlay')?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'toolOverlay') {
      state.activeModal = null;
      stopBreathing();
      render();
    }
  });
  document.getElementById('modalCloseBtn')?.addEventListener('click', () => {
    state.activeModal = null;
    stopBreathing();
    render();
  });
  document.getElementById('modalCloseAction')?.addEventListener('click', () => {
    state.activeModal = null;
    render();
  });

  // Sliders
  document.querySelectorAll('.mood-slider').forEach(slider => {
    updateSliderVibe(slider as HTMLInputElement);
    slider.addEventListener('input', (e) => {
      const t = e.target as HTMLInputElement;
      const mood = t.dataset.mood!;
      state.moods[mood] = parseInt(t.value, 10);
      const el = document.getElementById(`val-${mood}`);
      if (el) el.textContent = `${t.value}%`;
      updateSliderVibe(t);
    });
  });

  // Breathing
  document.getElementById('breathStartBtn')?.addEventListener('click', () => {
    if (state.breathingActive) { stopBreathing(); render(); }
    else { startBreathing(); }
  });

  // Affirmations
  document.getElementById('rerollBtn')?.addEventListener('click', () => {
    ensureDailyAffirmationFresh();
    if (state.affirmationResultToday) return;
    if (state.affirmationCheckIn) return;
    state.affirmationIndex = (state.affirmationIndex + 1) % AFFIRMATIONS.length;
    render();
  });
  document.getElementById('commitAffBtn')?.addEventListener('click', () => {
    ensureDailyAffirmationFresh();
    if (state.affirmationResultToday) return;
    if (state.affirmationCheckIn) return;
    state.affirmationCheckIn = {
      index: state.affirmationIndex,
      committedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
    state.affirmationTodayIndex = state.affirmationIndex;
    render();
  });
  document.getElementById('affirmAchievedBtn')?.addEventListener('click', () => {
    ensureDailyAffirmationFresh();
    if (state.affirmationResultToday) return;
    if (!state.affirmationCheckIn) return;
    state.affirmationCount++;
    syncAchievementsWithAffirmations();
    state.affirmationCheckIn = null;
    state.affirmationTodayIndex = state.affirmationTodayIndex ?? state.affirmationIndex;
    state.affirmationResultToday = 'achieved';
    state.modalData = { ...(state.modalData || {}), affirmationCelebrating: true };
    render();
    window.setTimeout(() => {
      if (state.activeModal !== 'daily-affirmation') return;
      state.modalData = { ...(state.modalData || {}), affirmationCelebrating: false };
      render();
    }, 1100);
  });
  document.getElementById('affirmNotYetBtn')?.addEventListener('click', () => {
    ensureDailyAffirmationFresh();
    if (state.affirmationResultToday) return;
    if (!state.affirmationCheckIn) return;
    state.affirmationCheckIn = null;
    state.affirmationTodayIndex = state.affirmationTodayIndex ?? state.affirmationIndex;
    state.affirmationResultToday = 'not_yet';
    render();
  });

  // Intentions / Skills
  document.getElementById('addGoalBtn')?.addEventListener('click', () => {
    ensureDailyGoalsFresh();
    const input = document.getElementById('goalInput') as HTMLInputElement;
    const text = input?.value.trim();
    if (!text) return;
    if (state.dailyGoals.some(g => g.text === text)) return;
    state.dailyGoals.push({ text, done: false });
    state.modalData = { ...(state.modalData || {}), justAddedPreset: text };
    render();
  });
  document.getElementById('goalInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('addGoalBtn')?.click();
  });
  document.getElementById('addLongTermGoalBtn')?.addEventListener('click', () => {
    const input = document.getElementById('longTermGoalInput') as HTMLInputElement;
    const text = input?.value.trim();
    if (!text) return;
    if (state.longTermGoals.includes(text)) return;
    state.longTermGoals.push(text);
    render();
  });
  document.getElementById('longTermGoalInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('addLongTermGoalBtn')?.click();
  });
  document.getElementById('longTermDateInput')?.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    state.longTermTargetDate = input.value;
  });
  document.querySelectorAll('.goal-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt((btn as HTMLElement).dataset.longGoalRm || '-1', 10);
      if (idx < 0 || idx >= state.longTermGoals.length) return;
      state.longTermGoals.splice(idx, 1);
      render();
    });
  });

  document.getElementById('addIntentionBtn')?.addEventListener('click', () => {
    if (state.activeModal !== 'skills-tracker') return;
    const input = document.getElementById('intentionInput') as HTMLInputElement;
    if (input?.value.trim()) {
      state.intentions.push({ text: input.value.trim(), done: false });
      render();
    }
  });
  document.getElementById('intentionInput')?.addEventListener('keydown', (e) => {
    if (state.activeModal !== 'skills-tracker') return;
    if (e.key === 'Enter') document.getElementById('addIntentionBtn')?.click();
  });
  document.querySelectorAll('.list-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt((btn as HTMLElement).dataset.idx || '0');
      state.intentions[idx].done = !state.intentions[idx].done;
      render();
    });
  });

  // Goal preset library
  document.querySelectorAll('.goal-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = (btn as HTMLElement).dataset.goalCat;
      if (!cat) return;
      state.modalData = { ...(state.modalData || {}), goalCategory: cat };
      render();
    });
  });
  document.querySelectorAll('.goal-preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      ensureDailyGoalsFresh();
      const preset = (btn as HTMLElement).dataset.goalPreset;
      if (!preset) return;
      const alreadyChosen = state.dailyGoals.some(i => i.text === preset);
      if (alreadyChosen) return;
      state.dailyGoals.push({ text: preset, done: false });
      state.modalData = { ...(state.modalData || {}), justAddedPreset: preset };
      render();
      window.setTimeout(() => {
        if (!state.activeModal || !state.activeModal.includes('goals')) return;
        if (state.modalData?.justAddedPreset !== preset) return;
        state.modalData = { ...(state.modalData || {}), justAddedPreset: '' };
        render();
      }, 420);
    });
  });
  document.getElementById('surpriseGoalsBtn')?.addEventListener('click', () => {
    ensureDailyGoalsFresh();
    const activeLibrary = getGoalLibraryForTool(state.activeModal || 'daily-goals');
    const exclude = [...state.dailyGoals.map(g => g.text), ...((state.modalData?.surpriseGoals as string[]) || [])];
    const surpriseGoals = pickRandomGoals(activeLibrary, 5, exclude);
    state.modalData = { ...(state.modalData || {}), surpriseGoals };
    render();
  });
  document.querySelectorAll('.goal-surprise-add').forEach(btn => {
    btn.addEventListener('click', () => {
      ensureDailyGoalsFresh();
      const goal = (btn as HTMLElement).dataset.surpriseAdd;
      if (!goal) return;
      if (!state.dailyGoals.some(g => g.text === goal)) state.dailyGoals.push({ text: goal, done: false });
      const surpriseGoals = (((state.modalData?.surpriseGoals as string[]) || []).filter(g => g !== goal));
      state.modalData = { ...(state.modalData || {}), surpriseGoals, justAddedPreset: goal };
      render();
    });
  });
  document.querySelectorAll('.goal-surprise-bin').forEach(btn => {
    btn.addEventListener('click', () => {
      const goal = (btn as HTMLElement).dataset.surpriseBin;
      if (!goal) return;
      const surpriseGoals = (((state.modalData?.surpriseGoals as string[]) || []).filter(g => g !== goal));
      state.modalData = { ...(state.modalData || {}), surpriseGoals };
      render();
    });
  });
  document.querySelectorAll('.goal-done-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ensureDailyGoalsFresh();
      const idx = parseInt((btn as HTMLElement).dataset.goalIdx || '-1', 10);
      if (idx < 0 || idx >= state.dailyGoals.length) return;
      const wasDone = state.dailyGoals[idx].done;
      state.dailyGoals[idx].done = !wasDone;
      if (!wasDone) {
        state.modalData = { ...(state.modalData || {}), goalCelebrating: true };
        render();
        window.setTimeout(() => {
          if (state.activeModal !== 'my-goals') return;
          state.modalData = { ...(state.modalData || {}), goalCelebrating: false };
          render();
        }, 900);
        return;
      }
      render();
    });
  });

  // Planner
  document.querySelectorAll('.planner-day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = (btn as HTMLElement).dataset.plannerDay;
      if (!day) return;
      state.plannerActiveDay = day;
      render();
    });
  });
  document.getElementById('plannerAddLessonBtn')?.addEventListener('click', () => {
    const day = state.plannerActiveDay;
    const timeInput = document.getElementById('plannerTimeInput') as HTMLInputElement;
    const lessonInput = document.getElementById('plannerLessonInput') as HTMLInputElement;
    const lesson = lessonInput?.value.trim();
    if (!lesson) return;
    const time = timeInput?.value || '';
    const entries = [...(state.plannerLessons[day] || []), { time, lesson }];
    entries.sort((a, b) => a.time.localeCompare(b.time));
    state.plannerLessons[day] = entries;
    render();
  });
  document.getElementById('plannerLessonInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('plannerAddLessonBtn')?.click();
  });
  document.querySelectorAll('.planner-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = state.plannerActiveDay;
      const idx = parseInt((btn as HTMLElement).dataset.plannerRm || '-1', 10);
      const entries = [...(state.plannerLessons[day] || [])];
      if (idx < 0 || idx >= entries.length) return;
      entries.splice(idx, 1);
      state.plannerLessons[day] = entries;
      render();
    });
  });
  document.getElementById('plannerDayText')?.addEventListener('input', (e) => {
    const ta = e.target as HTMLTextAreaElement;
    state.plannerDayPlans[state.plannerActiveDay] = ta.value;
  });
  document.getElementById('plannerWeekText')?.addEventListener('input', (e) => {
    const ta = e.target as HTMLTextAreaElement;
    state.plannerWeeklyFocus = ta.value;
  });

  // Reflections
  document.getElementById('saveReflectionBtn')?.addEventListener('click', () => {
    ensureDailyReflectionFresh();
    if (state.reflectionToday) return;
    const ta = document.getElementById('reflectionInput') as HTMLTextAreaElement;
    if (ta?.value.trim()) {
      state.reflectionToday = ta.value.trim();
      state.reflections.unshift({
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        text: state.reflectionToday,
      });
      state.modalData = { ...(state.modalData || {}), reflectionCelebrating: true };
      render();
      window.setTimeout(() => {
        if (state.activeModal !== 'todays-reflection') return;
        state.modalData = { ...(state.modalData || {}), reflectionCelebrating: false };
        render();
      }, 1000);
    }
  });
}

// ============================================
// BREATHING
// ============================================
function startBreathing() {
  state.breathingActive = true;
  let remaining = state.breathingDuration;
  const circle = document.getElementById('breathCircle');
  const prompt = document.getElementById('breathPrompt');
  const timer = document.getElementById('breathTimer');
  const btn = document.getElementById('breathStartBtn');
  if (btn) btn.textContent = 'Stop';

  const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  let pi = 0;
  function next() {
    if (!state.breathingActive) return;
    const p = phases[pi % 4];
    if (prompt) prompt.textContent = p;
    circle?.classList.remove('inhale', 'exhale');
    if (p === 'Inhale') circle?.classList.add('inhale');
    if (p === 'Exhale') circle?.classList.add('exhale');
    pi++;
    breathingTimeout = window.setTimeout(next, 4000);
  }
  next();
  breathingInterval = window.setInterval(() => {
    remaining--;
    if (timer) timer.textContent = formatTime(remaining);
    if (remaining <= 0) {
      stopBreathing();
      if (prompt) prompt.textContent = 'Well done!';
      circle?.classList.remove('inhale', 'exhale');
      if (btn) btn.textContent = 'Start Breathing';
    }
  }, 1000);
}

function stopBreathing() {
  state.breathingActive = false;
  if (breathingInterval) { clearInterval(breathingInterval); breathingInterval = null; }
  if (breathingTimeout) { clearTimeout(breathingTimeout); breathingTimeout = null; }
}

// ============================================
// INIT
// ============================================
render();

// ============================================
// DREAMY CURSOR GLOW — Large soft blobs (Tux Karma style)
// ============================================
(function initCursorGlow() {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Create 3 large blurred blobs that follow at different speeds
  const blobs = [
    { el: document.createElement('div'), x: mouseX, y: mouseY, speed: 0.08, size: 350, color: 'rgba(175, 82, 222, 0.15)', blur: 80 },
    { el: document.createElement('div'), x: mouseX, y: mouseY, speed: 0.04, color: 'rgba(50, 173, 230, 0.12)', size: 280, blur: 90 },
    { el: document.createElement('div'), x: mouseX, y: mouseY, speed: 0.02, color: 'rgba(255, 55, 95, 0.10)', size: 240, blur: 100 },
  ];

  blobs.forEach(b => {
    b.el.style.cssText = `
      position: fixed;
      width: ${b.size}px;
      height: ${b.size}px;
      border-radius: 50%;
      background: ${b.color};
      filter: blur(${b.blur}px);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      will-change: left, top;
      mix-blend-mode: normal;
    `;
    document.body.appendChild(b.el);
  });

  function tick() {
    blobs.forEach(b => {
      b.x += (mouseX - b.x) * b.speed;
      b.y += (mouseY - b.y) * b.speed;
      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
    });
    requestAnimationFrame(tick);
  }

  tick();
})();


