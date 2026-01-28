import express from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
}

const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}

const create = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    url: req.body.url,
    description: req.body.description
  }
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
}

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
}

export default product_routes;
