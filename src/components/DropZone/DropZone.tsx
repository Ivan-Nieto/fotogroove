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
  error: {
    display: "flex",
    border: `3px dashed ${theme.palette.error.main}`,

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
  error: boolean;
}

const DropZone = ({ onDrop, message, dropMessage, error }: DropZoneProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className={error ? classes.error : classes.root}>
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
