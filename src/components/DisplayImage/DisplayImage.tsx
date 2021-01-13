import React, { useState, useEffect } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";
import { useSpring, animated as a } from "react-spring";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  small: {
    position: "absolute",
    margin: "0",
    padding: "0",

    overflow: "hidden",
    userSelect: "none",

    cursor: "pointer",

    willChange: "transform, opacity",
    borderRadius: "10px",
  },
  back: {
    cursor: "pointer",
    position: "absolute",
  },
  front: {
    cursor: "pointer",
    position: "absolute",
  },
}));

interface Image {
  thumbUrl: {
    portrait: {
      small: string;
      large: string;
    };
    landscape: {
      small: string;
      large: string;
    };
  };
  url: string;
  resolution: { width: number; height: number; ratio: string };
  tags: string[];
  collection: string[];
  visibility: string;
  rating: number;
  description: string;
  name: string;
  author: string;
  createDate: any;
  favorites: number;
  views: number;
  allowDownload: boolean;
  metadata: Record<string, any>;
}

interface DisplayImageProps {
  size?: "small" | "large";
  image: Image;
}

const DisplayImage = ({ size, image }: DisplayImageProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [flipped, setFlipped] = useState(false);
  const [url, setUrl] = useState("");

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(300px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    const portraitLarge = image?.thumbUrl?.portrait?.large;
    const portraitSmall = image?.thumbUrl?.portrait?.small;
    const landscapeLarge = image?.thumbUrl?.landscape?.large;
    const landscapeSmall = image?.thumbUrl?.landscape?.small;

    const defaultImage =
      portraitSmall || portraitLarge || landscapeLarge || landscapeSmall;

    switch (size) {
      case "large":
        setUrl(portraitLarge || defaultImage);
        break;
      case "small":
        setUrl(portraitSmall || defaultImage);
        break;
      default:
        setUrl(defaultImage);
    }
  }, [size, setUrl, image]);

  return (
    <div onClick={() => setFlipped(!flipped)} className={classes.root}>
      <a.div
        className={classes.back}
        style={{
          opacity: opacity.interpolate((o: any) => 1 - o),
          transform,
        }}
      >
        <img
          src={url}
          alt={""}
          width={size === "small" ? 300 : 450}
          height={size === "small" ? 200 : 300}
        />
      </a.div>
      <a.div
        className={classes.front}
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        <img
          src={url}
          alt={""}
          width={size === "small" ? 300 : 450}
          height={size === "small" ? 200 : 300}
        />
      </a.div>
    </div>
  );
};

export default DisplayImage;
