import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material-ui Imports
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2';

export const EmployeePhoneNumber = ({ classes, useStyles }) => {
  useStyles();

  // Bring in dispatch
  const dispatch = useDispatch();
  const adminSingleEmpInfo = useSelector((store) => store.adminSingleEmpInfo);

  // Function to handle valid loose phone numbers, below are valid numbers
  // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  function phoneNumberCheck(phoneNumber) {
    const regex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return regex.test(phoneNumber);
  }

  const handlePhoneNumber = async () => {
    const { value: phoneNumber } = await Swal.fire({
      title: 'Phone Number',
      input: 'text',
      inputValue: adminSingleEmpInfo[0]?.employee_phone_number,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      confirmButtonColor: '#000000',
      inputValidator: (value) => {
        if (!phoneNumberCheck(value)) {
          return 'We need a Valid Phone #!\r\n eg. 777-777-7777';
        }
      },
    });

    const data = {
      id: adminSingleEmpInfo[0].id,
      employee_phone_number: phoneNumber,
    };
    // phoneNumber shows message showing name change.
    if (phoneNumber) {
      Swal.fire({
        text: `Phone Number Changed to ${phoneNumber}`,
        confirmButtonColor: '#000000',
      });
      // Dispatch Users phoneNumber and their id to Saga.
      dispatch({
        type: 'UPDATE_EMPLOYEE_PHONE_NUMBER',
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
        onClick={handlePhoneNumber}
        placeholder="Phone Number"
        value={adminSingleEmpInfo[0]?.employee_phone_number}
        variant="outlined"
      />
    </>
  );
};
