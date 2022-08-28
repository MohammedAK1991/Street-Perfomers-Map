import useAuth from './useAuth';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { getEnvironmentUrl, fetcherWithBearerToken } from './utils';
import firebase from 'firebase/app';

interface EmailAddress {
  id: string;
  email: string;
}

export default function useEmailAddresses(): {
  emailAddresses: EmailAddress[];
  loading: boolean;
  error: Error;
  mutate: () => Promise<any>;
} {
  const { auth } = useAuth();
  const [token, setToken] = useState('');

  const url = getEnvironmentUrl();

  useEffect(() => {
    if (!auth) return;

    auth
      .getIdToken()
      .then((res) => setToken(res))
      .catch((err) => console.log(err));
  }, [auth]);
  const { data, error, mutate } = useSWR(
    auth && token ? [`${url}emails/${auth.uid}`, token] : null,
    fetcherWithBearerToken,
    {
      errorRetryCount: 3,
      revalidateOnFocus: false,
    },
  );

  return {
    emailAddresses: data ? data : [],
    loading: !error && !data,
    error,
    mutate,
  };
}

export async function addEmailAddress(
  auth: firebase.User | null,
  emailAddress: string,
) {
  try {
    const token = await auth?.getIdToken();
    const url = getEnvironmentUrl();
    await fetch(`${url}emails/${auth?.uid}`, {
      method: 'POST',
      body: JSON.stringify({ emailAddress }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('error adding email address to user doc', error);
  }
}

export async function deleteEmailAddress(
  auth: firebase.User,
  emailAddress: string,
) {
  try {
    const token = await auth.getIdToken();
    const url = getEnvironmentUrl();
    await fetch(`${url}emails/${auth.uid}`, {
      method: 'DELETE',
      body: JSON.stringify({ emailAddress }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('error deleting emailAddress from user doc', error);
  }
}
