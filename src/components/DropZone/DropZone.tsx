import React from "react";
import { useDropzone } from "react-dropzone";
import Typography from "@material-ui/core/Typography";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    border: `3px dashed ${theme.palette.grey[100]}`,

    height: "200px",

    width: "600px",

    margin: "auto",
    padding: "20px",

    justifyContent: "center",
    alignItems: "center",
  },
}));

interface DropZoneProps {
  onDrop: (event: any) => void | undefined;
  message?: string;
  dropMessage?: string;
}

const DropZone = ({ onDrop, message, dropMessage }: DropZoneProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className={classes.root}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">
            {dropMessage || "Drop here ..."}
          </Typography>
        ) : (
          <Typography variant="body1">
            {message ||
              "Drag 'n' drop some files here, or click to select files"}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default DropZone;
