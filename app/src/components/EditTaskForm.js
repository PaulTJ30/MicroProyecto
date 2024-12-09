import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EditTaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true); // Bandera de carga

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/Task/get/${id}`);
                setTask(res.data); // Carga los datos de la tarea
            } catch (error) {
                console.error('Error al cargar la tarea:', error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchTask();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/Task/update/${id}`, task);
            navigate('/tasks'); // Redirige al listado de tareas
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    if (loading) {
        return <div className="container">Cargando...</div>;
    }

    if (!task) {
        return <div className="container">Tarea no encontrada</div>;
    }

    return (
        <div className="container">
            <h2>Editar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={task.description}
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
                        name="dueDate"
                        value={task.dueDate.split('T')[0]} // Ajustar formato de fecha
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
                        value={task.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completada</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};
