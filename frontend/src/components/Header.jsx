import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';

export function Header() {
  return (
    <nav>
      <h1>
        Digital Bank
      </h1>
      <Link to="/signin">
        <FiLogOut />
      </Link>
    </nav>
  );
}