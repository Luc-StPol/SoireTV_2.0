
import { Pool } from 'mysql'

//Declare superGlobal type

export {}

declare global {
  namespace Express {
    interface Request {
      db: Pool;
    }
  }
}

