import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import Swal from 'sweetalert2';

// material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

// Component imports for employee
import { EmployeeEmail } from './AdminEditEmployeeComponents/EditEmail';
import { EmployeeFirstName } from './AdminEditEmployeeComponents/FirstName';
import { EmployeeLastName } from './AdminEditEmployeeComponents/LastName';
import { EmployeePhoneNumber } from './AdminEditEmployeeComponents/PhoneNumber';

// setup styles for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 365,
    marginLeft: 23,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
})); // end useStyles

// AdminCreateEmployee function
function AdminEditEmployee() {
  // variable for material-ui classes
  const classes = useStyles();

  const params = useParams();
  // set dispatch variable
  const dispatch = useDispatch();
  const history = useHistory();

  const adminSingleEmpInfo = useSelector((store) => store.adminSingleEmpInfo);
  // This waits for employee info to come back from SAGA then fires
  const singleEmployeeState = useSelector((store) => store.singleEmployeeState);
  const [accessLevel, setAccessLevel] = useState();

  const handleBackButton = () => {
    console.log('Clicked AdminDashboard button');
    history.push('/admin');
  };

  // function to handle dropdown selection and set Access Level
  const handleSelect = (event) => {
    event.preventDefault();
    console.log(`This is our event`, event.target.value);
    const data = {
      id: adminSingleEmpInfo[0].id,
      employee_access_level: event.target.value,
    };
    dispatch({ type: 'UPDATE_EMPLOYEE_ACCESS_LEVEL', payload: { data } });
  }; // end handleSelect

  const handleConfirm = () => {
    Swal.fire({
      title: 'Success',
      text: 'You Have Successfully Edited Artist',
      icon: 'success',
      confirmButtonColor: '#000000',
    }).then(function () {
      history.push('/admin');
    });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_INDIVIDUAL_EMPLOYEE', payload: params.id });
  }, []);

  return (
    <>
      {!singleEmployeeState ? (
        ''
      ) : (
        <>
          <div>
            <AdminHeader />
          </div>
          <div className="admin-dashboard-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackButton}
            >
              Admin Dashboard
            </Button>
          </div>
          <br />
          <div>
            <h2>Edit Artist</h2>
          </div>

          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            className={classes.textField}
          >
            <Grid item>
              <EmployeeEmail
                classes={classes}
                useStyles={useStyles}
                adminSingleEmpInfo={adminSingleEmpInfo}
              />
            </Grid>
            <Grid item>
              <EmployeeFirstName
                classes={classes}
                useStyles={useStyles}
                adminSingleEmpInfo={adminSingleEmpInfo}
              />
            </Grid>
            <Grid item>
              <EmployeeLastName
                classes={classes}
                useStyles={useStyles}
                adminSingleEmpInfo={adminSingleEmpInfo}
              />
            </Grid>
            <Grid item>
              <EmployeePhoneNumber
                classes={classes}
                useStyles={useStyles}
                adminSingleEmpInfo={adminSingleEmpInfo}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl2}>
                <InputLabel>Access Level</InputLabel>
                <Select
                  value={adminSingleEmpInfo[0]?.employee_access_level}
                  label="Access Level"
                  required
                  onChange={handleSelect}
                  className={classes.textField}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Artist</MenuItem>
                  <MenuItem value={2}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                className={classes.textField}
                variant="contained"
                size="large"
                color="primary"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
} // end AdminCreateEmployee

// export AdminCreateEmployee
export default AdminEditEmployee;
