import express from 'express';
import { type Article, ArticleStore } from '../models/article';
import jwt from 'jsonwebtoken';

const store = new ArticleStore();

const index = async (_req: express.Request, res: express.Response) => {
  const articles = await store.index();
  res.json(articles);
}

const show = async (req: express.Request, res: express.Response) => {
  const article = await store.show(req.params.id);
  res.json(article);
}

const create = async (req: express.Request, res: express.Response) => {
  try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET);
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }

  const article: Article = {
    title: req.body.title,
    content: req.body.content
  }
  try {
      res.send('this is the CREATE route')
  } catch (err) {
      res.status(400)
      res.json(err)
  }
}

const update = async (req: express.Request, res: express.Response) => {
  try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET);
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }

  const article: Article = {
      id: req.params.id, 
      title: req.body.title,
      content: req.body.content
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
}

const destroy = async (req: express.Request, res: express.Response) => {
  try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET);
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }

  try {
      res.send('this is the DELETE route')
  } catch (err) {
      res.status(400)
      res.json(err)
  }
}

const article_routes = (app: express.Application) => {
  app.get('/articles', index);
  app.get('/articles/:id', show);
  app.post('/articles', create);
  app.put('/articles/:id', update);
  app.delete('/articles/:id', destroy);
}

export default article_routes;
