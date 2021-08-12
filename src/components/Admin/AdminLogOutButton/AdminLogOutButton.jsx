import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

// material-ui imports
import Button from '@material-ui/core/Button';

// AdminLogOutButton component function
function AdminLogOutButton(props) {
  const history = useHistory();
  // set dispatch variable
  const dispatch = useDispatch();

  const logoutHistoryPush = () => {
    
    // dispatch({ type: 'LOGOUT' })
    history.push('/logout/true')
    
  };

  return (
    <Button
      size="medium"
      variant="contained"
      color="primary"
      className={props.className}
      onClick={logoutHistoryPush}
    >
      LogOut
    </Button>
  );
} // end AdminLogOutButton

// export AdminLogOutButton
export default AdminLogOutButton;
