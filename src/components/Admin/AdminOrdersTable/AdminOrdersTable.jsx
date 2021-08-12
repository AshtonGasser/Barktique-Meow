import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


// component import
import EmployeeOrderTable from '../../EmployeeOrderPage/EmployeeOrderQueue/EmployeeOrderTable';

// AdminOrdersTable function component
function AdminOrdersTable () {
  // This waits for employee info to come back from SAGA then fires
  const ordersState = useSelector((store) => store.ordersState);
  return (
    <>
     
        <div>
          <EmployeeOrderTable />
        </div>
    
      {/* <div>
        <EmployeeOrderTable />
      </div> */}
    </>
  );
} // end AdminOrdersTable

// export AdminOrdersTable
export default AdminOrdersTable;