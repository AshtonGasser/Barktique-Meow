import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material-ui Imports
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2';

export const EmployeeFirstName = ({ classes, useStyles }) => {
  useStyles();

  // Bring in dispatch
  const dispatch = useDispatch();
  const adminSingleEmpInfo = useSelector((store) => store.adminSingleEmpInfo);

  const handleFirstName = async () => {
    const { value: firstName } = await Swal.fire({
      title: 'First Name',
      input: 'text',
      inputValue: adminSingleEmpInfo[0]?.employee_first_name,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      confirmButtonColor: '#000000',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    const data = {
      id: adminSingleEmpInfo[0].id,
      employee_first_name: firstName,
    };
    // firstName shows message showing name change.
    if (firstName) {
      Swal.fire({
        text: `First Name Changed to ${firstName}`,
        confirmButtonColor: '#000000',
      });
      // Dispatch Users firstName and their id to Saga.
      dispatch({
        type: 'UPDATE_EMPLOYEE_FIRST_NAME',
        payload: { data },
      });
      dispatch({
        type: 'FETCH_INDIVIDUAL_EMPLOYEE',
        payload: adminSingleEmpInfo[0]?.id,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: adminSingleEmpInfo[0]?.id,
    });
  }, []);

  return (
    <>
      <TextField
        className={classes.formControl}
        fullWidth
        onClick={handleFirstName}
        placeholder="First Name"
        value={adminSingleEmpInfo[0]?.employee_first_name}
        variant="outlined"
      />
    </>
  );
};
