import { VotingPage } from '../components/VotingPage';

const LESSONS = [
  'English',
  'Maths',
  'Science',
  'Geography',
  'History',
  'Computing',
  'PE',
  'RE',
  'PSHE',
  'DT',
  'Art',
  'Music'
];

export default function SubjectsPage() {
  return (
    <VotingPage
      title="Top School Lessons"
      description="Pick your top 3 lessons."
      animals={LESSONS}
    />
  );
}
