import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { startOfYear } from 'date-fns';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { fetchTrends } from '../transactions/store/actions';

type FilterBy = 'day' | 'month' | 'year';

const Filter = () => {
  const dispatch = useAppDispatch();

  const [filterBy, setFilterBy] = useState<FilterBy>('day');
  const [start, setStart] = useState<Date | null>(startOfYear(new Date()));
  const [end, setEnd] = useState<Date | null>(new Date());

  useEffect(
    function fetchData() {
      if (!start || !end) return;
      dispatch(
        fetchTrends({
          by: filterBy,
          end: end.getTime(),
          start: start.getTime(),
        })
      );
    },
    [dispatch, end, filterBy, start]
  );

  const handleByChange = (e: SelectChangeEvent<FilterBy>) => {
    setFilterBy(e.target.value as FilterBy);
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <FormControl variant="filled" sx={{ minWidth: 90 }}>
        <InputLabel>By</InputLabel>
        <Select value={filterBy} onChange={handleByChange}>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        label="Start"
        value={start}
        inputFormat="dd-MM-yyyy"
        onChange={date => setStart(date)}
        renderInput={params => <TextField {...params} />}
      />
      <DatePicker
        label="End"
        value={end}
        inputFormat="dd-MM-yyyy"
        onChange={date => setEnd(date)}
        renderInput={params => <TextField {...params} />}
      />
    </Stack>
  );
};

export default Filter;
