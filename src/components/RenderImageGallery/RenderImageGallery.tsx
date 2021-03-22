import React from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import DisplayImage from "../../components/DisplayImage/DisplayImage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "600px",
    overflowX: "hidden",
    padding: "30px 30px 0px 30px",
  },
  container: {
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

const RenderImageGallery = ({
  images,
  onEmptyMessage = "No Images Found",
}: {
  images: Array<any>;
  onEmptyMessage: string;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

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

      {images && images.length === 0 && (
        <div className={classes.message}>
          <Typography variant="body1" color="inherit">
            {onEmptyMessage}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RenderImageGallery;
