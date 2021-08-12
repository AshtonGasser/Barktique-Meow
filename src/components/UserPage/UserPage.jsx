import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const params = useParams();


  return (
    <>
      {user?.employee_access_level > 1 ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/employee" />
      )}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
