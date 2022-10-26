import { useMemo, useState } from 'react';
import { format, startOfMonth } from 'date-fns';
import { MonthPicker as MonthPickerComp } from '@mui/x-date-pickers';

import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';

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

  const handleClose = () => setIsOpen(false);

  const handleChange = (date: Date) => {
    onChange(date.getTime());
    handleClose();
  };

  return (
    <>
      <Button
        className={classNames}
        variant="outlined"
        endIcon={<ExpandIcon />}
        onClick={showCalender}
      >
        {label}
      </Button>
      <Dialog open={isOpen}>
        <DialogTitle
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Select Month
          <IconButton edge="end" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <MonthPickerComp
            disableFuture
            date={value}
            onChange={handleChange}
            sx={{ width: '100%', maxWidth: '310px' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MonthPicker;
