import React, { useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import useUser from '../../hooks/useUser';

import DropZone from '../../components/DropZone/DropZone';
import ImageUploadPreview from '../../components/ImageUploadPreview/ImageUploadPreview';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    maxWidth: '800px',
    margin: 'auto',
    width: '100%',
  },
  dropZone: {
    textAlign: 'center',
    margin: 'auto',
    padding: '20px',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  inputs: {
    padding: '20px',
    margin: 'auto',

    backgroundColor: theme.palette.grey[100],
    borderRadius: '10px',
  },
  input: {
    textAlign: 'center',
    margin: 'auto',
    padding: '20px',
  },
  halfInput: {
    display: 'inline-block',
    padding: '20px',
    width: 'calc(50% - 40px)',
  },
  button: {
    padding: '20px',
    textAlign: 'end',
  },
}));

const Upload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const handleFile = (event: any) => {
    setFiles(event);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant='h5'>Uploader</Typography>
      </div>
      <div className={classes.dropZone}>
        <DropZone onDrop={handleFile} message="Drag 'n' drop image here, or click to select files" error={error} />
      </div>
      {files.map((e: File, index: number) => {
        return <ImageUploadPreview key={`${e.name}-${index}`} file={e} handleError={handleError} userId={user?.uid} />;
      })}
    </div>
  );
};

export default Upload;
