import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import EmployeeHeader from '../EmployeeHeader/EmployeeHeader';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Admin from '../Admin/Admin';
import AdminEditEmployee from '../Admin/AdminEditEmployee/AdminEditEmployee';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import OrderPage from '../OrderPage/OrderPage';
import AdminCreateEmployee from '../Admin/AdminCreateEmployee/AdminCreateEmployee';
import AdminArtistTable from '../Admin/AdminArtistTable/AdminArtistTable';
import AdminOrdersTable from '../Admin/AdminOrdersTable/AdminOrdersTable';
import EmployeeOrderPage from '../EmployeeOrderPage/EmployeeOrderPage';
import EmployeeOrderQueue from '../EmployeeOrderPage/EmployeeOrderQueue/EmployeeOrderQueue';
import LogoutPage from '../UserPage/LogoutPage'

import './App.css';
import { fontWeight } from '@material-ui/system';

const theme = createTheme({
  root: {},
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ef3e47',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Yantramanav',
      fontWeightBold: 700,
    },
    button: {
      textTransform: 'uppercase',
      fontFamily: 'Yantramanav',
      fontWeightBold: 700,
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route exact path="/order">
              <OrderPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/editEmployee/:id"
            >
              <AdminEditEmployee />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute path="/logout/:status">
              <LogoutPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/createEmployee">
              <AdminCreateEmployee />
            </ProtectedRoute>

            <ProtectedRoute exact path="/employee">
              <EmployeeOrderQueue />
            </ProtectedRoute>
            <ProtectedRoute
              exact
              path="/orderPage/:id/:orderNumber"
              // component={EmployeeOrderPage}
            >
              <EmployeeOrderPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/employee"
            >
              <LandingPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/admin">
              <Admin />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
