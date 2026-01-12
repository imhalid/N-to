 
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { UserService } from '@/services';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  // Kullanıcı login olmuş mu kontrol et
  const isAuthenticated = UserService.isAuthenticated();

  // Eğer login olmamışsa login sayfasına yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Login olmuşsa dashboard'a yönlendir
  return <Navigate to="/dashboard" />;
}

