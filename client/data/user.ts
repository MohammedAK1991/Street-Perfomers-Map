import firebase from 'firebase';

export async function createUser(user: firebase.User) {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? // TODO : enter the production url from heroku for api below
          'http://localhost:8080/'
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
