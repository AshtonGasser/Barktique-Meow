import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material-ui Imports
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2';

export const EmployeeLastName = ({ classes, useStyles }) => {
  useStyles();

  // Bring in dispatch
  const dispatch = useDispatch();
  const adminSingleEmpInfo = useSelector((store) => store.adminSingleEmpInfo);

  const handleLastName = async () => {
    const { value: lastName } = await Swal.fire({
      title: 'Last Name',
      input: 'text',
      inputValue: adminSingleEmpInfo[0]?.employee_last_name,
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
      employee_last_name: lastName,
    };
    // lastName shows message showing name change.
    if (lastName) {
      Swal.fire({
        text: `Last Name Changed to ${lastName}`,
        confirmButtonColor: '#000000',
      });
      // Dispatch Users lastName and their id to Saga.
      dispatch({
        type: 'UPDATE_EMPLOYEE_LAST_NAME',
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
        onClick={handleLastName}
        placeholder="Last Name"
        value={adminSingleEmpInfo[0]?.employee_last_name}
        variant="outlined"
      />
    </>
  );
};
