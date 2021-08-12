const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectNonAdmins,
} = require('../modules/authentication-middleware');
const { get } = require('./user.router');

// PUT routes Edit employee info

router.put(
  '/editEmployee/firstName/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/firstName/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_first_name } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, req.body);
    // employee id from user table column id!
    const emp_id = Number(req.body.id);
    // Query Area
    const updateEmployeeFirst = `
      UPDATE "user" SET employee_first_name=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putFirstName = await pool.query(updateEmployeeFirst, [
          employee_first_name,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee First Name`,
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
  }
);

router.put(
  '/editEmployee/lastName/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/lastName/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_last_name } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_last_name));
    // employee id from user table column id!
    const emp_id = Number(req.body.id);
    // Query Area
    const updateEmployeeLast = `
      UPDATE "user" SET employee_last_name=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putLastName = await pool.query(updateEmployeeLast, [
          employee_last_name,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(`Sorry we had a problem editing Employee Last Name`, error);
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
  '/editEmployee/phoneNumber/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/phoneNumber/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_phone_number } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_phone_number));
    // employee id from user table column id!
    const emp_id = Number(req.body.id);
    // Query Area
    const updateEmployeePhoneNumber = `
      UPDATE "user" SET employee_phone_number=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putPhoneNumber = await pool.query(updateEmployeePhoneNumber, [
          employee_phone_number,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee Phone Number`,
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
  }
);

router.put(
  '/editEmployee/accessLevel/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/accessLevel/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_access_level } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_access_level));
    // employee id from user table column id!
    const emp_id = Number(req.body.id);
    // Query Area
    const updateEmployeeAccessLevel = `
      UPDATE "user" SET employee_access_level=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putAccessLevel = await pool.query(updateEmployeeAccessLevel, [
          employee_access_level,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee Access Level.`,
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
  }
);

router.put(
  '/editEmployee/email/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/email/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { username } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(username));
    // employee id from user table column id!
    const emp_id = Number(req.body.id);
    // Query Area
    const updateEmployeeEmail = `
      UPDATE "user" SET username=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putEmail = await pool.query(updateEmployeeEmail, [
          username,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee "Email" username.`,
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
  }
);

// DELETE route
// ****** This route needs an Employee Assigned to an order to test
router.put(
  '/delete/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(`Full route => /api/admin/delete/v1/:employeeID`);
    console.log(`We data is body sending us? => `, req.body);
    // Prepare the client for DELETION!
    const client = await pool.connect();

    // Query Area
    const reinstateOrders = `
      UPDATE order_table SET cus_progress_status=$1, "cus_order_isStarted"=$2, "user_id_ref"=$3, "employee_full_name"=$4
      WHERE user_id_ref=$5
    ;`;

    const deleteEmployee = `
      DELETE FROM "user"
      WHERE "user".id=$1
    ;`;

    // Do you have what it takes?
    if (req.isAuthenticated) {
      try {
        // We're going to find out
        await client.query('BEGIN');
        const unAssignEmployeeOrders = await pool.query(reinstateOrders, [
          req.body.cus_progress_status,
          req.body.cus_order_isStarted,
          req.body.user_id_ref,
          req.body.employee_full_name,
          req.body.id,
        ]);

        const deleteEmployeeResponse = await pool.query(deleteEmployee, [
          req.body.id,
        ]);

        await client.query('COMMIT');
        res.sendStatus(200);
      } catch (error) {
        console.log(`Looks like you missed the correct delete `, error);
        // Send back that they couldn't find the ring status code
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

// GET routes for all employee's
router.get(
  '/getArtists/v1',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(`Full route => /api/admin/getArtists/v1`);
    // Prepare the client to get some work done
    const client = await pool.connect();
    // Query Area
    // We DO NOT want to send back a password, HASHED OR NOT!
    const fetchAllEmployees = `
      SELECT 
      id,
      username,
      employee_access_level,
      employee_first_name,
      employee_last_name,
      employee_phone_number  FROM "user"
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome to the Shadow Realm, begin your work!
        await client.query('BEGIN');
        const getAllEmployees = await pool.query(fetchAllEmployees);
        console.log(`All employees => `, getAllEmployees.rows);
        // Send the rows for our Database.
        res.send(getAllEmployees.rows);
      } catch (error) {
        console.log(
          `We had a problem fetching the Employee list from database...`,
          error
        );
        // Send back we can't find our way outta here, http status code....
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

router.get(
  '/getOrderIssue/v1',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(`Full route => /api/admin/getOrderIssue/v1`);
    // Prepare the client to get some work done
    const client = await pool.connect();
    // Query Area

    const fetchDateIssues = `
      SELECT * FROM order_table
      WHERE cus_date_issues=true
    ;`;

    const fetchImageIssues = `
      SELECT * FROM order_table
      WHERE cus_error_image=true;
    `;

    const flagDateIssues = `
      UPDATE order_table SET cus_date_issues=true
      WHERE cus_upload_date < NOW() - INTERVAL '5 days'

    ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome to the Shadow Realm, begin your work!
        await client.query('BEGIN');

        // Fire off query to check for date > 5 days and update order_table
        // column cus_date_issues to be true
        const flagDateIssuesResponse = await pool.query(flagDateIssues);
        console.log(`Are there any issues => `, flagDateIssuesResponse);
        // Query to grab from order_table if there is any date issues
        const theTimeIsResponse = await pool.query(fetchDateIssues);
        console.log(`Date issues => `, theTimeIsResponse.rows);
        // Query to grab from order_table if there are any image issues
        const imageIssuesResponse = await pool.query(fetchImageIssues);
        console.log(`Image Issues => `, imageIssuesResponse.rows);

        await client.query('COMMIT');
        // Send the rows for our Database.
        res.send([
          { dateIssues: theTimeIsResponse.rows },
          { imageIssue: imageIssuesResponse.rows },
        ]);
      } catch (error) {
        console.log(`Hey, we had issues with your issues... `, error);
        // Send back we can't find our way outta here, http status help code....
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

router.get(
  '/getSingleEmployeeInfo/v1/:employeeId',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route => /api/admin/getSingleEmployeeInfo/v1/:employeeId`,
      req.params
    );
    // Prepare the client to get some work done
    const client = await pool.connect();
    // Query Area
    const queryToGetSingleEmployee = `
      SELECT id,
      username,
      employee_access_level,
      employee_first_name,
      employee_last_name,
      employee_phone_number FROM "user"
      WHERE "id"=$1
    ;`;
    // You need the boot?
    if (req.isAuthenticated) {
      try {
        // Guess not, what can I do for you
        await client.query('BEGIN');
        const getEmployeeResponse = await pool.query(queryToGetSingleEmployee, [
          Number(req.params.employeeId),
        ]);
        console.log(`What did we get => `, getEmployeeResponse.rows);
        await client.query('COMMIT');
        // Send the employee info back, thanks...
        res.send(getEmployeeResponse.rows);
      } catch (error) {
        console.log(`Yah, I don't think your getting their info `, error);
        // They never made it out of the maze.
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // You get the boot
      res.sendStatus(403);
    }
  }
);

module.exports = router;
