"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbService_1 = require("../services/dbService");
const withdrawalEngine_1 = require("../services/withdrawalEngine");
const router = (0, express_1.Router)();
// GET /api/treatments - Get all treatments history
router.get('/treatments', (_req, res) => {
    res.json({
        status: 'success',
        data: dbService_1.db.treatments,
    });
});
// POST /api/treatments - Record new medicine treatment & trigger withdrawal engine
router.post('/treatments', (req, res) => {
    try {
        const { animal_id, medicine_id, dose, dose_unit, route, frequency, duration, start_date, indication, product_affected, veterinarian_id, notes } = req.body;
        if (!animal_id || !medicine_id || !dose || !duration || !start_date) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required treatment fields: animal_id, medicine_id, dose, duration, and start_date are required.',
            });
        }
        const result = (0, withdrawalEngine_1.processTreatmentAndCalculateWithdrawal)({
            animal_id,
            medicine_id,
            dose: Number(dose),
            dose_unit: dose_unit || 'mg/kg',
            route: route || 'Injection',
            frequency: frequency || 'Once Daily',
            duration: Number(duration),
            start_date,
            indication,
            product_affected: product_affected || 'milk',
            veterinarian_id,
            notes,
        });
        res.status(201).json({
            status: 'success',
            message: 'Treatment recorded and withdrawal period calculated.',
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            status: 'error',
            message: error.message || 'Failed to record treatment.',
        });
    }
});
exports.default = router;
