import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import CalendarComp from 'react-calendar';
import { format, startOfMonth } from 'date-fns';

import { ReactComponent as ExpandIcon } from '../assets/expand.svg';
import { colors } from '../shared/theme';
import Model from './Model';

const Root = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 86px;
  border: 1px solid ${colors.grey.main};
  border-radius: 8px;
  font-size: 14px;
  font-weight: normal;
  padding: 8px 12px;
  padding-right: 6px;
  color: ${colors.primary.main};
`;

const Icon = styled.span`
  width: 20px;
  height: 20px;
`;

const Calendar = styled(CalendarComp)`
  border-radius: 12px;

  & * {
    border-radius: 6px;
  }
`;

interface Props {
  classNames?: string;
  /** Unix timestamp in milli-seconds */
  value: number;
  onChange: (value: number) => any;
}

const MonthPicker = ({ classNames, value: _value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => startOfMonth(_value), [_value]);
  const label = useMemo(() => format(_value, 'MMM yyyy'), [_value]);

  const showCalender = () => setIsOpen(true);

  const handleChange = (date: Date) => {
    onChange(date.getTime());
    setIsOpen(false);
  };

  return (
    <>
      <Root className={classNames} onClick={showCalender}>
        {label}
        <Icon>
          <ExpandIcon />
        </Icon>
      </Root>
      <Model isOpen={isOpen}>
        <Calendar view="year" onClickMonth={handleChange} value={value} />
      </Model>
    </>
  );
};

export default MonthPicker;
