import React, { createContext, useState, ReactNode } from 'react';
import { clientstypes } from "../../@types/clientes.type";

type props = {
children: ReactNode
}

interface ClientesContextType {
  clients: clientstypes[];
  setClients: React.Dispatch<React.SetStateAction<clientstypes[]>>;
  addClient: (newClient: clientstypes) => void;
}

const initialClients: clientstypes[] = [];

export const ClientsContext = createContext<ClientesContextType>({
  clients: initialClients,
  setClients: () => {},
  addClient: () => {},
});

export const ClientsProvider: React.FC<props> = ({ children }) => {
  const [clients, setClients] = useState<clientstypes[]>(initialClients);

  const addClient = (newClient: clientstypes) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  return (
    <ClientsContext.Provider value={{ clients, setClients, addClient }}>
      {children}
    </ClientsContext.Provider>
  );
};
