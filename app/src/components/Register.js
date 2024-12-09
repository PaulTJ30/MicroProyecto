import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';

export const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        rol: 'user',
    });
    const navigate = useNavigate()

    const onChangeRegister = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: value,
        }))

    };

    const handleSubmit = async (e) => {

        try {

            await axios.post("http://localhost:4000/register", data, {

            })
            alert("Usuario registrado exitosamente!!")
            navigate("/")
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Error al registrar el usuario. Intenta de nuevo.");
        }
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Formulario para registro de usuarios</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Nombre:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="name" value={data.name} placeholder="Ingresa tu nombre" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Correo:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="email" type="email" value={data.email} placeholder="Ingresa tu correo" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Contraseña:</Form.Label>
                            <Form.Control onChange={onChangeRegister} name="password" value={data.password} type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="rol">Rol</Form.Label>
                            <Form.Select
                                name="rol"
                                value={data.rol || ""}
                                onChange={onChangeRegister}

                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </Form.Select>
                        </Form.Group>
                        <Button onClick={() => handleSubmit()}>Registrate!</Button>


                    </Form>
                </Card.Body>
            </Card >
        </Container >

    );
};


