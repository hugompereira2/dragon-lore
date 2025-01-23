import { Metadata } from 'next';
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: 'Login | Dragon Lore',
  description: 'Login Screen | Dragon Lore',
};

const Page: React.FC = () => {
  return <LoginPage />;
};

export default Page;