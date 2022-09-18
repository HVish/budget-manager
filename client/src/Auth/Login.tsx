import { FormEventHandler, useState } from 'react';
import styled from '@emotion/styled';

import Input from '../components/Input';
import { setSession } from '../shared/session';
import { colors } from '../shared/theme';
import { login } from './api';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { getMediaQuery } from '../shared/media-query';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${colors.common.bg};

  @media ${getMediaQuery('mobile')} {
    padding: 0;
    display: block;
  }
`;

const AuthForm = styled.form`
  width: 360px;
  padding: 2rem;
  background-color: ${colors.common.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${getMediaQuery('mobile')} {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding-top: 20vh;
  }
`;

const Header = styled.h1`
  font-size: 1.5rem;
  color: ${colors.text.primary};
`;

const ErrorMessage = styled.div`
  background-color: ${colors.error.bg};
  color: ${colors.error.main};
  padding: 1rem 2rem;
  border-radius: 6px;
`;

const LoginButton = styled(Button)`
  margin-top: 2rem;
`;

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    const result = await login({ username, password });

    if ('error' in result) {
      setError(result.error);
      return;
    }

    setSession(result.token);
    navigate('/app/dashboard');
  };

  return (
    <Root>
      <AuthForm onSubmit={handleSubmit}>
        <Header>Login</Header>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          label="Username"
          value={username}
          onChange={setUsername}
        />
        <Input
          type="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <LoginButton>Login</LoginButton>
      </AuthForm>
    </Root>
  );
};

export default Login;
