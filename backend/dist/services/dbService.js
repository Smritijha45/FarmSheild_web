"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimal = exports.addAnimal = exports.getAnimals = exports.db = void 0;
const supabase_1 = require("../config/supabase");
// Initial Demo Seed Data matching schema.sql
const demoMedicines = [
    { id: 'm1', name: 'Amoxicillin Inj', active_ingredient: 'Amoxicillin', antimicrobial_class: 'Penicillins', strength: '150 mg/ml', status: 'active' },
    { id: 'm2', name: 'Oxytetracycline LA', active_ingredient: 'Oxytetracycline', antimicrobial_class: 'Tetracyclines', strength: '200 mg/ml', status: 'active' },
    { id: 'm3', name: 'Tylosin 200', active_ingredient: 'Tylosin', antimicrobial_class: 'Macrolides', strength: '200 mg/ml', status: 'active' },
    { id: 'm4', name: 'Enrofloxacin 10%', active_ingredient: 'Enrofloxacin', antimicrobial_class: 'Fluoroquinolones', strength: '100 mg/ml', status: 'active' },
];
const demoRules = [
    { id: 'r1', medicine_id: 'm1', species: 'cow', product: 'milk', mrl: '4 ug/kg', withdrawal_days: 5, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
    { id: 'r2', medicine_id: 'm1', species: 'cow', product: 'meat', mrl: '50 ug/kg', withdrawal_days: 14, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
    { id: 'r3', medicine_id: 'm1', species: 'buffalo', product: 'milk', mrl: '4 ug/kg', withdrawal_days: 5, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
    { id: 'r4', medicine_id: 'm2', species: 'cow', product: 'milk', mrl: '100 ug/kg', withdrawal_days: 7, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
    { id: 'r5', medicine_id: 'm2', species: 'cow', product: 'meat', mrl: '200 ug/kg', withdrawal_days: 28, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
    { id: 'r6', medicine_id: 'm3', species: 'cow', product: 'milk', mrl: '50 ug/kg', withdrawal_days: 4, jurisdiction: 'India (FSSAI)', approval_status: 'approved' },
];
const demoAnimals = [
    {
        id: 'a101',
        farm_id: 'farm1',
        animal_code: 'COW-101',
        species: 'cow',
        breed: 'Gir',
        dob: '2022-03-15',
        sex: 'female',
        weight: 380,
        purpose: 'milk',
        health_status: 'healthy',
        notes: 'High yielding Gir breed cow',
        qr_token: 'QR-COW-101',
        created_at: new Date().toISOString(),
    },
    {
        id: 'a102',
        farm_id: 'farm1',
        animal_code: 'COW-102',
        species: 'cow',
        breed: 'HF Cross',
        dob: '2021-08-10',
        sex: 'female',
        weight: 430,
        purpose: 'milk',
        health_status: 'under_treatment',
        notes: 'Currently being treated for Mastitis',
        qr_token: 'QR-COW-102',
        created_at: new Date().toISOString(),
    },
    {
        id: 'a103',
        farm_id: 'farm1',
        animal_code: 'BUF-201',
        species: 'buffalo',
        breed: 'Murrah',
        dob: '2020-05-20',
        sex: 'female',
        weight: 510,
        purpose: 'milk',
        health_status: 'healthy',
        notes: 'Murrah buffalo - healthy milk producer',
        qr_token: 'QR-BUF-201',
        created_at: new Date().toISOString(),
    },
];
// Calculate seed withdrawal for COW-102 ending 4 days from now
const seedEndDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
const demoTreatments = [
    {
        id: 't1',
        animal_id: 'a102',
        medicine_id: 'm1',
        veterinarian_id: 'vet1',
        dose: 10,
        dose_unit: 'mg/kg',
        route: 'Injection',
        frequency: 'Once Daily',
        duration: 3,
        start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        indication: 'Mastitis',
        product_affected: 'milk',
        notes: 'Mild mastitis infection treated with Amoxicillin',
        created_at: new Date().toISOString(),
    },
];
const demoWithdrawals = [
    {
        id: 'w1',
        treatment_id: 't1',
        animal_id: 'a102',
        product: 'milk',
        start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: seedEndDate,
        status: 'active',
        withdrawal_days: 5,
    },
];
const demoAlerts = [
    {
        id: 'alt1',
        farm_id: 'farm1',
        animal_id: 'a102',
        type: 'critical',
        severity: 'high',
        message: 'COW-102 is under active withdrawal. Do not sell milk until safe date.',
        message_hi: 'गाय (COW-102) का दवा का असर चालू है। दूध अभी न बेचें।',
        status: 'active',
        created_at: new Date().toISOString(),
    },
];
// Data Store Accessors
exports.db = {
    animals: demoAnimals,
    medicines: demoMedicines,
    rules: demoRules,
    treatments: demoTreatments,
    withdrawals: demoWithdrawals,
    alerts: demoAlerts,
};
const getAnimals = async () => {
    if ((0, supabase_1.isSupabaseConfigured)()) {
        const client = (0, supabase_1.getSupabaseClient)();
        if (client) {
            const { data, error } = await client.from('animals').select('*');
            if (!error && data)
                return data;
        }
    }
    return exports.db.animals;
};
exports.getAnimals = getAnimals;
const addAnimal = async (animal) => {
    const newAnimal = {
        ...animal,
        id: `a_${Date.now()}`,
        created_at: new Date().toISOString(),
    };
    if ((0, supabase_1.isSupabaseConfigured)()) {
        const client = (0, supabase_1.getSupabaseClient)();
        if (client) {
            const { data, error } = await client.from('animals').insert([newAnimal]).select().single();
            if (!error && data)
                return data;
        }
    }
    exports.db.animals.unshift(newAnimal);
    return newAnimal;
};
exports.addAnimal = addAnimal;
const updateAnimal = async (id, updates) => {
    const index = exports.db.animals.findIndex((a) => a.id === id);
    if (index === -1)
        return null;
    exports.db.animals[index] = { ...exports.db.animals[index], ...updates };
    if ((0, supabase_1.isSupabaseConfigured)()) {
        const client = (0, supabase_1.getSupabaseClient)();
        if (client) {
            const { data } = await client.from('animals').update(updates).eq('id', id).select().single();
            if (data)
                return data;
        }
    }
    return exports.db.animals[index];
};
exports.updateAnimal = updateAnimal;
