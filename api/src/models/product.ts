import client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  url: string;
  description: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';  
      const result = await client.query(sql);  
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const result = await client.query(sql, [id]);
        return result.rows[0];
    } catch (err) {
        throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    // Implementation goes here
    return product;
  }
}