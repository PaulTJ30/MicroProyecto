import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalTasks: 0,
    });
    const navigate = useNavigate()
    const closeSesion = () => {
        if (window.confirm('¿Estás seguro de cerrar sesion?')) {

            navigate("/")


        }
    }


    useEffect(() => {
        getUser()
        getMetrics()
    }, []);

    const getUser = () => {
        try {
            const user = JSON.parse(localStorage.getItem('users'));
            setUser(user);
        } catch (error) {
            console.error('Error al obtener el usuario del localStorage:', error);
        }
    };

    const getMetrics = async () => {
        try {
            const res = await axios.get("http://localhost:4000/Dashboard/stats")
            const data = {
                totalTasks: res.data.totalTasks,
                totalUsers: res.data.totalUsers
            }
            setMetrics(data)
        } catch (error) {
            alert("Hubo un error al obtener las metricas")

        }
    }


    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Panel de Control </h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Usuarios Registrados</h5>
                            <p className="card-text display-4">{metrics.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Tareas Creadas</h5>
                            <p className="card-text display-4">{metrics.totalTasks}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-danger btn-sm mt-5"
                onClick={() => closeSesion()}
            >
                Cerrar Sesion
            </button>

        </div>
    );
};


