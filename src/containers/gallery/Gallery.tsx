import React, { useEffect, useState } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

import useQuery from "../../hooks/useQuery";
import useUser from "../../hooks/useUser";

import DisplayImage from "../../components/DisplayImage/DisplayImage";
import { getUsersImages } from "../../firebase/firestore/firestore";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "400px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "auto",
    margin: "auto",
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
}));

const Gallery = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const query = useQuery();
  const user = useUser();
  const [images, setImages] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const getImages = async () => {
      const images = await getUsersImages(account);
      setImages(images?.images || []);
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

  return (
    <div className={classes.root}>
      {images.length > 0 && (
        <div className={classes.container}>
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

      {images.length === 0 && (
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
