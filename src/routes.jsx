import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import TaskList from 'src/pages/Tasks';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import Add from './components/task/Add';
import Edit from './pages/Tasks/Edit';
const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: 'tasks',
        element: <TaskList />,
      },
      { path: '/tasks/:id', element: <Edit /> },
      { path: '/', element: <Navigate to="/app/tasks" /> },
      
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/tasks" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/register', element: <Register to="/login" /> },
      { path: '*', element: <Navigate to="/404" />},
    ],
  },
];
/*

const routes = (isLoggedIn) => (

  <Routes>
    isLoggedIn ?
    <Route path="/app" element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />} >
      <Route path="tasks">
        <Route path="/" element={<TaskList />} />
        <Route path="/:id" element={<Edit />} />
        <Route path="add" element={<Add />} />
      </Route>
    </Route>
    :

    <Route path="/" element={!isLoggedIn ? <MainLayout /> : <Navigate to="/app/tasks" />} >
      <Route path="/" element={<Login />}>
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

    </Route>
  </Routes>
)
*/

export default routes;

