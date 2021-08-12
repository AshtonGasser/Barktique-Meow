import React from 'react';
import clsx from 'clsx';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import InfoIcon from '@material-ui/icons/Info';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import { GridCellParams } from '@material-ui/data-grid';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      justifyContent: 'left',
      '& .icon': {
        color: 'inherit',
      },
    },
    NotStarted: {
      color: theme.palette.info.dark,
      border: `1px solid ${theme.palette.info.main}`,
    },
    Complete: {
      color: theme.palette.success.dark,
      border: `1px solid ${theme.palette.success.main}`,
    },
    InProgress: {
      color: theme.palette.warning.dark,
      border: `1px solid ${theme.palette.warning.main}`,
    },
    ImageRejected: {
      color: theme.palette.error.dark,
      border: `1px solid ${theme.palette.error.main}`,
    },
  })
);

const Status = React.memo((props) => {
  const { status } = props;
  let icon = null;
  let clazz = null;
  const classes = useStyles();
  if (status === 'Image Rejected') {
    icon = <ReportProblemIcon className="icon" />;
    clazz = classes['ImageRejected'];
  } else if (status === 'Not Started') {
    icon = <InfoIcon className="icon" />;
    clazz = classes['NotStarted'];
  } else if (status === 'In Progress') {
    icon = <AutorenewIcon className="icon" />;
    clazz = classes['InProgress'];
  } else if (status === 'Complete') {
    icon = <DoneIcon className="icon" />;
    clazz = classes['Complete'];
  }
  let label = status;
  if (status === 'In Progress') {
    label = 'In Progress';
  }

  return (
    <Chip
      className={clsx(classes.root, clazz)}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});
  
export function renderStatus(params) {
  return <Status status={params.value?.toString()} />;
}