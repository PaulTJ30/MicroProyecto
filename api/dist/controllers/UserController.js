"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastNames, email, password, rol } = req.body;
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ msg: "El correo ya esta registrado" });
            return;
        }
        const newUser = new UserModel_1.default({
            name,
            lastNames,
            email,
            password,
            rol
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign(JSON.stringify(newUser), "shhhh");
        res.status(200).json({ msg: 'Usuario registrado con exito', token });
    }
    catch (error) {
        res.status(500).json({ msg: "Ocurrio un error al registrar el usuario" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Usuario sin registrar" });
        }
        const token = jsonwebtoken_1.default.sign(JSON.stringify(user), "shhhh");
        return res.status(200).json({ msg: `Inicio de sesión exitoso ${(user.name)}`, token, user });
    }
    catch (error) {
        return res.status(500).json({ msg: `No se pudo iniciar sesion` });
    }
});
exports.loginUser = loginUser;
