import admin from 'firebase-admin';

import serviceAccount  from '../.secret/serviceAccountKey.json'

const app = admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://callypso-c1252.firebaseio.com',
});

export const firestore = app.firestore();

export default firestore;