import axios, { AxiosResponse, AxiosError } from "axios";
import { createClient } from "../../@types/clientes.type";

export const createClients = async (client: createClient) => {
  let url = "http://localhost:3000/clients";

  try {
    const response: AxiosResponse = await axios.post(url, client);
    if (response.status === 201) {
      // Retorno para status 201 (Created)
      return { success: true, data: response.data };
    } else if (response.status === 400) {
      return {
        success: false,
        message: "Já existe um cliente com esse email.",
      };
    }
  } catch (error) {
    // Tratamento de erros
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        // Se tivermos uma resposta, tratamos os códigos de erro conhecidos
        if (axiosError.response.status === 400) {
          // Retorno para status 400 (Bad Request)
          return {
            success: false,
            message:
              "Já existe um cliente com esse email. Verifique e tente novamente.",
          };
        } else if (axiosError.response.status === 500) {
          // Retorno para status 500 (Internal Server Error)
          return {
            success: false,
            message: "Erro interno do servidor. Tente novamente mais tarde.",
          };
        }
      }
    }

    // Se não pudermos tratar o erro de forma específica, lançamos uma mensagem genérica
    return {
      success: false,
      message: "Oops! Houve um problema ao carregar os dados.",
    };
  }
};
