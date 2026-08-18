"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_js_1 = require("../config/supabase.js");
const router = (0, express_1.Router)();
/**
 * @route GET /api/health
 * @desc System diagnostic health check (Express API status + Supabase DB status)
 * @access Public
 */
router.get('/health', async (_req, res) => {
    const supabaseConfigured = (0, supabase_js_1.isSupabaseConfigured)();
    const supabaseConnection = await (0, supabase_js_1.testSupabaseConnection)();
    const isHealthy = true; // Express backend is operational
    res.status(200).json({
        status: 'online',
        appName: 'FarmSheild Backend API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        services: {
            expressApi: {
                status: 'healthy',
                uptimeSeconds: Math.floor(process.uptime()),
            },
            supabase: {
                configured: supabaseConfigured,
                connected: supabaseConnection.connected,
                message: supabaseConnection.message,
                details: supabaseConnection.details,
            },
        },
    });
});
exports.default = router;
