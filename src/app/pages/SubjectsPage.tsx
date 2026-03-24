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
      description="Pick your top 3 animals."
      animals={ANIMALS}
    />
  );
}
