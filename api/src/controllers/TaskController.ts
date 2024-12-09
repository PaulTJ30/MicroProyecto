import { Request, Response } from "express";
import Tasks from "../models/Task";
import Task from "../models/Task";
import Users from "../models/UserModel"
import { AuthenticatedRequest } from "../@types";
import UserModel from "../models/UserModel";
export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const tasks = await Task.find({ userID: req.user?.ID })
    res.json(tasks)
}
export const getTasksByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ID } = req.params
        const task = await Task.findById(ID)

        if (!task) {
            res.status(404).json({ msg: "Tarea no encontrada" })
            return
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ message: 'Error al obtener la tarea', error });
    }
}

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const newTask = new Task({ ...req.body, userID: req.user?.ID })
    await newTask.save()
    res.json(newTask)
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {

        const { ID } = req.params
        const updatedTask = await Task.findByIdAndUpdate(ID, req.body, { new: true })

        if (!updatedTask) {
            res.status(404).json({ msg: "Tarea no encontrada" })
            return
        }

        res.status(200).json(updateTask)

    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }

}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {

        const { ID } = req.params
        console.log('ID recibido en el backend:', ID);
        const deletedTask = await Task.findByIdAndDelete(ID)
        if (!deletedTask) {
            res.status(404).json({ msg: "Tarea no encontrada" })
            return
        }
        res.status(200).json({ msg: "tarea eliminada" })

    } catch (error) {
        console.error('Error al eliminar la tarea:', error)
        res.status(500).json({ msg: "Error al eliminar la tarea", error })
    }
}

export const getMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
        const numberofUsers = await Users.find({ rol: "user" }).countDocuments();
        const numberOfTasks = await Tasks.find().countDocuments()
        res.status(200).json({ msg: "Datos obtenidos con exito", numberOfTasks, numberofUsers })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Hubo un error al obtener las metricas de la aplicacion" })
        return
    }
}