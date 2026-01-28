import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  database: 'mystore',
  user: 'mystore_user',
  password: 'password',
});

async function seed() {
  try {
    await client.connect();

    // Read the data.json file from the app directory
    const dataPath = path.join(__dirname, '../app/src/assets/data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Insert data into products table
    for (const product of data) {
      const query = `
        INSERT INTO products (id, name, price, url, description)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(query, [
        product.id,
        product.name,
        product.price,
        product.url,
        product.description,
      ]);
    }

    console.log(`Successfully inserted ${data.length} products`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seed();
