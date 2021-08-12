const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectNonAdmins = (req, res, next) => {
  // check if logged in and an admin
  if (req.user.employee_access_level > 1) {
    // They're authorized! Admin may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // Failure is always best to be handled on the server.
    // Forbid them from the kingdom
    res.sendStatus(403)
  }
}

module.exports = { rejectUnauthenticated, rejectNonAdmins };
