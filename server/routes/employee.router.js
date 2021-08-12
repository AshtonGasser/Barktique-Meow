const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// PUT route Area

router.put(
  '/startOrder/v1/:employeeID',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(`Full route => /api/employee/startOrder/v1/:employeeID`);

    // Prepare the client to get some work done
    const client = await pool.connect();
    console.log(`What's are params => `, req.params.employeeID);
    console.log(`What are data coming from body => `, req.body);
    // Query Area
    const updateStartOrder = `
      UPDATE order_table SET "user_id_ref"=$1, "cus_order_isStarted"=$2, "cus_progress_status"=$3, "employee_full_name"=$4
      WHERE "cus_order_number"=$5
    ;`;

    const getEmployeeName = `
      SELECT * FROM "user"
      WHERE "user".id=$1
    ;`;

    let employeeFullName = '';
    // Prepare thy self!
    if (req.isAuthenticated) {
      try {
        // Did you grab bring your shield?
        await client.query('BEGIN');

        const getEmployeeFullName = await pool.query(getEmployeeName, [
          req.params.employeeID,
        ]);
        employeeFullName = `${getEmployeeFullName.rows[0].employee_first_name} ${getEmployeeFullName.rows[0].employee_last_name}`;
        console.log('Employee Name => ', employeeFullName);
        const putOrderStatusResponse = await pool.query(updateStartOrder, [
          req.params.employeeID,
          req.body.cus_order_isStarted,
          req.body.cus_progress_status,
          employeeFullName,
          req.body.cus_order_number
        ]);

        await client.query('COMMIT');
        res.sendStatus(200);
      } catch (error) {
        console.log(`Whoa.. Lookin' like we can't start this order`, error);
        // Send back a Lost in the Ether Code
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

router.put(
  '/productOrder/errorButton/v1/:employeeID/:orderNumber',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route => /api/employee/productOrder/errorButton/v1/:employeeID/:orderNumber`
    );

    // Prepare the client, Battle TIME!!!
    const client = await pool.connect();
    console.log(`What's are params => `, req.params.employeeID);
    console.log(`What are data coming from body => `, req.body);

    // Query Area
    const updateErrorButton = `
      UPDATE order_table SET cus_error_image=$1, cus_progress_status=$2
      WHERE cus_order_number=$3
    ;`;

    // Did you bring your pass to get in?
    if (req.isAuthenticated) {
      try {
        // Cool, you can come in. You're friend needs to go though
        await client.query('BEGIN');
        const putErrorButtonResponse = await pool.query(updateErrorButton, [
          req.body.cus_error_image,
          req.body.cus_progress_status,
          req.params.orderNumber,
        ]);

        await client.query('COMMIT');
        res.sendStatus(200);
      } catch (error) {
        console.log(
          `Looks like we couldn't change the Customer Error button status`,
          error
        );
        // You're lost, I don't know what to do for you
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden From This Place
      res.sendStatus(403);
    }
  }
);

router.put(
  '/productOrder/orderCompleteButton/v1/:employeeID/:orderNumber',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route => /api/employee/productOrder/orderCompleteButton/v1/:employeeID/:orderNumber`
    );

    // Prepare the client, Got an Order to complete
    const client = await pool.connect();
    console.log(`What's are params => `, req.params.employeeID);
    console.log(`What data coming from the body => `, req.body);

    // Query Area
    const updateCompleteButton = `
      UPDATE order_table SET cus_progress_status=$1
      WHERE user_id_ref=$2 and cus_order_number=$3
    ;`;

    // The zone is restricted
    if (req.isAuthenticated) {
      try {
        // Glad you brought a hardhat
        await client.query('BEGIN');
        const putOrderCompleteResponse = await pool.query(
          updateCompleteButton,
          [
            req.body.cus_progress_status,
            req.params.employeeID,
            req.params.orderNumber,
          ]
        );

        await client.query('COMMIT');
        res.sendStatus(200);
      } catch (error) {
        console.log(`Apparently we couldn't complete the order `, error);
        // Send back a Wandering Aimlessly status code
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

router.put(
  '/productOrder/unassignOrderButton/v1/:employeeID/:orderNumber',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route => /api/employee/productOrder/unassignOrderButton/v1/:employeeID/:orderNumber`
    );

    // Prepare the client, Got an Order to complete
    const client = await pool.connect();
    console.log(`What's are params => `, req.params);
    console.log(`What data is coming from the body => `, req.body);

    // Query Area
    const updateUnassignButton = `
      UPDATE order_table SET cus_progress_status=$1, "cus_order_isStarted"=$2, "user_id_ref"=$3, "employee_full_name"=$4
      WHERE user_id_ref=$5 and cus_order_number=$6
    ;`;

    // Gonna need some ID to get in here
    if (req.isAuthenticated) {
      try {
        // Now stay out the way and let the client get some work done.
        await client.query('BEGIN');
        const putUnassignResponse = await pool.query(updateUnassignButton, [
          req.body.cus_progress_status,
          req.body.cus_order_isStarted,
          req.body.user_id_ref,
          req.body.employee_full_name,
          req.params.employeeID,
          req.params.orderNumber,
        ]);

        await client.query('COMMIT');
        res.sendStatus(200);
      } catch (error) {
        console.log(`Ships going down, we couldn't un-assign anything `, error);
        // Send back we're lost at sea status code
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

// GET route order_table

router.get('/getAllOrders/v1', rejectUnauthenticated, async (req, res) => {
  console.log(`Full route => /api/employee/getAllOrders/v1`);

  // Prepare the client to get some work done
  const client = await pool.connect();

  // Query Area
  const fetchAllOrders = `
    SELECT * FROM order_table
  ;`;

  // Do you belong here?
  if (req.isAuthenticated) {
    // Looks like you made it in.
    try {
      const fetchOrdersResponse = await pool.query(fetchAllOrders);
      console.log(`Response from order_table => `, fetchOrdersResponse.rows);
      // Send back our response
      await client.query('COMMIT');
      res.send(fetchOrdersResponse.rows);
    } catch (error) {
      console.log(
        `Hey Capt. Looks like there's we can't grab the orders`,
        error
      );
      // Send back a Lost in the Ether Code
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.get(
  '/productOrder/v1/:employeeID/:orderNumber',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route => /api/employee/productOrder/v1/:employeeID/:orderNumber`
    );
    console.log(`What params we got coming in =>`, req.params);
    const client = await pool.connect();
    // Query Area
    const fetchProductOrder = `
    SELECT * FROM order_table
    WHERE cus_order_number=$1
  ;`;

    // Prepare the client to get some Pool time in
    if (req.isAuthenticated) {
      try {
        // Did you grab you're swim trunks?
        await client.query('BEGIN');
        const fetchOrderResponse = await pool.query(fetchProductOrder, [
          req.params.orderNumber,
        ]);

        console.log(
          `Order that we've got for you => `,
          fetchOrderResponse.rows
        );
        await client.query('COMMIT');
        res.send(fetchOrderResponse.rows);
      } catch (error) {
        console.log(`Hey, we can't grab that product order... `, error);
        // Couldn't find the pool status code.
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

module.exports = router;
