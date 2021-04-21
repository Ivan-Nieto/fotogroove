import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useUser from './useUser';
import useTip from './useTip';

const useTutorial = () => {
  const user = useUser();
  const addTip = useTip();
  const location = useLocation();

  // Determine if an item was already present in local storage
  const notSet = (item: string): boolean => !Boolean(window?.localStorage?.getItem(item));

  // Initial user tutorial messages
  useEffect(() => {
    if (!window.localStorage) return;

    if (notSet('fotogroove-tips-welcome')) addTip('fotogroove-tips-welcome', 'Welcome to Fotogroove!');

    if (notSet('fotogroove-tips-upload') && user?.isSignedIn)
      addTip('fotogroove-tips-upload', 'You can start uploading your own images by going to Upload in the profile drop down.', {
        duration: 7000,
        timeout: 3500,
      });

    // eslint-disable-next-line
  }, [user]);

  // Location based tutorial messages
  useEffect(() => {
    if (!window.localStorage) return;

    if (notSet('fotogroove-tips-lists') && location.pathname === '/lists')
      addTip(
        'fotogroove-tips-lists',
        "Lists allow you to save images for later and organize them however you like! Whenever you make a new list you'll be able to save images to it by clicking on the image and selecting 'add to list' in the left hand menu. "
      );

    if (notSet('fotogroove-tips-collections') && location.pathname === '/collections')
      addTip(
        'fotogroove-tips-collections',
        "Collection allow you to organize your images for your viewers. Any collections you create will show up on your profile page for everyone to see. You can add images you've uploaded to a collection by clicking on the image and selecting 'add to collection' in the left hand menu."
      );

    // eslint-disable-next-line
  }, [location]);
};

export default useTutorial;
