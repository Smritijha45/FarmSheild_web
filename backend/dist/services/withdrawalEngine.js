"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTreatmentAndCalculateWithdrawal = void 0;
const dbService_1 = require("./dbService");
const processTreatmentAndCalculateWithdrawal = (input) => {
    const animal = dbService_1.db.animals.find((a) => a.id === input.animal_id);
    if (!animal) {
        throw new Error(`Animal with ID ${input.animal_id} not found`);
    }
    const medicine = dbService_1.db.medicines.find((m) => m.id === input.medicine_id);
    if (!medicine) {
        throw new Error(`Medicine with ID ${input.medicine_id} not found`);
    }
    // Calculate Treatment End Date
    const startDate = new Date(input.start_date);
    const treatmentEndDate = new Date(startDate.getTime() + input.duration * 24 * 60 * 60 * 1000);
    // Find matching FSSAI Regulatory Rule
    const rule = dbService_1.db.rules.find((r) => r.medicine_id === input.medicine_id &&
        r.species.toLowerCase() === animal.species.toLowerCase() &&
        r.product.toLowerCase() === input.product_affected.toLowerCase());
    const ruleFound = Boolean(rule);
    const withdrawalDays = rule ? rule.withdrawal_days : 7; // Fallback safety 7 days if unknown
    // Calculate Safe Sell Date: Treatment End Date + Withdrawal Days
    const safeDate = new Date(treatmentEndDate.getTime() + withdrawalDays * 24 * 60 * 60 * 1000);
    const safeDateISO = safeDate.toISOString();
    // Create Treatment Record
    const newTreatment = {
        id: `t_${Date.now()}`,
        animal_id: input.animal_id,
        medicine_id: input.medicine_id,
        veterinarian_id: input.veterinarian_id || 'vet_default',
        dose: input.dose,
        dose_unit: input.dose_unit,
        route: input.route,
        frequency: input.frequency,
        duration: input.duration,
        start_date: startDate.toISOString(),
        end_date: treatmentEndDate.toISOString(),
        indication: input.indication || 'Routine Treatment',
        product_affected: input.product_affected,
        notes: input.notes,
        created_at: new Date().toISOString(),
    };
    dbService_1.db.treatments.unshift(newTreatment);
    // Create Withdrawal Record
    const newWithdrawal = {
        id: `w_${Date.now()}`,
        treatment_id: newTreatment.id,
        animal_id: input.animal_id,
        product: input.product_affected,
        start_date: startDate.toISOString(),
        end_date: safeDateISO,
        status: 'active',
        withdrawal_days: withdrawalDays,
    };
    dbService_1.db.withdrawals.unshift(newWithdrawal);
    // Update Animal Status
    animal.health_status = 'under_treatment';
    // Format Dates for Spoken Messages
    const formattedSafeDate = safeDate.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    const messageEn = `🔴 DON'T SELL ${input.product_affected.toUpperCase()} TODAY from ${animal.animal_code}. Safe to sell after ${safeDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}.`;
    const messageHi = `🔴 ${animal.animal_code} का ${input.product_affected === 'milk' ? 'दूध' : 'मांस'} अभी न बेचें। ${formattedSafeDate} के बाद बेचना सुरक्षित है।`;
    // Create Alert Record
    const newAlert = {
        id: `alt_${Date.now()}`,
        farm_id: animal.farm_id,
        animal_id: animal.id,
        type: ruleFound ? 'critical' : 'warning',
        severity: 'high',
        message: messageEn,
        message_hi: messageHi,
        status: 'active',
        created_at: new Date().toISOString(),
    };
    dbService_1.db.alerts.unshift(newAlert);
    return {
        treatment: newTreatment,
        withdrawal: newWithdrawal,
        alert: newAlert,
        ruleApplied: {
            ruleFound,
            withdrawalDays,
            mrl: rule ? rule.mrl : 'Review Required',
            jurisdiction: rule ? rule.jurisdiction : 'India (FSSAI)',
        },
        safeDateISO,
        messageEn,
        messageHi,
    };
};
exports.processTreatmentAndCalculateWithdrawal = processTreatmentAndCalculateWithdrawal;
