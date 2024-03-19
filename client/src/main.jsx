import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import MyOverview from './pages/MyOverview.jsx';
import MyProject from './pages/MyProject.jsx';
import MyTask from './pages/MyTask.jsx';
import MyCalendar from './pages/MyCalendar.jsx';
import TeamMember from './pages/TeamMember.jsx';
import TeamProject from './pages/TeamProject.jsx';
import CompanyOverview from './pages/CompanyOverview.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/dashboard",
        element: <MyOverview />
      },
      {
        path: "/dashboard/projects",
        element: <MyProject />
      },
      {
        path: "/dashboard/tasks",
        element: <MyTask />
      },
      {
        path: "/dashboard/calendar",
        element: <MyCalendar />
      },
      {
        path: "/team",
        element: <TeamMember />
      },
      {
        path: "/team/projects",
        element: <TeamProject />
      },
      {
        path: "/overview",
        element: <CompanyOverview />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

