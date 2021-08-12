import React from 'react';
import { useHistory } from 'react-router-dom';

// material-ui imports
import Button from '@material-ui/core/Button';

// function for create employee button
function AdminCreateButton() {
    
    // set useHistory variable
    const history = useHistory();

    return (
        <div>
            <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => {
                    history.push('/createEmployee');
                }}
            >
                Create Artist
            </Button>
        </div>
    )
} // end AdminCreateButton

// export AdminCreateButton
export default AdminCreateButton;