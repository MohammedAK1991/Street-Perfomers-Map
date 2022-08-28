import firebase from 'firebase';
import { getEnvironmentUrl } from './utils';

export async function createUser(user: firebase.User) {
  try {
    const url = getEnvironmentUrl();
    await fetch(`${url}users`, {
      method: 'POST',
      body: JSON.stringify({
        uid: user.uid,
        email: user?.email,
        name: user?.displayName,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {}
  console.log('error creating user doc in firestore');
}
