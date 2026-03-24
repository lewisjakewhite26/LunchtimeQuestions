import { VotingPage } from '../components/VotingPage';

const ANIMALS = [
  'Dolphin',
  'Elephant',
  'Lion',
  'Tiger',
  'Penguin',
  'Giraffe',
  'Panda',
  'Horse',
  'Owl',
  'Badger',
  'Axolotl',
  'Capybara',
  'Tortoise',
  'Koala',
  'Octopus'
];

export default function SubjectsPage() {
  return (
    <VotingPage
      title="Favourite Animals"
      description="Pick your top 3 animals. 1st gets 3 points, 2nd gets 2, and 3rd gets 1."
      animals={ANIMALS}
    />
  );
}
