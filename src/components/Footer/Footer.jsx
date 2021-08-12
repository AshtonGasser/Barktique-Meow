import React from 'react';
import './Footer.css';
import { Grid, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
  footer: {
    fontFamily: 'Yantramanav',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <footer>
        <FacebookIcon
          onClick={() =>
            window.open('https://www.facebook.com/BarktiqueandMeow', '_blank')
          }
        />
        <InstagramIcon
          onClick={() =>
            window.open('https://instagram.com/barktiqueandmeow', '_blank')
          }
        />
        <Typography className={classes.footer}>
          &copy; 2020 Barktique and Meow. ALL RIGHTS RESERVED
        </Typography>
      </footer>
    </>
  );
}

export default Footer;
