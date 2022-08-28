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
