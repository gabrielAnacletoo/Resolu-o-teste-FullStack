import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: 'postgres://postgres:123@localhost:5432/fullstackteste',
    });
  }

  async create(clientPayload: CreateClientDto): Promise<any> {
    const client = await this.pool.connect();
    try {
      // Verificar se já existe um cliente com o mesmo email
      const verifyClientQuery = 'SELECT * FROM clients WHERE email = $1';
      const verifyClientResult = await client.query(verifyClientQuery, [clientPayload.email]);
      if (verifyClientResult.rows.length > 0) {
        throw new BadRequestException('There is already a client with this email.');
      }

      // Criar um novo cliente
      const createClientQuery = `
        INSERT INTO clients (name, email, phone, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
      const createClientValues = [
        clientPayload.name,
        clientPayload.email,
        clientPayload.phone,
        clientPayload.latitude,
        clientPayload.longitude,
      ];
      const createClientResult = await client.query(createClientQuery, createClientValues);

      return createClientResult.rows[0];
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      client.release();
    }
  }
 

  async findAll(page: number = 1, limit: number = 10, name?: string, email?: string, phone?: string): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const skip = (page - 1) * limit;

      let query = 'SELECT * FROM clients';

      const conditions = [];
      const values = [];

      if (name) {
        conditions.push('name ILIKE $' + (values.length + 1));
        values.push('%' + name + '%');
      }

      if (email) {
        conditions.push('email ILIKE $' + (values.length + 1));
        values.push('%' + email + '%');
      }

      if (phone) {
        conditions.push('phone ILIKE $' + (values.length + 1));
        values.push('%' + phone + '%');
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' OFFSET $' + (values.length + 1) + ' LIMIT $' + (values.length + 2);
      values.push(skip, limit);

      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    } finally {
      client.release();
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
