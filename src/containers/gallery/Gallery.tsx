import React, { useEffect, useState } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const images = await getUsersImages("2lstY6QHUvfOsxdfglJdEOfJf1f2");
      setImages(images?.images || []);
    };
    getImages();
  }, []);

  const handleClick = (img: string) => () => {
    history.push(`/view-image?url=${img}`);
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
