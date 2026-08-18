"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSupabaseConnection = exports.getSupabaseClient = exports.isSupabaseConfigured = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const isSupabaseConfigured = () => {
    return (Boolean(supabaseUrl) &&
        Boolean(supabaseAnonKey) &&
        supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
        supabaseAnonKey !== 'your-supabase-anon-key');
};
exports.isSupabaseConfigured = isSupabaseConfigured;
const getSupabaseClient = () => {
    if (!(0, exports.isSupabaseConfigured)()) {
        return null;
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
};
exports.getSupabaseClient = getSupabaseClient;
const testSupabaseConnection = async () => {
    if (!(0, exports.isSupabaseConfigured)()) {
        return {
            connected: false,
            message: 'Supabase credentials are not configured in environment variables (.env)',
        };
    }
    const client = (0, exports.getSupabaseClient)();
    if (!client) {
        return {
            connected: false,
            message: 'Failed to initialize Supabase client instance',
        };
    }
    try {
        // Attempt a lightweight query to test PostgreSQL database connection
        const { data, error } = await client.from('medicines').select('count', { count: 'exact', head: true });
        if (error) {
            // If table doesn't exist yet or connection error occurs
            return {
                connected: false,
                message: `Supabase database error: ${error.message}`,
                details: error,
            };
        }
        return {
            connected: true,
            message: 'Successfully connected to Supabase PostgreSQL database',
            details: { medicinesCount: data },
        };
    }
    catch (err) {
        const error = err;
        return {
            connected: false,
            message: `Supabase connection attempt failed: ${error.message || 'Unknown network error'}`,
        };
    }
};
exports.testSupabaseConnection = testSupabaseConnection;
