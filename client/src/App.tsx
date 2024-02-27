import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  HomeLayout,
  LandingPage,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddTrip,
  Stats,
  MyTrips,
  Profile,
  EditTrip,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addTripAction } from './pages/AddTrip';
import { action as editTripAction } from './pages/EditTrip';
import { action as deleteTripAction } from './pages/DeleteTrip';
import { action as profileAction } from './pages/Profile';

import { loader as landingLoader } from './pages/LandingPage';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as myTripsLoader } from './pages/MyTrips';
import { loader as editTripLoader } from './pages/EditTrip';
import { loader as statsLoader } from './pages/Stats';

import ErrorElement from './components/ErrorElement';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingLoader,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
        loader: landingLoader,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
        loader: landingLoader,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <MyTrips />,
            loader: myTripsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: 'add-trips',
            element: <AddTrip />,
            action: addTripAction,

          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'edit-trip/:id',
            element: <EditTrip />,
            loader: editTripLoader,
            action: editTripAction,
          },
          {
            path: 'delete-trip/:id',
            action: deleteTripAction
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
export default App;
