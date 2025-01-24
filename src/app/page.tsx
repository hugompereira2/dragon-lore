import { Metadata } from 'next';
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: 'Home | Dragon Lore',
  description: 'Home | Dragon Lore',
};

const Page: React.FC = () => {
  return <HomePage />;
};

export default Page;