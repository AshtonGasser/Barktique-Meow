import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import EmployeeOrderTable from './EmployeeOrderTable';
import LogOutButton from '../../LogOutButton/LogOutButton';
import EmployeeHeader from '../../EmployeeHeader/EmployeeHeader';
import AdminHeader from '../../Admin/AdminHeader/AdminHeader';
import AdminLogOutButton from '../../Admin/AdminLogOutButton/AdminLogOutButton';

function EmployeeOrderQueue() {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const ordersState = useSelector((store) => store.ordersState);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
    console.log(`What's our order state => `, ordersState);
  }, [ordersState]);
  return (
    <>
      {user?.employee_access_level > 1 ? (
        <Redirect to="/admin" />
      ) : (
        <>
          {ordersState == false ? (
            ''
          ) : (
            <>
              <AdminHeader />
              <Grid>
                <AdminLogOutButton className={classes.root}/>
              </Grid>
              <div>
                <EmployeeOrderTable />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default EmployeeOrderQueue;
