import useSWR from 'swr';
import { getEnvironmentUrl, fetcherWithoutBearerToken } from './utils';

interface performances {
  creatorID: string;
  performance: string;
  performanceTime: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export function useAllPerformances(): {
  allPerformances: performances[];
  loading: boolean;
  error: Error;
  mutate: () => Promise<any>;
} {
  // const { auth } = useAuth();
  // const [token, setToken] = useState('');

  const url = getEnvironmentUrl();

  // useEffect(() => {
  //   if (!auth) return;

  //   auth
  //     .getIdToken()
  //     .then((res) => setToken(res))
  //     .catch((err) => console.log(err));
  // }, [auth]);

  // // `${url}performances/${auth?.uid}`,

  const { data, error, mutate } = useSWR(
    url + 'allPerformances',
    fetcherWithoutBearerToken,
    {
      errorRetryCount: 3,
      revalidateOnFocus: false,
    },
    // auth && token ? [`${url}performances/${auth.uid}`, token] : null,
    // fetcherWithBearerToken,
    // {
    //   errorRetryCount: 3,
    //   revalidateOnFocus: false,
    // },
  );
  return {
    allPerformances: data ? data : [],
    loading: !error && !data,
    error,
    mutate,
  };
}
