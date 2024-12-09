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
exports.getDashboardStats = void 0;
const UserModel_js_1 = __importDefault(require("../models/UserModel.js"));
const Task_js_1 = __importDefault(require("../models/Task.js"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield UserModel_js_1.default.countDocuments();
        const totalTasks = yield Task_js_1.default.countDocuments();
        res.json({ totalUsers, totalTasks });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
});
exports.getDashboardStats = getDashboardStats;
