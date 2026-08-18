"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_1 = __importDefault(require("./health"));
const animals_1 = __importDefault(require("./animals"));
const treatments_1 = __importDefault(require("./treatments"));
const withdrawals_1 = __importDefault(require("./withdrawals"));
const alerts_1 = __importDefault(require("./alerts"));
const amu_1 = __importDefault(require("./amu"));
const medicines_1 = __importDefault(require("./medicines"));
const router = (0, express_1.Router)();
// Health Check
router.use('/', health_1.default);
// REST API Modular Mounts
router.use('/', animals_1.default);
router.use('/', treatments_1.default);
router.use('/', withdrawals_1.default);
router.use('/', alerts_1.default);
router.use('/', amu_1.default);
router.use('/', medicines_1.default);
exports.default = router;
