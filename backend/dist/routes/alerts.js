"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbService_1 = require("../services/dbService");
const router = (0, express_1.Router)();
// GET /api/alerts - Get all warnings & alerts
router.get('/alerts', (_req, res) => {
    res.json({
        status: 'success',
        data: dbService_1.db.alerts,
    });
});
// PATCH /api/alerts/:id - Mark an alert as resolved
router.patch('/alerts/:id', (req, res) => {
    const { id } = req.params;
    const alert = dbService_1.db.alerts.find((a) => a.id === id);
    if (!alert) {
        return res.status(404).json({ status: 'error', message: 'Alert not found' });
    }
    alert.status = 'resolved';
    res.json({
        status: 'success',
        data: alert,
    });
});
exports.default = router;
