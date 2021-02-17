import React, { useEffect, useState } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

import useQuery from "../../hooks/useQuery";
import useUser from "../../hooks/useUser";

import DisplayImage from "../../components/DisplayImage/DisplayImage";
import { getUsersImages } from "../../firebase/firestore/firestore";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowY: "hidden",
    overflowX: "hidden",
    padding: "30px",
    backgroundColor: theme.palette.grey[100],
  },
  container: {
    height: "100vh",
    overflowY: "scroll",
    marginRight: "-50px",
    paddingRight: "50px",

    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    padding: "10px",
    margin: "auto",
    cursor: "pointer",
  },
  message: {
    width: "100%",
    paddingTop: "200px",
    color: theme.palette.grey[400],
    textAlign: "center",
  },
  scroll: {
    overflowY: "scroll",
  },
}));

const Gallery = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const query = useQuery();
  const user = useUser();

  const [images, setImages]: any = useState(false);
  const [account, setAccount] = useState("");
  const [lastEntry, setLastEntry]: any = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      const images = await getUsersImages(account);
      setImages(images?.images || []);
      setLastEntry(images?.images[images?.images.length - 1]);
    };

    if (account !== "") getImages();
    // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    const chooseAccount = async () => {
      const urlParam = query.get("user");
      if (urlParam) {
        setAccount(urlParam);
      } else {
        if (user) setAccount(user?.uid);
        else setAccount("2lstY6QHUvfOsxdfglJdEOfJf1f2");
      }
    };

    if (user !== null) chooseAccount();
    // eslint-disable-next-line
  }, [user]);

  const handleClick = (img: string) => () => {
    const win = window.open(`/view-image?url=${img}`);
    win?.focus();
  };

  // Paginates when bottom of page is reached.
  const handleScroll = async (e: any) => {
    // True if bottom was reached
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !paginating && !endReached) {
      setPaginating(true);
      // Get new set of images
      const newImgs = await getUsersImages(account, lastEntry);

      // Add new images to current set
      const newImages = images.concat(newImgs.images || []);
      setImages(newImages);

      // Decide weather or not this is the end of the list
      const newLastEntry = newImgs.images
        ? newImgs.images[newImgs?.images?.length - 1]
        : false;
      if (lastEntry && (!newLastEntry || newLastEntry.id === lastEntry.id)) {
        setEndReached(true);
      } else setLastEntry(newLastEntry);

      setPaginating(false);
    }
  };

  return (
    <div className={classes.root}>
      {images.length > 0 && (
        <div className={classes.container} onScroll={handleScroll}>
          {images.map((img: any, index: number) => (
            <div
              key={`img${index}`}
              className={classes.img}
              onClick={handleClick(img?.url)}
            >
              <DisplayImage size="large" image={img} />
            </div>
          ))}
        </div>
      )}

      {images && images.length === 0 && (
        <div className={classes.message}>
          <Typography variant="body1" color="inherit">
            This user hasn't uploaded any images.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Gallery;
