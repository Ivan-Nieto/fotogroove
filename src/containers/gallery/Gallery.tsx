import React from 'react';

import useUser from '../../hooks/useUser';
import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const Gallery = ({ targetAccount }: { targetAccount: string }) => {
  const user = useUser();
  const bottomHit = useScroll();

  const dbRef = firestore.collection('images').where('author', '==', targetAccount).orderBy('createDate', 'desc');
  const dbRefPublic = firestore
    .collection('images')
    .where('author', '==', targetAccount)
    .where('visibility', '==', 'PUBLIC')
    .orderBy('createDate', 'desc');

  const [images] = usePaginate(
    bottomHit,
    user?.isSignedIn && user?.uid === targetAccount ? dbRef : dbRefPublic,
    ['createDate'],
    15,
    getDownloadUrls,
    true
  );

  return (
    <RenderImageGallery
      images={images}
      onEmptyMessage={
        user?.isSignedIn && user?.uid === targetAccount
          ? `You haven't uploaded any images yet. You can upload your images by selecting "Upload" from the profile dropdown. Any images you upload will show up here.`
          : `This user hasn't uploaded any images.`
      }
    />
  );
};

export default Gallery;
