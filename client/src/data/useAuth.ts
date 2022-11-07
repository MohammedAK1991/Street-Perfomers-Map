import {
  useState, useEffect,
} from 'react';
import firebase from './firebase';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Provider hook that creates auth object and handles state
export default function useAuth() {
  const [auth, setAuth] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  async function loginWithEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async function signUpWithEmail(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async function signUpWithGoogle() {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }

  async function signOut() {
    return firebase.auth().signOut().then(() => { console.log('logged out')
    });
  }

  // Subscribe to user on mount ecause this sets state in the callback it will cause any ...
  //  component that utilizes this hook to re-render with the latest auth object.
  useEffect(
    () => {
      const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          setAuth(firebaseUser);
        } else {
          setAuth(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    },
    [],
  );

  return {
    auth,
    loading,
    loginWithEmail,
    signUpWithEmail,
    signOut,
    signUpWithGoogle,
  };
}
