import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Task/get');
        console.log('Tareas obtenidas del backend:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    fetchTasks();
  }, []);


  const handleDelete = async (ID) => {
    console.log('Eliminando tarea con ID:', ID);
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        const res = await axios.delete(`http://localhost:4000/Task/delete/${ID}`);
        if (res.status === 200) {
          setTasks(tasks.filter((task) => task._id !== ID));
        } else {
          console.error('No se pudo eliminar la tarea:', res.data);
        }
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  };

  const closeSesion = () => {
    if (window.confirm('¿Estás seguro de cerrar sesion?')) {

      navigate("/")


    }
  }


  return (
    <div className="container">
      <h2>Mis Tareas</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate('/tasks/new')}
      >
        Añadir Tarea
      </button>
      <ul className="list-group ">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center ">
            <div>
              <strong>{task.title} - </strong> {task.description} - {task.status}
            </div>
            <div>
              <Link to={`/tasks/edit/${task._id}`} className="btn btn-warning btn-sm me-2 ">
                Editar
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(task._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
        <button
          className="btn btn-danger btn-sm mt-5"
          onClick={() => closeSesion()}
        >
          Cerrar Sesion
        </button>

      </ul>
    </div>
  );
};
