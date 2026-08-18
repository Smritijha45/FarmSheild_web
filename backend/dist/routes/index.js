"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_js_1 = __importDefault(require("./health.js"));
const router = (0, express_1.Router)();
// Mount Health Check Routes
router.use('/', health_js_1.default);
// V1 Modular Router Placeholder
const v1Router = (0, express_1.Router)();
v1Router.get('/info', (_req, res) => {
    res.json({
        name: 'FarmSheild REST API',
        version: 'v1',
        description: 'Digital Farm Management & Veterinary Compliance API',
        endpoints: [
            'GET /api/health',
            'GET /api/v1/info'
        ]
    });
});
router.use('/v1', v1Router);
exports.default = router;
