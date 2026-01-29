import 'dotenv/config';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const { 
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD } = process.env;

const client = new Client({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

async function seed() {
  try {
    await client.connect();

    // Read the data.json file from the app directory
    const dataPath = path.join(__dirname, '../app/src/assets/data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Upsert into products table (no duplicates on re-run)
    for (const product of data) {
      const query = `
        INSERT INTO products (id, name, price, url, description)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          url = EXCLUDED.url,
          description = EXCLUDED.description
      `;
      await client.query(query, [
        product.id,
        product.name,
        product.price,
        product.url,
        product.description,
      ]);
    }

    console.log(`Successfully upserted ${data.length} products`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seed();
