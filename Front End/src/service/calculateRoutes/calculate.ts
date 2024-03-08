import axios, { AxiosResponse, AxiosError } from "axios";


export const calculateRoutes = async () => {
  const url = "http://localhost:3000/routes";

  
try {
  const response: AxiosResponse = await axios.get(url)
    if (response.status === 200) {
      return response.data
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
            message: "Requisição inválida. Verifique os dados.",
          };
        }  else if (axiosError.response.status === 500) {
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