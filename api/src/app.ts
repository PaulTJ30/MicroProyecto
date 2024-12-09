import express, { Application, Request, Response } from "express";
import cors from "cors"
import { registerUser, loginUser } from "./controllers/UserController";
import { getTasks, createTask, updateTask, deleteTask, getTasksByID, getMetrics } from './controllers/TaskController';
import { getDashboardStats } from "./controllers/Dashboard";
import { isAdmin } from "./middlewares/authMiddleware";
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

app.post('/Task/create', createTask);
app.get('/Task/get', getTasks);
app.put('/Task/update/:ID', updateTask);
app.delete('/Task/delete/:ID', deleteTask);
app.get('/Task/get/:ID', getTasksByID)


app.post('/register', registerUser);
app.post('/login', loginUser);

app.get('/Dashboard/stats', getDashboardStats)


export default app;