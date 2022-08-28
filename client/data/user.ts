import firebase from 'firebase';
import { getEnvironmentUrl } from './utils';

export async function createUser(user: firebase.User, token: string) {
  try {
    const url = getEnvironmentUrl();
    await fetch(`${url}users`, {
      method: 'POST',
      body: JSON.stringify({
        uid: user.uid,
        email: user?.email,
        name: user?.displayName,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('error creating user doc in firestore');
  }
}
