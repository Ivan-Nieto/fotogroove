import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import './styles.css';

import LoadingBar from '../Loading/LoadingBar';
import uploadImage from '../../firebase/storage/uploadImage';
import Tags from '../Tags/Tags';

interface ImageUploadProps {
  file: File;
  handleError: (...arg: any) => void | undefined;
  userId: string;
}

const ImageUploadPreview = ({ file, handleError, userId }: ImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [imageId, setImageId] = useState('');
  const ref = useRef<boolean>(true);

  const handleProgress = (snapshot: firebase.storage.UploadTaskSnapshot) => {
    const value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if (value && ref.current) setProgress(value);
  };

  const handleComplete = () => {
    if (ref.current) setProgress(100);
  };

  useEffect(() => {
    const upload = async () => {
      const id = await uploadImage(file, userId, handleProgress, handleComplete, handleError);
      if (ref.current) setImageId(id);
    };

    if (file && userId) upload();
    return () => {
      ref.current = false;
    };
  }, [file, userId, handleError]);

  return (
    <div className='root'>
      <div className='image'>
        <img src={URL.createObjectURL(file)} width='100%' alt='uploaded img' />
      </div>
      <div className='tags-container'>
        {progress < 100 && <LoadingBar className='loading-bar' progress={progress} />}
        {progress >= 100 && <Tags docId={imageId} open disableUpdate={false} />}
      </div>
    </div>
  );
};

export default ImageUploadPreview;
