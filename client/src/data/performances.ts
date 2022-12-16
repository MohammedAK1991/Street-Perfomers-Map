import useAuth from './useAuth';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { getEnvironmentUrl, fetcherWithBearerToken } from './utils';
import firebase from 'firebase/app';

interface performances {
  performance: string;
  performanceTime: string;
}

export function usePerformances(): {
  performances: performances[];
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

  // `${url}performances/${auth?.uid}`,

  const { data, error, mutate } = useSWR(
    auth && token ? [`${url}performances/${auth.uid}`, token] : null,
    fetcherWithBearerToken,
    {
      errorRetryCount: 3,
      revalidateOnFocus: false,
    },
  );
  return {
    performances: data ? data : [],
    loading: !error && !data,
    error,
    mutate,
  };
}

export async function addPerformance(
  auth: firebase.User | null,
  performanceTitle: string,
  performanceTime: string,
) {
  try {
    const token = await auth?.getIdToken();
    console.log(token, 'token');
    const url = getEnvironmentUrl();
    await fetch(`${url}performances/${auth?.uid}`, {
      method: 'POST',
      body: JSON.stringify({ performanceTitle, performanceTime }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('error adding performance to user doc', error);
  }
}

export async function editPerformance(
  auth: firebase.User | null,
  editPerformanceTitle: string,
  editPerformanceTime: string,
  // assigna default value to id, later take id from the item.key paramater of a list of performances
  // that is mapped from a get request to all peformances end point absorbed into a state
  id: string,
) {
  try {
    const token = await auth?.getIdToken();
    console.log(token, 'token');
    const url = getEnvironmentUrl();
    await fetch(`${url}performances/${auth?.uid}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        editPerformanceTitle,
        editPerformanceTime,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('error editing performance of the user ', error);
  }
}

export const deletePerformance = async (
  // useCallback(async function deletePerformance(
  auth: firebase.User | null,
  id: string,
) => {
  try {
    const token = await auth?.getIdToken();
    console.log(token, 'token');
    const url = getEnvironmentUrl();
    await fetch(`${url}performances/${auth?.uid}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('error deleting performance of the user ', error);
  }
};
