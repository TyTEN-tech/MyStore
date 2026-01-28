import bcrypt from 'bcrypt';
import Client from '../database'

const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = process.env.SALT_ROUNDS || '10';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = await bcrypt.hash(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstName, u.lastName, u.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (err: any) {
      throw new Error(`Failed to create user ${u.username}: ${err.message}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'UPDATE users SET first_name=$1, last_name=$2, username=$3, password=$4 WHERE username=$5 RETURNING *';
      const hash = await bcrypt.hash(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstName, u.lastName, u.username, hash, u.username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update user ${u.username}: ${err.message}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';
    const result = await conn.query(sql, [username]);
    conn.release();

    console.log(password+pepper);

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);
      if(bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
