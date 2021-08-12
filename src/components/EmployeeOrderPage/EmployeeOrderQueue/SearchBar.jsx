import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {
  DataGrid,
  GridToolbar,
  GridApi,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/styles';

export const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5, 0.5, 0),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  textField: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    margin: theme.spacing(1, 0.5, 1.5),
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(0.5),
    },
    '& .MuiInput-underline:before': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));
 //csv export toolbar
 const CustomToolbar = () => {
  return (
   
      <GridToolbarExport csvOptions={{ allColumns: true }} />

   
  );
};
export const QuickSearchToolbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <CustomToolbar/>
    </div>
    
  );
};

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
