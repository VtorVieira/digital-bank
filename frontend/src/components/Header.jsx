import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import dgbank from '../images/dgbank.svg';

export function Header() {
  return (
    <nav className="flex justify-between items-center border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md">
      <div className='w-96 mt-2 mb-2 ml-4'>
        <img
          className='rounded-lg w-20'
          src={dgbank}
          alt="Logo" />
      </div>
      <Link className="mr-2" to="/signin" >
        <FiLogOut className="text-[#FFFF]" />
      </Link>
    </nav>
  );
}