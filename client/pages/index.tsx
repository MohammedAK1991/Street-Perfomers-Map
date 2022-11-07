import { useEffect } from 'react';
import Head from 'next/head';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/Header';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <Box h='100vh' w='100vw' bg='white' display='flex' flexDirection='column'>
      <Head>
        <title>Street Perfomers Map </title>
        <meta name='description' content='Calllypso coding assignemt' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Heading mx='auto' my='auto'>
        Welcome to the Street Performers Map!
      </Heading>
    </Box>
  );
}
