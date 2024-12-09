"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserController_1 = require("./controllers/UserController");
const TaskController_1 = require("./controllers/TaskController");
const Dashboard_1 = require("./controllers/Dashboard");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
    res.send("Hola desde mi servidor con TS");
});
app.post('/Task/create', TaskController_1.createTask);
app.get('/Task/get', TaskController_1.getTasks);
app.put('/Tasl:id', TaskController_1.updateTask);
app.delete('/Task:id', TaskController_1.deleteTask);
app.post('/register', UserController_1.registerUser);
app.post('/login', UserController_1.loginUser);
app.get('/Dashboard/stats', authMiddleware_1.isAdmin, Dashboard_1.getDashboardStats);
exports.default = app;
