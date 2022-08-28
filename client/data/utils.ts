export function getEnvironmentUrl() {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://callypso.herokuapp.com/'
      : 'http://localhost:8080/';

  return url;
}
