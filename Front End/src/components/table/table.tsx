import {Table, Pagination} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { getClientsData } from "../../service/getClients/getClients";
import * as D from './style';
import { ClientsContext } from "../../utils/contextClients/context";


export const TableClients = () => {
  const { setClients, clients } = useContext(ClientsContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getClientes = await getClientsData(currentPage);
        if (getClientes) {
          setClients(getClientes)

        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const redirectToGoogleMaps = (latitude: string, longitude: string) => {
    const url = `https://www.google.com/maps/place/${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <D.DivTables>
        <Table striped bordered hover className="mt-1 shadow text-capitalize">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Coordenadas</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} onClick={() => redirectToGoogleMaps(client.latitude, client.longitude)} style={{ cursor: 'pointer' }}>
              
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  {client.latitude} <br /> {client.longitude}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </D.DivTables>
      <Pagination className="mt-3">
  <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
  <Pagination.Item>{currentPage}</Pagination.Item>
  <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={clients.length === 0} />
</Pagination>

    </>
  );
};
