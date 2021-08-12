import { useHistory } from 'react-router-dom';

// import material-ui
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import './adminStyle.css'

// variable useStyles for class names
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '31.99%',
    flexShrink: 0,
  },
}));

function AdminIssuesDetail({ orders, order, key }) {
  // variable for material-ui classes
  const classes = useStyles();
  const history = useHistory();

  console.log('This order ==>', order);

  const handleIssuesClick = (order) => {
 

    // ****** DEV NOTE, route needs to be changed.
    history.push(`/orderPage/${order.user_id_ref}/${order.cus_order_number}`);
  };



  return (
    <>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className={classes.heading}
              style={{textDecorationLine: 'underline'}}
              onClick={() => handleIssuesClick(order)}
            >
              Order # {order.cus_order_number}
            </Typography>
            <Typography className={classes.heading}>
              {order.cus_first_name} {order.cus_last_name}
            </Typography>
            {order.cus_date_issues && !order.cus_error_image ? (
              <Typography className={classes.heading}>Date Issue</Typography>
            ) : (
              <Typography className={classes.heading}>Image Issue</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.secondaryHeading}>
              Contact Customer: {order.cus_phone_number}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Email Customer: {order.cus_email}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default AdminIssuesDetail;
