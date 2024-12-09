import { Request, Response, NextFunction } from 'express';


import { AuthenticatedRequest } from '../@types';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

}
    export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user && req.user.rol === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado: No eres administrador' });
        }
    };

