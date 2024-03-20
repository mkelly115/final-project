import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from 'react';

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
import LoginForm from './components/LoginForm/LoginForm.jsx';
import ProjectTask from './pages/ProjectTask.jsx';


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
        path: '/dashboard/projects/:projectId', 
        element: <ProjectTask />
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
    ]
  }
]);

export default function AppWithRouter() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  

  return (
    <RouterProvider router={router}>
      <App handleLogin={handleLogin} />
      {showLoginModal && <LoginForm handleClose={handleCloseLoginModal} />}
    </RouterProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWithRouter />);

