import { Button, Modal, Table } from "react-bootstrap";
import * as D from "./style";
import { useState, useEffect } from "react";
import { calculateRoutes } from "../../service/calculateRoutes/calculate";
import { RouteData } from "../../@types/routes.type";
import { RegisterClients } from "../registerClients/register";

export const MenuSide = () => {
  const [show, setShow] = useState(false);
  const [routesData, setRoutesData] = useState<RouteData>({} as RouteData);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleCloseSecondModal = () => setShowSecondModal(false);
  const handleShowSecondModal = () => setShowSecondModal(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRoutes = await calculateRoutes();
        if (getRoutes) {
          setRoutesData(getRoutes);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <D.MenuSide className="shadow">
        <Button
          variant="light"
          className="my-1 w-100 rounded-0 text-start custom-button"
        >
          Home
        </Button>
        <Button
          variant="light"
          className="my-1 w-100 rounded-0 text-start custom-button"
          onClick={handleShowSecondModal}
        >
          Cadastrar Cliente
        </Button>
        <Button
          variant="light"
          className="my-1 w-100 rounded-0 text-start custom-button"
          onClick={handleShow}
        >
          Calcular rotas
        </Button>
      </D.MenuSide>
      <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <RegisterClients />
        </Modal.Body>
        <Modal.Footer>
              <Button variant="danger rounded-0" onClick={handleCloseSecondModal}>
            Fechar
          </Button>

        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Menor Rota sugerida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <D.DivTable>
            <Table striped bordered hover className="mt-1 shadow overflow-auto text-capitalize">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {routesData.route &&
                  routesData.route.map((route, index) => (
                    <tr key={index}>
                      <td>{index + 1}º</td>
                      <td>{route.name}</td>
                      <td>{route.email}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </D.DivTable>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="rounded-0 shadow"
            onClick={handleClose}
          >
            Fechar
          </Button>
          <Button variant="primary" className="rounded-0" onClick={handleClose}>
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
