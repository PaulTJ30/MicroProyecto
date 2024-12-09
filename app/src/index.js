import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TasksPage } from './pages/TasksPage';
import { NewTaskForm } from './components/NewTaskForm';
import { Dashboard } from './components/Dashboard';
import { Register } from './components/Register';
import { Header } from './components/Header';
import App from './pages/App';
import { EditTaskForm } from './components/EditTaskForm';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/tasks",
        element: <TasksPage />,
    },

    {
        path: "/tasks/new",
        element: <NewTaskForm />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/tasks/edit/:id",
        element: <EditTaskForm />,
    },
    {
        path: "/Dashboard",
        element: <Dashboard />,
    }
]);
const user = localStorage.user ? JSON.parse(localStorage.user) : undefined


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <>
            {
                user?.logined == true && (
                    <Header />
                )
            }
            <RouterProvider router={router} />
        </>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();