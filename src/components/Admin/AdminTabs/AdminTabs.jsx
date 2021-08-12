import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminArtistTable from '../AdminArtistTable/AdminArtistTable';
import AdminOrdersTable from '../AdminOrdersTable/AdminOrdersTable';
import AdminIssuesTable from '../AdminIssuesTable/AdminIssuesTable';

// import material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, AppBar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function AdminTabs() {
  // set material-ui classes variable
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabs = (event, value) => {
    setSelectedTab(value);
  };

  const ordersState = useSelector((store) => store.ordersState);
  // useEffect(() => {
  //   dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
  // }, []);
  return (
    <>
      {!ordersState ? (
        ''
      ) : (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              value={selectedTab}
              onChange={handleTabs}
            >
              <Tab label="Orders" />
              <Tab label="Issues" />
              <Tab label="Artists" />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && <AdminOrdersTable />}
          {selectedTab === 1 && <AdminIssuesTable />}
          {selectedTab === 2 && <AdminArtistTable />}
        </div>
      )}
    </>
  );
} // end AdminTabs

// export AdminTabs
export default AdminTabs;
