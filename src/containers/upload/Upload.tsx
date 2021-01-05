import React, { useState } from "react";
import { Theme, makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import store from "../../store/index";

import LoadingBar from "../../components/Loading/LoadingBar";
import DropZone from "../../components/DropZone/DropZone";
import uploadImage from "../../firebase/storage/uploadImage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    maxWidth: "800px",
    margin: "auto",
    width: "100%",
  },
  dropZone: {
    textAlign: "center",
    margin: "auto",
    padding: "20px",
  },
  title: {
    width: "100%",
    textAlign: "center",
    paddingBottom: "20px",
  },
  inputs: {
    padding: "20px",
    margin: "auto",

    backgroundColor: theme.palette.grey[100],
    borderRadius: "10px",
  },
  input: {
    textAlign: "center",
    margin: "auto",
    padding: "20px",
  },
  halfInput: {
    display: "inline-block",
    padding: "20px",
    width: "calc(50% - 40px)",
  },
  button: {
    padding: "20px",
    textAlign: "end",
  },
}));

const Upload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [fileProgress, setFileProgress] = useState({});
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const handleProgress = (index: string) => (snapshot: any) => {
    const newFileProgress: any = {
      ...fileProgress,
      [index]: {
        total: snapshot.totalBytes,
        transferred: snapshot.bytesTransferred,
      },
    };

    const total =
      Object.keys(newFileProgress).reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + newFileProgress[currentValue].total,
        0
      ) || 1;

    const transferred =
      Object.keys(newFileProgress).reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + newFileProgress[currentValue].transferred,
        0
      ) || 0;

    setProgress((transferred / total) * 100);
  };

  const handleError = () => {
    setError(true);
  };

  const handleComplete = () => {
    setUploading(false);
    history.push("/");
  };

  const handleFile = (event: any) => {
    setUploading(true);

    const userID = store?.getState().user?.uid;
    const tempObj: any = {};
    event?.forEach((e: any, index: number) => {
      tempObj[`img_${index}`] = { total: 0, transferred: 0 };
      uploadImage(
        e,
        userID,
        handleProgress(`img_${index}`),
        handleComplete,
        handleError
      );
    });
    setFileProgress(tempObj);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h5">Uploader</Typography>
      </div>
      <div className={classes.dropZone}>
        <DropZone
          onDrop={handleFile}
          message="Drag 'n' drop image here, or click to select files"
          error={error}
        />
      </div>
      <div>{uploading && <LoadingBar progress={progress} />}</div>
    </div>
  );
};

export default Upload;
