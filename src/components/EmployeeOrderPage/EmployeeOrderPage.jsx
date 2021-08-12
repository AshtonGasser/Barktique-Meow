import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EmployeeHeader from '../EmployeeHeader/EmployeeHeader';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import AdminHeader from '../Admin/AdminHeader/AdminHeader';
import { saveAs } from 'file-saver';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 195,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));

const EmployeeOrderPage = () => {
  const history = useHistory();
  const { orderNumber, id } = useParams();
 
  const productOrderReducer = useSelector((store) => store.productOrderReducer);
  const user = useSelector((store) => store.user);
  const [order, setOrder] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();


  const data = {
    id: id,
    cus_order_number: orderNumber,
  };



  const resolveImageError = () => {


    const data = {
      cus_error_image: false,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      cus_progress_status: 'In Progress',
      id: user.id,
    };

    dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };

  const errorWithImage = () => {
 

    const data = {
      cus_error_image: true,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      cus_progress_status: 'Image Rejected',
      id: user.id,
    };

    dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };

  const noEmployeeNumberResolve = () => {
  

    const data = {
      cus_error_image: false,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      cus_progress_status: 'Not Started',
      id: user.id,
    };

    dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };

  const noEmployeeNumberError = () => {
  
    const data = {
      cus_error_image: true,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      cus_progress_status: 'Image Rejected',
      id: user.id,
    };
   dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
  };


  const setComplete = () => {
    const data = {
      cus_progress_status: 'Complete',
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      id: productOrderReducer[0]?.user_id_ref,
    };

    const orderComplete = {
      cus_email: productOrderReducer[0]?.cus_email,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
    };
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Complete',
      confirmButtonColor: '#000000',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'PRODUCT_ORDER_COMPLETE_BUTTON',
            payload: { data },
          });
          dispatch({
            type: 'POST_COMPLETED_EMAIL',
            payload: { orderComplete },
          });
          dispatch({ type: 'SET_PRODUCT_ORDER', payload: false });
        } else if (!result.isConfirmed) {
          return 'not complete';
        }
      })
      .then(async (response) => {
        console.log(`This is our response `, response);
        try {
          if (response == 'not complete') {
            return;
          } else {
            await Swal.fire({
              icon: 'success',
              title: 'Order Complete!',
              confirmButtonColor: '#000000',
            }).then((result) => {
              if (result.isConfirmed) {
                history.push(`/employee`);
              }
            });
          }
        } catch (error) {
          console.log(`Didn't make it ... `, error);
        }
      });
  };

  const downloadImage = (event) => {

    
    saveAs(productOrderReducer[0]?.cus_image, 'image.jpg');
  };

  const unassignOrder = (event) => {
    console.log(
      `click unassign order`,
      productOrderReducer[0]?.cus_order_number
    );

    dispatch({ type: 'SET_ORDER_STATE', payload: false });
    const data = {
      cus_progress_status: 'Not Started',
      cus_order_isStarted: false,
      cus_order_number: productOrderReducer[0]?.cus_order_number,
      user_id_ref: null,
      id: productOrderReducer[0]?.user_id_ref,
      employee_full_name: null,
    };

    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Unassign',
      confirmButtonColor: '#000000',
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'PRODUCT_UNASSIGN_ORDER_BUTTON',
            payload: { data },
          });
          dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
        }
      })
      .then(async () => {
        try {
        } catch (error) {
          console.log(`Didn't make it did we... `, error);
        }
        //history.push(`/employee`);
      });
  };

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCT_ORDER', payload: data });
  }, []);

  return (
    <>
      {!productOrderReducer[0] === undefined ? (
        ''
      ) : (
        <div>
          <AdminHeader />
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <div id="orderNumber">
              <p>Order Number: {productOrderReducer[0]?.cus_order_number}</p>
            </div>

            <div id="fullName">
              <p>
                Name:{' '}
                {`${productOrderReducer[0]?.cus_first_name} ${productOrderReducer[0]?.cus_last_name}`}
              </p>
            </div>

            <div id="phone">
              <p>Phone: {productOrderReducer[0]?.cus_phone_number}</p>
            </div>

            <div id="email">
              <p>Email: {productOrderReducer[0]?.cus_email}</p>
            </div>

            {productOrderReducer[0]?.cus_notes === '' ? (
              <div id="note">
                <p>The customer didn't leave a note.</p>
              </div>
            ) : (
              <div id="note">
                <p>Note: {productOrderReducer[0]?.cus_notes}</p>
              </div>
            )}

            <div id="image">
              <img
                src={productOrderReducer[0]?.cus_image}
                style={{ height: 150, width: 150 }}
              />
            </div>

            <Button
              onClick={(event) => downloadImage(event)}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Download Image
            </Button>

            {/* productOrderReducer[0]?.user_ref_id !== null */}

            {productOrderReducer[0]?.user_id_ref !== null ? (
              <>
                {productOrderReducer[0]?.cus_error_image !== false  ? (
                  <Button
                    onClick={resolveImageError}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Resolve Image Error
                  </Button>
                ) : (
                  <Button
                    onClick={errorWithImage}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Error with Image
                  </Button>
                )}
              </>
            ) : (
              <>
                {productOrderReducer[0]?.cus_error_image !== false ? (
                  <Button
                    onClick={noEmployeeNumberResolve}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Resolve Image Error
                  </Button>
                ) : (
                  <Button
                    onClick={noEmployeeNumberError}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Error with Image
                  </Button>
                )}
              </>
            )}

            {productOrderReducer[0]?.cus_progress_status === 'Not Started' ||
            productOrderReducer[0]?.cus_progress_status === 'Complete' ||
            productOrderReducer[0]?.cus_progress_status === 'Image Rejected' ||
            productOrderReducer[0]?.user_id_ref === null ? (
              ''
            ) : (
              <Button
                onClick={setComplete}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Complete
              </Button>
            )}

            {productOrderReducer[0]?.cus_progress_status === 'Complete' ||
            productOrderReducer[0]?.cus_progress_status === 'Image Rejected' ||
            productOrderReducer[0]?.user_id_ref === null ? (
              ''
            ) : (
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={unassignOrder}
                >
                  Unassign
                </Button>
              </>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default EmployeeOrderPage;
