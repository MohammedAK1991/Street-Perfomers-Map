import express from 'express';
const router = express.Router();
import firestore from '../data/firebase';

router.post('/users', async (req: express.Request, res: express.Response) => {
  try {
    const { uid, email, name } = req.body;

    const doc = await firestore.collection('users').doc(uid).get();

    if (doc.exists) {
      res.status(409).send(new Error('User document already exists.'));
      return;
    }

    await firestore.collection('users').doc(uid).set({
      email,
      name,
    });

    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
