const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Let's talk to AWS S3 bucket here, wait for response, if good
// let's inform client
// head down to '/order/v1/form/:orderNumber'

router.get('/checkDupeOrder/:orderNumber', async (req, res) => {
  console.log(
    `Full route & params => /api/customer/checkDupeOrder/:orderNumber`,
    req.params
  );

  // GET our Client ready for some work!
  const client = await pool.connect();

  // Query Area
  const checkDupeOrder = `
    SELECT * FROM order_table
    WHERE cus_order_number=$1
  ;`;

  try {
    // PREP the SHIP! We're sailing....
    await client.query('BEGIN');
    const doesThisOrderExistResponse = await pool.query(checkDupeOrder, [
      Number(req.params.orderNumber),
    ]);
    console.log(`Simon says...`, doesThisOrderExistResponse.rowCount);
    await client.query('COMMIT');
    if (doesThisOrderExistResponse.rowCount === 0) {
      // Send ok back, no dupes
      res.send(['ok']);
    } else if (doesThisOrderExistResponse.rowCount === 1) {
      // Send a conflict status code, we have a match
      res.send(['dupe']);
    }
  } catch (error) {
    console.log(
      `Yah we have a problem Capt, looks like we're lost again... `,
      error
    );
    // Send the customer back a Lost @ Sea HTML status code
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.post('/order/v1/form/:orderNumber', async (req, res) => {
  console.log(
    `Full route and body => /api/customer/order/v1/form/:orderNumber`,
    req.body
  );
  // Set up client to do some work for us.
  const client = await pool.connect();

  const {
    cus_order_number,
    cus_first_name,
    cus_last_name,
    cus_phone_number,
    cus_email,
    cus_image,
    cus_notes,
    cus_image_owner_rights,
    cus_social_permission,
  } = req.body;

  console.log(`Customer order # => `, cus_order_number);
  // Queries to postgreSQL
  const fetchOrderTable = `
        SELECT * FROM order_table
        WHERE cus_order_number=$1
    ;`;

  const postOrderTable = `
        INSERT INTO order_table
            (
                cus_order_number, cus_first_name, cus_last_name, cus_phone_number,
                cus_email, cus_image, cus_notes, cus_image_owner_rights,
                cus_social_permission
            )
        VALUES
            (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )
    ;`;

  // try-catch-finally block
  try {
    // Yo client, time to work
    await client.query('BEGIN');
    // Let's See what our response is...
    const awaitingGetResponse = await pool.query(fetchOrderTable, [
      cus_order_number,
    ]);

    console.log(`What we get from response`, awaitingGetResponse.rows);
    // Check to see if the row exist
    if (awaitingGetResponse.rows.length !== 0) {
      // If this order number exists, We send back a -1 to the SAGA to handle as an error
      // that this order exists, handle error message there.
      console.log(`We got a match`, awaitingGetResponse.rows);
      await client.query('COMMIT');
      res.send([-1]);
    } else if (awaitingGetResponse.rows !== []) {
      console.log(`Our response is => `, awaitingGetResponse.rows);
      // If order number doesn't exist, we get to proceed and make a POST request

      // go to S3 if we get back OK do next post to database =>
      const createPostResponse = await pool.query(postOrderTable, [
        cus_order_number,
        cus_first_name,
        cus_last_name,
        cus_phone_number,
        cus_email,
        cus_image,
        cus_notes,
        cus_image_owner_rights,
        cus_social_permission,
      ]);
      await client.query('COMMIT');
      // Send back a CREATED html status code
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(
      'Sorry we had an error fetching or posting customer upload',
      error
    );
    // Send the customer back a Lost in space HTML code
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
