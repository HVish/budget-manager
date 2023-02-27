import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Login from '../auth/Login';
import Dashboard from '../dashboard';
import { getSession } from '../shared/session';
import { useAppDispatch } from '../store';
import { fetchAllTags } from '../tags/store/actions';
import TransactionsPage from '../transactions/TransactionsPage';
import Layout from './Layout';

const Main = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = Boolean(getSession());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchAllTags());
  }, [dispatch, isLoggedIn]);

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
