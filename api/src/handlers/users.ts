import express from 'express';
import { type User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const authenticate = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const usr = await store.authenticate(username, password);
    var token = jwt.sign({ user: usr }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(401)
    res.json({ err });
  }
}

const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    id: 0,
    username: req.body.username,
    firstName: req.body.first_name, 
    lastName: req.body.last_name,
    password: req.body.password
  }

  try {
      const newUser = await store.create(user);
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
      res.json(token);
  } catch (err: any) {
      res.status(400)
      res.json(err + user)
  }
}

const update = async (req: express.Request, res: express.Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    password: req.body.password
  }

  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      res.status(401);
      res.json({ error: 'Missing token' });
      return;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    // Guard against the string case and narrow to JwtPayload
    if (typeof decoded === 'string') {
      res.status(401);
      res.json({ error: 'Invalid token payload' });
      return;
    }

    const payload = decoded as jwt.JwtPayload & { id?: number };
    if (payload.id !== user.id) {
      res.status(403);
      res.json({ error: 'User id does not match' });
      return;
    }
  } catch (err) {
    res.status(401)
    res.json(err);
    return;
  }

  try {
    const updatedUser = await store.update(user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400)
    res.json(err);
  }
}

const userRoutes = (app: express.Application) => {
  app.post('/authenticate', authenticate);
  app.post('/users', create);
  app.put('/users/:id', update);
}
export default userRoutes;
