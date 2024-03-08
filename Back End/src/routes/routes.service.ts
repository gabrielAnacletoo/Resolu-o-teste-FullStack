import { Injectable, HttpException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class RoutesService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: 'postgres://postgres:123@localhost:5432/fullstackteste',
    });
  }

  async calculate() {
    const startPosition = {
      latitude: -22.30198953912286,
      longitude: -49.00492261396033,
    };

    const client = await this.pool.connect();
    try {
      const query = 'SELECT * FROM clients';
      const result = await client.query(query);
      const clients = result.rows;

      const visited = new Set(); // Conjunto para rastrear os clientes visitados
      let route = []; // Array para armazenar a rota
      let currentPosition = startPosition; // Variável para rastrear a posição atual


      for (let j = 0; j < clients.length; j++) {
        let minDistance = Number.MAX_VALUE; // Distância mínima inicializada com o maior valor possível
        let nearestClientIndex = -1; // Índice do cliente mais próximo
  
        // Encontrar o cliente não visitado mais próximo
        for (let i = 0; i < clients.length; i++) {
          if (!visited.has(i)) { // Verifica se o cliente não foi visitado ainda
            const distance = this.calculateDistance(currentPosition, clients[i]); // Calcula a distância até o cliente
            if (distance < minDistance) { // Verifica se a distância é menor que a distância mínima atual
              minDistance = distance; // Atualiza a distância mínima
              nearestClientIndex = i; // Define o índice do cliente mais próximo
            }
          }
        }
        // Marcar o cliente mais próximo como visitado
        visited.add(nearestClientIndex);
        // Adicionar à rota
        route.push(clients[nearestClientIndex]);
        // Deslocar para o local do cliente mais próximo
        currentPosition = clients[nearestClientIndex];
      }


      // Retornar a rota
      return {route} 
    } catch (error) {
      throw new HttpException(error.message, error.status);
    } finally {
      client.release();
    }
  }

  private calculateDistance(point1, point2) {
    const lat1Radians = point1.latitude * (Math.PI / 180); // Latitude 1 em radianos
    const lon1Radians = point1.longitude * (Math.PI / 180); // Longitude 1 em radianos
    const lat2Radians = point2.latitude * (Math.PI / 180); // Latitude 2 em radianos
    const lon2Radians = point2.longitude * (Math.PI / 180); // Longitude 2 em radianos
  
    const earthRadius = 6371e3; // Raio da Terra em metros
    const deltaLat = lat2Radians - lat1Radians; // Variação de latitude em radianos
    const deltaLon = lon2Radians - lon1Radians; // Variação de longitude em radianos
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Radians) * Math.cos(lat2Radians) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c; // Distância em metros
    return distance;
  }
}
