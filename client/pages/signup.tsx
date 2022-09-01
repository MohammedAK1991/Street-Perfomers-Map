import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../data/useAuth';
import EmailPasswordSignUpForm from '../components/EmailPasswordSignupForm';
import { createUser } from '../data/user';

export default function Signup() {
  const router = useRouter();
  const { signUpWithEmail, signUpWithGoogle } = useAuth();

  const handleSignIn = useCallback(
    async (credential: firebase.auth.UserCredential) => {
      try {
        if (!credential.user) return;
        console.log(`Welcome ${credential.user.email}`);

        // Check for the creation time to see if it's a new user.
        if (
          credential.user.metadata.creationTime ===
          credential.user.metadata.lastSignInTime
        ) {
          await createUser(credential.user, await credential.user.getIdToken());
        }
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [router],
  );

  const handleSignupWithGoogle = useCallback(() => {
    signUpWithGoogle()
      .then((credential) => handleSignIn(credential))
      .catch((err) => {
        console.log(err);
      });
  }, [handleSignIn, signUpWithGoogle]);

  const handleEmailSignUp = useCallback(
    (name: string, email: string, password: string) => {
      signUpWithEmail(email, password)
        .then((firebaseCredential) => {
          firebaseCredential.user?.updateProfile({ displayName: name });
          return firebaseCredential;
        })
        .then((firebaseCredential) => handleSignIn(firebaseCredential))
        .catch((err) => {
          console.log('error creating user with email password', err);
        });
    },
    [handleSignIn, signUpWithEmail],
  );

  return (
    <Flex
      bg="surface"
      flexGrow={1}
      direction="column"
      h="100vh"
      w="100vw"
      bgColor="#2a9d8f"
    >
      <Stack align="center" rounded="md" bg="surface" m="auto" spacing="6">
        <Flex align="center" alignSelf="stretch" direction="row">
          <Heading mx="auto" fontWeight="700" fontSize="3xl">
            Signup
          </Heading>
        </Flex>

        <Flex direction="row">
          <Text fontSize="sm">Already a user ?</Text>

          <Link href="/login" passHref>
            <Text
              fontSize="sm"
              fontWeight="600"
              cursor="pointer"
              textDecoration="underline"
              color="blueAccent"
              ml="2"
            >
              Login
            </Text>
          </Link>
        </Flex>

        <Stack align="center" spacing="6">
          <Button
            size="lg"
            onClick={handleSignupWithGoogle}
            pos="relative"
            minW="360px"
          >
            <Icon
              w="20px"
              color="google"
              pos="absolute"
              left="16px"
              as={FaGoogle}
            />
            Google
          </Button>

          <Flex alignItems="center" alignSelf="stretch">
            <Divider />

            <Text mx="4" whiteSpace="nowrap" fontSize="sm">
              continue with
            </Text>

            <Divider />
          </Flex>
          <EmailPasswordSignUpForm handleEmailSignUp={handleEmailSignUp} />
        </Stack>
      </Stack>
    </Flex>
  );
}
