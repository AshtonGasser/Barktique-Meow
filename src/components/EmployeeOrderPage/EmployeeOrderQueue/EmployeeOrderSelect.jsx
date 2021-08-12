import React, { ChangeEvent } from 'react';
import { GridCellParams } from '@material-ui/data-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import InfoIcon from '@material-ui/icons/Info';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import  createTheme  from '@material-ui/core/styles'
import { blue, green, lightBlue, orange, pink, purple, red } from '@material-ui/core/colors';
import { STATUS_OPTIONS } from "./StaticData";

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      select: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
      },
      optionIcon: {
        minWidth: 36,
      },
      optionText: {
        overflow: 'hidden',
      },
    }),
  
);

function EditStatus(props) {
  const classes = useStyles();
  const { id, value, api, field } = props;

  const handleChange = (event) => {
    const editProps = { value: event.target.value };
    api.setEditCellProps({ id, field, props: editProps }, event);
    if (!event.key) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      api.setCellMode(id, field, 'view');
    }
  };

  return (
    <Select
      value={value}
      classes={{ select: classes.select }}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let IconComponent = null;
        if (option === 'Image Rejected') {
          IconComponent = ReportProblemIcon;
        } else if (option === 'Not Started') {
          IconComponent = InfoIcon;
        } else if (option === 'In Progress') {
          IconComponent = AutorenewIcon;
        } else if (option === 'Complete') {
          IconComponent = DoneIcon;
        }

        let label = option;
        if (option === 'Complete') {
          label = 'Complete';
        }

        return (
          <MenuItem key={option} value={option}>
            <ListItemIcon className={classes.optionIcon}>
              <IconComponent fontSize="small" />
            </ListItemIcon>
            <ListItemText className={classes.optionText} primary={label} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderEditStatus(params) {
  return <EditStatus {...params} />;
}