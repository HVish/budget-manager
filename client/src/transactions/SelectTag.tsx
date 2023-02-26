import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  createFilterOptions,
  TextField,
} from '@mui/material';
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from '@mui/icons-material';

import { Tag } from '../shared/types';
import { useAppDispatch } from '../store';
import { addTag } from '../tags/store/actions';
import { selectTags } from '../tags/store/selectors';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type TagOption = Tag & {
  inputValue?: string;
};

const filter = createFilterOptions<TagOption>();

interface Props {
  className?: string;
  value: TagOption[];
  onChange: (tags: TagOption[]) => void;
}

const SelectTag = ({ value, onChange }: Props) => {
  const dispatch = useAppDispatch();

  const tags = useSelector(selectTags());
  const [isSavingTag, setIsSavingTag] = useState(false);

  const handleAddTag = async (name: string) => {
    try {
      setIsSavingTag(true);
      const tag = await dispatch(addTag({ name })).unwrap();
      onChange([...value, tag]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingTag(false);
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      loading={isSavingTag}
      disabled={isSavingTag}
      value={value}
      ChipProps={{ size: 'small' }}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          handleAddTag(newValue);
          return;
        }

        const newTagStr = newValue.find(
          (v): v is string => typeof v === 'string'
        );

        if (newTagStr) {
          handleAddTag(newTagStr);
          return;
        }

        const newTagObj = newValue.find(
          (v): v is TagOption => typeof v !== 'string' && v.inputValue !== ''
        );

        if (newTagObj?.inputValue) {
          handleAddTag(newTagObj.inputValue);
          return;
        }

        onChange(newValue as TagOption[]);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            _id: '',
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      options={tags as TagOption[]}
      isOptionEqualToValue={(a, b) => a._id === b._id}
      getOptionLabel={option => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option._id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Tags"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isSavingTag ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SelectTag;
