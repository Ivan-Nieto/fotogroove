import React, { useState } from "react";
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

interface DisplayImageProps {
  size?: "small" | "large";
}

const DisplayImage = ({ size }: DisplayImageProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(300px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

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
          src={
            "https://firebasestorage.googleapis.com/v0/b/photogruve.appspot.com/o/images%2F2lstY6QHUvfOsxdfglJdEOfJf1f2%2Fckjjej2jo000g3a63pwhj5e85%2F2lstY6QHUvfOsxdfglJdEOfJf1f2ckjjej2jo000h3a63hzbiqpp7?alt=media&token=8e2f89ce-8ffb-4f99-9526-5ec156ac561d"
          }
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
          src={
            "https://firebasestorage.googleapis.com/v0/b/photogruve.appspot.com/o/images%2F2lstY6QHUvfOsxdfglJdEOfJf1f2%2Fckjjej2jo00083a63ujy1z67p%2F2lstY6QHUvfOsxdfglJdEOfJf1f2ckjjej2jo00093a63bt1hbmu5?alt=media&token=1b73a437-78a0-4da6-836a-42c07abfde40"
          }
          alt={""}
          width={size === "small" ? 300 : 450}
          height={size === "small" ? 200 : 300}
        />
      </a.div>
    </div>
  );
};

export default DisplayImage;
