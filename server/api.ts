import express from 'express';

const router = express.Router();

import emailAddresses from './routes/emailAddresses';
import users from './routes/users';

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the callypso backend');
});

// Build routes
router.use('/', emailAddresses);
router.use('/', users);

export default router;
