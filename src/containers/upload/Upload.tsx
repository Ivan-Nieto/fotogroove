import React, { useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import useUser from '../../hooks/useUser';

import DropZone from '../../components/DropZone/DropZone';
import ImageUploadPreview from '../../components/ImageUploadPreview/ImageUploadPreview';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    margin: 'auto',
    width: '100%',

    justifyContent: 'center',
    alignSelf: 'center',
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
  content: {
    width: '100%',
  },
  item: {
    minWidth: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
      <div className={classes.content}>
        {files.map((e: File, index: number) => (
          <div className={classes.item}>
            <ImageUploadPreview key={`${e.name}-${index}`} file={e} handleError={handleError} userId={user?.uid} />;
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
