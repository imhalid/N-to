import { Link, useNavigate } from '@tanstack/react-router';
import { UserService } from '@/services';
import './header.css';

export default function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const userCode = localStorage.getItem('userCode') || '';

  const handleLogout = () => {
    UserService.logout();
    navigate({ to: '/login' });
  };

  return (
    <header className="metro-header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            N-TO
          </Link>
          <nav className="nav-links">
            <Link to="/dashboard" className="nav-link">
              NOTES
            </Link>
					</nav>
					<nav className="nav-links">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </nav>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-code">{userCode}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            SIGN OUT
          </button>
        </div>
      </div>
    </header>
  );
}
