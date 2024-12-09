import User from '../models/UserModel';
import Task from '../models/Task';
import { Request, Response } from 'express';

export const getDashboardStats = async (req: Request, res: Response): Promise<any> => {
    try {
        const totalUsers = await User.find({ rol: "user" }).countDocuments();
        const totalTasks = await Task.countDocuments();

        return res.json({ totalUsers, totalTasks });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
};
