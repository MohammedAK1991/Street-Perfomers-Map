import express, { Request, Response } from 'express';
const router = express.Router();
import firebase from 'firebase-admin';

import firestore from '../data/firebase';

router.get(
  '/emails/:uid',
  async (req: express.Request, res: express.Response) => {
    try {
      if (!req.params.uid) {
        res.status(400).send(Error('Bad Request'));
        return;
      }
      const doc = await firestore.collection('users').doc(req.params.uid).get();

      if (!doc.exists) {
        res.status(404).send(Error('User Not Found'));
        return;
      }

      const emails = doc.data().emails;

      res.status(200).send(emails);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
);

router.post(
  '/emails/:uid',
  async (req: express.Request, res: express.Response) => {
    try {
      const { emailAddress } = req.body;

      const doc = await firestore.collection('users').doc(req.params.uid).get();

      if (!doc.exists) {
        res.status(404).send(new Error('User document does not exist'));
        return;
      }

      await firestore
        .collection('users')
        .doc(req.params.uid)
        .update({
          emails: firebase.firestore.FieldValue.arrayUnion(emailAddress),
        });

      res.status(200).send('OK');
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
);

router.delete('/emails/:uid', async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const { emailAddress } = req.body;

    const doc = await firestore.collection('users').doc(uid).get();

    if (!doc.exists) {
      res.status(404).send(Error('User Not Found'));
      return;
    }

    await firestore
      .collection('users')
      .doc(req.params.uid)
      .update({
        emails: firebase.firestore.FieldValue.arrayRemove(emailAddress),
      });
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
