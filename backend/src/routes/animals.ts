import { Router, Request, Response } from 'express';
import { db, addAnimal, updateAnimal } from '../services/dbService';

const router = Router();

// GET /api/animals - Get all registered animals
router.get('/animals', async (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: db.animals,
  });
});

// GET /api/animals/:id - Get full animal profile & treatment history
router.get('/animals/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = db.animals.find((a) => a.id === id || a.animal_code.toLowerCase() === id.toLowerCase());

  if (!animal) {
    return res.status(404).json({ status: 'error', message: 'Animal not found' });
  }

  // Treatments for this animal
  const treatments = db.treatments
    .filter((t) => t.animal_id === animal.id)
    .map((t) => {
      const med = db.medicines.find((m) => m.id === t.medicine_id);
      return {
        ...t,
        medicine_name: med?.name || 'Antimicrobial Medicine',
        active_ingredient: med?.active_ingredient || 'Active Ingredient',
      };
    });

  // Active withdrawals for milk and meat
  const now = new Date();
  const activeWithdrawals = db.withdrawals.filter(
    (w) => w.animal_id === animal.id && w.status === 'active' && new Date(w.end_date) > now
  );

  const milkWithdrawal = activeWithdrawals.find((w) => w.product === 'milk' || w.product === 'all');
  const meatWithdrawal = activeWithdrawals.find((w) => w.product === 'meat' || w.product === 'all');

  const getStatusBadge = (w: typeof milkWithdrawal) => {
    if (!w) return '🟢 CLEARED';
    if (!w.end_date) return '🟡 REVIEW REQUIRED';
    return '🔴 WITHDRAWAL ACTIVE';
  };

  const currentTreatment = treatments.length > 0 ? treatments[0] : null;

  res.json({
    status: 'success',
    data: {
      animal,
      milkStatus: getStatusBadge(milkWithdrawal),
      meatStatus: getStatusBadge(meatWithdrawal),
      withdrawalStatus: activeWithdrawals.length > 0 ? '🔴 WITHDRAWAL ACTIVE' : '🟢 CLEARED',
      safeMilkDate: milkWithdrawal ? milkWithdrawal.end_date : new Date().toISOString(),
      safeMeatDate: meatWithdrawal ? meatWithdrawal.end_date : new Date().toISOString(),
      currentTreatment,
      treatmentHistory: treatments,
    },
  });
});

// GET /api/animals/qr/:qrToken - Privacy-Safe QR Animal Safety Profile Lookup
router.get('/animals/qr/:qrToken', (req: Request, res: Response) => {
  const { qrToken } = req.params;
  const animal = db.animals.find(
    (a) => a.qr_token.toLowerCase() === qrToken.toLowerCase() || a.animal_code.toLowerCase() === qrToken.toLowerCase()
  );

  if (!animal) {
    return res.status(404).json({
      status: 'error',
      message: `No animal found for QR token '${qrToken}'`,
    });
  }

  const now = new Date();
  const activeWithdrawals = db.withdrawals.filter(
    (w) => w.animal_id === animal.id && w.status === 'active' && new Date(w.end_date) > now
  );

  const milkWithdrawal = activeWithdrawals.find((w) => w.product === 'milk' || w.product === 'all');
  const meatWithdrawal = activeWithdrawals.find((w) => w.product === 'meat' || w.product === 'all');

  const milkStatus = !milkWithdrawal ? '🟢 CLEARED' : '🔴 WITHDRAWAL ACTIVE';
  const meatStatus = !meatWithdrawal ? '🟢 CLEARED' : '🔴 WITHDRAWAL ACTIVE';
  const overallStatus = activeWithdrawals.length > 0 ? '🔴 WITHDRAWAL ACTIVE' : '🟢 CLEARED';

  // Privacy-safe response: NO private owner names, phone numbers, or clinical notes exposed
  res.json({
    status: 'success',
    data: {
      animalCode: animal.animal_code,
      species: animal.species,
      breed: animal.breed,
      healthStatus: animal.health_status,
      milkStatus,
      meatStatus,
      withdrawalStatus: overallStatus,
      isMilkSafe: !milkWithdrawal,
      isMeatSafe: !meatWithdrawal,
      safeDate: milkWithdrawal ? milkWithdrawal.end_date : new Date().toISOString(),
      jurisdiction: 'FSSAI Regulatory Compliance',
    },
  });
});

// POST /api/animals - Register a new animal
router.post('/animals', async (req: Request, res: Response) => {
  try {
    const { animal_code, species, breed, dob, sex, weight, purpose, notes } = req.body;

    if (!animal_code || !species || !weight) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required animal fields: animal_code, species, and weight are required.',
      });
    }

    const qrToken = `QR-${animal_code.toUpperCase().replace(/\s+/g, '-')}`;

    const newAnimal = await addAnimal({
      farm_id: 'farm1',
      animal_code,
      species,
      breed: breed || 'Indigenous',
      dob: dob || new Date(Date.now() - 365 * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sex: sex || 'female',
      weight: Number(weight),
      purpose: purpose || 'milk',
      health_status: 'healthy',
      notes: notes || '',
      qr_token: qrToken,
    });

    res.status(201).json({
      status: 'success',
      data: newAnimal,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// PUT /api/animals/:id - Edit animal details
router.put('/animals/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { animal_code, species, breed, dob, sex, weight, purpose, health_status, notes } = req.body;

    const updated = await updateAnimal(id, {
      ...(animal_code ? { animal_code } : {}),
      ...(species ? { species } : {}),
      ...(breed ? { breed } : {}),
      ...(dob ? { dob } : {}),
      ...(sex ? { sex } : {}),
      ...(weight ? { weight: Number(weight) } : {}),
      ...(purpose ? { purpose } : {}),
      ...(health_status ? { health_status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Animal not found' });
    }

    res.json({
      status: 'success',
      data: updated,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
