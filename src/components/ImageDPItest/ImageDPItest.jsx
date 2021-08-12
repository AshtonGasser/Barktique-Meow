import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function ImageDPItest() {
  
  const classes = useStyles();
  // Holds the state of individual state of the file upload.
  const [imageUpload, setImageUpload] = useState([]);

  // Function to handle the upload of image
  const handleUpload = (event) => {

    setImageUpload({ file: URL.createObjectURL(event.target.files[0])});
  };

  return (
    <>
      <p>Welcome To The Real Test</p>

      <br/>

      <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          onChange={(event) => handleUpload(event)}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          onChange={(event) => handleUpload(event)}
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>

      
      <br />

      <iframe src={imageUpload.file} height="250px" width="350px" />

      <br />

      <img src={imageUpload.file} height="300px" width="420px" />
    </>
  );
}

export default ImageDPItest;
