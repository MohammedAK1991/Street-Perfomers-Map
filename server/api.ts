import express from 'express';

const router = express.Router();

import emailAddresses from './routes/emailAddresses';

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the callypso backend');
});

// Build routes
router.use('/', emailAddresses);


export default router;
