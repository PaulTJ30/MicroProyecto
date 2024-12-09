import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import axios from 'axios';

const App = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }
  const handleLogin = async (e) => {

    try {
      const res = await axios.post(`http://localhost:4000/login`, credentials)
      const user = (res.data.user)


      if (user.rol === "admin") {
        navigate('/Dashboard');
      }
      else {

        navigate("/tasks")
      } // Redirige al listado de tareas
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <Container className="mt-3">
      <Card className="mb-5" style={{ width: "30rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title className="text-center">
            BIenvenido a UTMA-Tasks
          </Card.Title>
          <Form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Correo electronico:</Form.Label>
              <Form.Control placeholder="Ingresa tu correo electronico" type="email" name="email" onChange={onChange} /* Texto informativo para el usuario */ />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control placeholder="Ingresa tu contraseña" type="password" name="password" onChange={onChange} />
            </Form.Group>

            <Row className="text-center">
              <Col>
                <Button onClick={() => handleLogin()}>Ingresar</Button>
              </Col>
              <Col>
                <p>¿No tienes cuenta? <a href="/register">¡Registrate!</a></p>

              </Col>
            </Row>


          </Form>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default App;
