import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Mount Health Check Routes
router.use('/', healthRouter);

// V1 Modular Router Placeholder
const v1Router = Router();

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

export default router;
