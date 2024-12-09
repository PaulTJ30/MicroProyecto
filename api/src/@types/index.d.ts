import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: {
        ID: String;
        name: string,
        lastNames: String,
        email: String,
        password: String,
        rol: 'admin' | 'user' | String

    };
}
