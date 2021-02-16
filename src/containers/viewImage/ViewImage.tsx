import React, { useEffect, useState } from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

import useQuery from "../../hooks/useQuery";

import { getDownloadURL } from "../../firebase/firestore/firestore";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: "-30px",
  },
  container: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: "10px",
    display: "flex",
    padding: "20px",
  },
  img: {
    margin: "auto",
    padding: "auto",
    maxWidth: "calc(100% - 20px)",
    maxHeight: "calc(100vh - 160px)",
    width: "auto",
    height: "auto",
  },
}));

const ViewImage = ({ imageLocation }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [url, setURL] = useState("");
  const query = useQuery();

  useEffect(() => {
    const getURL = async () => {
      const paramUrl = query.get("url");
      setURL(await getDownloadURL(paramUrl || imageLocation || ""));
    };
    getURL();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img src={url} alt={""} className={classes.img} />
      </div>
    </div>
  );
};

export default ViewImage;
