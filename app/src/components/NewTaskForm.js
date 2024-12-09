import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const NewTaskForm = () => {
    const [createTask, setCreateTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        // userID: JSON.parse(localStorage.getItem('user'))?.ID || '', // Validar si existe user en localStorage
        status: 'pending',
    });

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }))// Actualiza solo el campo correspondiente
    };
    ;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar recarga de página



        try {


            // Crear nueva tarea
            await axios.post('http://localhost:4000/Task/create', createTask);

            navigate('/tasks'); // Redirige al listado de tareas
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
        }
    }


    return (
        <div className="container">
            <h2> Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title" // Necesario para identificar el campo
                        value={createTask.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description" // Necesario para identificar el campo
                        value={createTask.description}
                        onChange={handleInputChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Fecha de Vencimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate" // Necesario para identificar el campo
                        value={createTask.dueDate.split('T')[0]}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Estado</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={createTask.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completada</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear Tarea
                </button>
            </form>
        </div>
    );
};
