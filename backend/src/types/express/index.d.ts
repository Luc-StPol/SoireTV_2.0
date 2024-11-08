import { Pool } from 'mysql2'

//Declare superGlobal type

export {}

declare global {
  namespace Express {
    interface Request {
      db: Pool;
    }
  }
}

