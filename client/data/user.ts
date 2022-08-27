import firebase from 'firebase';

export async function createUser(user: firebase.User) {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://callypso.herokuapp.com/'
        : 'http://localhost:8080/';

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
