 
import { UserService } from '@/services';
import './profile.css';

export default function ProfilePage() {
  const userId = UserService.getCurrentUserId();
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userCode = localStorage.getItem('userCode') || '';

  const handleLogout = () => {
    UserService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>PROFILE</h1>
        </div>

        <div className="profile-content">
          <div className="profile-field">
            <label>USERNAME</label>
            <div className="field-value">{userName}</div>
          </div>

          <div className="profile-field">
            <label>EMAIL</label>
            <div className="field-value">{userEmail}</div>
          </div>

          <div className="profile-field">
            <label>USER CODE</label>
            <div className="field-value code">{userCode}</div>
            <small>Share this code with others to receive notes</small>
          </div>

          <div className="profile-field">
            <label>USER ID</label>
            <div className="field-value">{userId}</div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="logout-button" onClick={handleLogout}>
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
}
