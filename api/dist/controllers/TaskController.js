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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tasks = yield Task_1.default.find({ userID: (_a = req.user) === null || _a === void 0 ? void 0 : _a.ID });
    res.json(tasks);
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newTask = new Task_1.default(Object.assign(Object.assign({}, req.body), { userID: (_a = req.user) === null || _a === void 0 ? void 0 : _a.ID }));
    yield newTask.save();
    res.json(newTask);
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID } = req.params;
    const updateTask = yield Task_1.default.findByIdAndUpdate(ID, req.body, { new: true });
    res.json(updateTask);
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID } = req.params;
    yield Task_1.default.findByIdAndDelete(ID);
    res.json({ msg: "tarea eliminada" });
});
exports.deleteTask = deleteTask;
