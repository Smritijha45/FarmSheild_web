"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_js_1 = require("./middleware/cors.js");
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security & Utility Middlewares
app.use((0, helmet_1.default)());
app.use(cors_js_1.corsMiddleware);
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root Welcome Endpoint
app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to FarmSheild Backend API Server',
        healthCheck: '/api/health',
        documentation: '/api/v1/info',
    });
});
// API Routes
app.use('/api', index_js_1.default);
// Error Handling
app.use(errorHandler_js_1.notFoundHandler);
app.use(errorHandler_js_1.errorHandler);
// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 FarmSheild Express API Server running on port ${PORT}`);
        console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health`);
    });
}
exports.default = app;
