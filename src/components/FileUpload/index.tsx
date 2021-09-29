import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import ChipItem from './chipItem';
import useStyles from './styles';

const FileUpload = (props: {
  fileDataList: any[];
  buttonText: string;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number) => void;
}): JSX.Element => {
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const classes = useStyles();

  const handleRefresh = (evt: React.MouseEvent<HTMLInputElement>) => {
    evt.currentTarget.value = '';
  };

  return (
    <div>
      <div style={{ display: 'grid', paddingTop: '10px' }}>
        {props.fileDataList.length > 0 &&
          props.fileDataList.map((fileItem: any, index: number) => (
            <ChipItem
              file={fileItem}
              index={index}
              handleDelete={props.handleDelete}
              key={index}
            />
          ))}
      </div>
      <input
        ref={fileInputRef}
        onClick={(evt) => handleRefresh(evt)}
        onChange={props.handleChange}
        type='file'
        style={{ display: 'none' }}
        multiple
      />
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => fileInputRef.current.click()}
          classes={{
            root: classes.root,
          }}
        >
          {props.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
