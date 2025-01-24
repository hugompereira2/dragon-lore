import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import './style.scss';
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('userEmail');
    router.push('/login');
  }

  return (
    <div id="navbar">
      <Link href={'/'}>
        <Image priority className="logo" src={'/assets/logo/logo-white.svg'} alt="logo" width={70} height={70} />
      </Link>
      <button className="logout-button" onClick={handleLogout}>Sair</button>
    </div>
  );
}
