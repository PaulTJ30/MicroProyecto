"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Acceso denegado: No eres administrador' });
    }
};
exports.isAdmin = isAdmin;
