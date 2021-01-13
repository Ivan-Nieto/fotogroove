import React, { useEffect, useState } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

import DisplayImage from "../../components/DisplayImage/DisplayImage";
import { getUsersImages } from "../../firebase/firestore/firestore";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    width: "100%",
  },
  item: {
    display: "inline",
  },
}));

const Gallery = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const images = await getUsersImages("2lstY6QHUvfOsxdfglJdEOfJf1f2");
      setImages(images?.images || []);
    };
    getImages();
  }, []);

  return (
    <div className={classes.root}>
      {images.map((img: any, index: number) => (
        <div className={classes.item}>
          <DisplayImage key={`img${index}`} size="small" image={img} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
