import { Response, Request } from "express";
import User, { IUser } from "../models/UserModel"
import jwt from "jsonwebtoken"
import { AuthenticatedRequest } from "../@types";
export const registerUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const rol = req.body.rol

        if (req.user?.rol === "admin" && rol === "user") {
            res.status(400).json({ msg: "Los amisnistradores no pueden crear clientes" })
            return
        }
        if (!name || !email || !password || !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear un usuario"
            })
            return
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ msg: "El correo ya esta registrado" })
            return
        }
        const user = await User.create({
            name,
            email,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify(user), "shhhh")

        res.status(200).json({ msg: 'Usuario registrado con exito', token })
    } catch (error) {
        res.status(500).json({ msg: "Ocurrio un error al registrar el usuario" })
    }

}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Usuario sin registrar" })
        }
        const token = jwt.sign(JSON.stringify(user), "shhhh")
        return res.status(200).json({ msg: `Inicio de sesión exitoso ${(user.name)}`, token, user });

    } catch (error) {
        return res.status(500).json({ msg: `No se pudo iniciar sesion` });

    }
}

