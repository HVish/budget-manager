import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Login from '../Auth/Login';
import Dashboard from '../Dashboard';
import { getSession } from '../shared/session';
import TransactionsPage from '../Transactions';
import Layout from './Layout';

const Main = () => {
  const isLoggedIn = Boolean(getSession());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    function updateOnSessionChange() {
      if (isLoggedIn && location.pathname === '/auth') {
        navigate('/app/dashboard');
      } else if (!isLoggedIn) {
        navigate('/auth');
      }
    },
    [isLoggedIn, location.pathname, navigate]
  );

  return (
    <Routes>
      <Route path="auth/*" element={<Login />} />
      <Route path="app/*" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="wallets" element="Wallets" />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate to={isLoggedIn ? 'app/dashboard' : 'auth'} replace />
        }
      />
    </Routes>
  );
};

export default Main;
