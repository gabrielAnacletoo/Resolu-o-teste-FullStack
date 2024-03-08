import { ChangeEvent, useState, useContext } from "react";
import { createClient } from "../../@types/clientes.type";
import { createClients } from "../../service/createClient/create";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { ClientsContext } from "../../utils/contextClients/context";
import * as D from './style'

export const RegisterClients = () => {
  const [client, setClient] = useState<createClient>({} as createClient);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const { addClient } = useContext(ClientsContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await createClients(client);
      if (response && response.success) {
        addClient(response.data);
        setShowMessage(true)
        setTimeout(() => {
          setClient({
            name: "",
            email: "",
            phone: "",
            latitude: "",
            longitude: ""
          })
          setShowMessage(false)
        }, 3000);
      } else {
        setLoading(false);
        setErrorMessage(response?.message || "");
        setTimeout(() => {
          setErrorMessage("");
        }, 3500);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Houve um problema. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do cliente"
              name="name"
              value={client.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              placeholder="(11) 99999-9999"
              name="phone"
              value={client.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            value={client.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="-22.32874280"
              name="latitude"
              value={client.latitude}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              placeholder="-49.07681082"
              name="longitude"
              value={client.longitude}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Row>

        
      {showMessage && (
        <>
          <D.DivSuccess>
            <div className="wrapper">
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <div>
              <span>Cliente cadastrado com sucesso! </span>
            </div>
          </D.DivSuccess>
        </>
      )}


        {errorMessage ? (
          <p className="bg-danger text-white px-1"> {errorMessage} </p>
        ) : null}
        <Button
          variant="primary"
          className="rounded-0 shadow"
          onClick={handleSubmit}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Cadastrar"}
        </Button>
      </Form>
    </>
  );
};
