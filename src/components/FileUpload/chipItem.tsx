import React from 'react';
import { Chip } from '@material-ui/core';

type ChipItemProps = {
  file: any;
  index: number;
  handleDelete: React.Dispatch<any>;
};

const ChipItem: React.FC<ChipItemProps> = (props): JSX.Element => {
  return (
    <div>
      <Chip
        style={{ margin: '1.5px' }}
        label={props.file.name}
        onDelete={() => props.handleDelete(props.index)}
        variant='outlined'
        color='primary'
        clickable
      />
    </div>
  );
};

export default ChipItem;
