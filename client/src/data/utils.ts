export function getEnvironmentUrl() {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://callypso.herokuapp.com/'
      : 'http://localhost:8080/';

  return url;
}

export async function fetcherWithBearerToken(url: string, token: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return response.json();
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
