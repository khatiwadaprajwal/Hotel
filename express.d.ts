import { UserInstance } from './model/usermodel'; // Adjust the import path according to your project structure

declare global {
  namespace Express {
    interface Request {
      auth_user?: UserInstance;
    }
  }
}
