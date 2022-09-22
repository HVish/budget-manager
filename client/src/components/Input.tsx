import styled from '@emotion/styled';
import { ChangeEvent, KeyboardEvent } from 'react';
import { colors } from '../shared/theme';

const color = '#2196f3';

const Root = styled.div`
  position: relative;
  margin-top: 16px;
`;

const Label = styled.label`
  color: #c6c6c6;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
`;

const InputField = styled.input`
  resize: none;
  background: none;
  color: ${colors.text.primary};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${colors.text.primary};

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &.filled ~ label {
    top: -14px;
    left: 0;
    font-size: 12px;
    color: ${colors.text.primary};
  }

  &:focus ~ label {
    color: ${color};
  }

  &:focus ~ .bar:before {
    width: 100%;
  }
`;

const Bar = styled.div`
  position: relative;
  display: block;
  width: 100%;

  &:before {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: ${color};
    transition: 300ms ease all;
    left: 0%;
  }
`;

interface Props {
  type: 'number' | 'text' | 'password';
  multiline?: boolean;
  autoComplete?: string;
  label: string;
  value: string;
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => any;
  onEnter?: (e: KeyboardEvent) => any;
}

const Input = ({
  type,
  autoComplete,
  multiline,
  label,
  value,
  onChange,
  onEnter,
}: Props) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter?.(e);
    }
  };

  return (
    <Root>
      <InputField
        as={multiline ? 'textarea' : undefined}
        type={type}
        value={value}
        autoComplete={autoComplete}
        className={value !== '' ? 'filled' : undefined}
        onChange={e => onChange(e.target.value, e)}
        onKeyDown={handleKeyPress}
      />
      <span className="highlight" />
      <Bar className="bar" />
      <Label>{label}</Label>
    </Root>
  );
};

export default Input;
