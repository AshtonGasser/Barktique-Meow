import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridApi,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import "./orderTable.css";
import { STATUS_OPTIONS, COLORS } from "./StaticData";
import { renderEditStatus } from "./EmployeeOrderSelect";
import { renderStatus } from "./renderStatus";
import { actionChannel } from "redux-saga/effects";
import { QuickSearchToolbar, escapeRegExp } from "./SearchBar";

function EmployeeOrderTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);
  // const users = useSelector((store) => store.adminEmployeeInfoReducer); // Regular employees can't hit this route!
  const user = useSelector((store) => store.user); // This is the user table to show who's logged in. This is the reducer to use.
  const ordersState = useSelector((store) => store.ordersState);
  // Create all table rows
  const orderInfoMap = orders?.map((order) => {
    // adding id here because material-ui REQUIRES it.
    order.id = order.order_id;
    order.fullName = `${order.cus_first_name} ${order.cus_last_name}`;
    order.date = moment(order.cus_upload_date).format("MMM Do YYYY");
    return order;
  });

  // claim order functions
  const ClaimOrderButton = (config) => {
    const orderNumber = config.row.cus_order_number;
    switch (config.row.cus_progress_status) {
      case "In Progress":
        return <Button hidden />;
      case "Complete":
        return <Button hidden />;
      case "Image Rejected":
        return <Button hidden />;
      default:
        return (
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: 16 }}
            onClick={() => {
              handleClaimClick(orderNumber);
            }}
          >
            ClAIM
          </Button>
        );
    }
  };

  const orderNumberHandler = (config) => {
    const orderNumber = config.row.cus_order_number; 
    return (
      <div
        onClick={() => {
          handleOrderNumberClick(orderNumber);
        }}
        className="OrderNum-Nav"
      >
        {config.row.cus_order_number}
      </div>
    );
  };

  const nameHandler = (config) => {
    const orderNumber = config.row.cus_order_number;
    return (
      <div
        onClick={() => {
          handleOrderNumberClick(orderNumber);
        }}
        className="OrderNum-Nav"
      >
        {config.row.cus_first_name} {config.row.cus_last_name}
      </div>
    );
  };

  const employeeHandler = (config) => {
    const orderNumber = config.row.cus_order_number; 
    return (
      <>
        <div
          onClick={() => {
            handleOrderNumberClick(orderNumber); 
          }}
          className="OrderNum-Nav"
        >
          {config.row.employee_full_name}
        </div>
      </>
    );
  };

  const handleOrderNumberClick = (orderNumber) => {

    history.push(`/orderPage/${user.id}/${orderNumber}`);
  };

  const handleClaimClick = (orderNumber) => {
 
    Swal.fire({
      icon: "question",
      title: "Are you sure you want to claim this order?",
      showCancelButton: true,
      confirmButtonText: "Claim",
      confirmButtonColor: "#000000",
    }).then((result) => {
      if (result.isConfirmed) {
  
        const startOrder = {
          cus_order_isStarted: true,
          cus_progress_status: "In Progress",
          cus_order_number: orderNumber,
          id: user.id,
        };

        console.log(`The order we are starting => `, startOrder);

        dispatch({
          type: "START_ORDER_BUTTON",
          payload: {
            data: startOrder,
          },
        });

        history.push(`/orderPage/${user.id}/${startOrder.cus_order_number}`);
      }
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PRODUCT_ORDERS" });
    dispatch({ type: "CLEAR_PRODUCT_ORDER" });
  }, []);

  //data grid table

  const columns = [
    {
      field: "order_id",
      headerName: "Claim Order",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      disableExport: true,
      renderCell: ClaimOrderButton,
    },
    {
      field: "cus_order_number",
      headerName: "Order #",
      width: 180,
      disableClickEventBubbling: true,
      renderCell: orderNumberHandler,
    },
    {
      field: "fullName",
      headerName: "Customer",
      width: 180,
      renderCell: nameHandler,
    },
    {
      field: "employee_full_name",
      headerName: "Employee",
      width: 150,
      renderCell: employeeHandler,
    },
    {
      field: "date",
      headerName: "Date Received",
      width: 180,
    },
    {
      field: "cus_progress_status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      editable: false,
      valueOptions: STATUS_OPTIONS,
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      type: "singleSelect",
      
    },
   
  ];

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(orderInfoMap);
  const [loading, setLoading] = useState(true);

  const requestSearch = (searchValue) => {
    
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = rows.filter((row) => {
    
      return Object.keys(row).some((field) => {
    
        if (row[field] !== null) {
          return searchRegex.test(row[field].toString());
        }
      });
    });
    setRows(filteredRows);
    if (searchValue.length == 0) {
      setRows(orderInfoMap);
    }
  };

  useEffect(() => {
    setRows(orderInfoMap);
  }, [ordersState]);

  return (
    <>
      {!ordersState ? (
        ""
      ) : (
        <section>
          {orders.length == 0 ? (
            <center>
              <p>You Don't have any orders yet.</p>
            </center>
          ) : (
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    rows={rows ?? []}
                    columns={columns}
                    pageSize={20}
                    sortModel = {[
                      {
                       field: "cus_progress_status",
                       sort: 'desc'
                      }
                    ]}
                    components={{
                      Toolbar: QuickSearchToolbar,
                    }}
                    componentsProps={{
                      toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(""),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default EmployeeOrderTable;
