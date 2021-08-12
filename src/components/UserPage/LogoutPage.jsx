import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

function LogoutPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(`what are the params `, params);
  if (params.status === 'true') {
    console.log(`what are the params `, params);
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  }

  if (!user.id) {
    history.push('/login');
  }
  return <></>;
}

export default LogoutPage;
