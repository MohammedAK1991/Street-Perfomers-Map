import React, { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import useAuth from '../data/useAuth';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  Stack,
  chakra,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

export default function Login() {
  const router = useRouter();

  const { loginWithEmail, signUpWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordClick = useCallback(
    () => setShowPassword((prevValue) => !prevValue),
    [],
  );

  const handleSignInWithEmail = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      loginWithEmail(email, password)
        .then((credential) => handleSignIn(credential))
        .catch((err) => {});
    },
    [email, password],
  );

  const handleSignInWithGoogle = useCallback(() => {
    signUpWithGoogle()
      .then((credential) => handleSignIn(credential))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEmailInputChange = useCallback(
    (ev: { currentTarget: { value: React.SetStateAction<string> } }) =>
      setEmail(ev.currentTarget.value),
    [],
  );

  const handlePasswordInputChange = useCallback(
    (ev: { currentTarget: { value: React.SetStateAction<string> } }) =>
      setPassword(ev.currentTarget.value),
    [],
  );

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
          // TODO : function that creates a user documents in users collection in firestore
        }

        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [router],
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
          <Heading mx="auto" fontWeight="700" fontSize="3xl" color="black">
            Login
          </Heading>
        </Flex>

        <Flex direction="row" color="blackwhite">
          <Text fontSize="sm">not a member ?</Text>

          <Link href="/signup" passHref>
            <Text
              fontSize="sm"
              fontWeight="600"
              cursor="pointer"
              textDecoration="underline"
              color="blackwhite"
              ml="2"
            >
              Signup
            </Text>
          </Link>
        </Flex>

        <Stack align="center" spacing="6">
          <Button
            size="lg"
            onClick={handleSignInWithGoogle}
            pos="relative"
            minW="360px"
          >
            <Icon
              w="20px"
              color="black"
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
          <chakra.form
            gap="4"
            onSubmit={handleSignInWithEmail}
            display="flex"
            alignSelf="stretch"
            flexDirection="column"
          >
            <FormControl id="email" rounded="md">
              <InputGroup>
                <InputLeftElement mt="1" pointerEvents="none">
                  <EmailIcon color="black" />
                </InputLeftElement>

                <Input
                  minW="300px"
                  alignSelf="stretch"
                  bg="surface"
                  type="text"
                  value={email}
                  onChange={handleEmailInputChange}
                  variant="outline"
                  placeholder={'johndoe@gmail.com'}
                  size="lg"
                  isRequired
                  _focus={{
                    borderColor: 'secondary',
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password" rounded="md">
              <InputGroup>
                <InputLeftElement mt="1" pointerEvents="none">
                  <LockIcon color="black" />
                </InputLeftElement>
                <Input
                  minW="300px"
                  bg="surface"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordInputChange}
                  variant="outline"
                  placeholder={'password'}
                  size="lg"
                  isRequired
                  autoComplete="true"
                  _focus={{
                    borderColor: 'secondary',
                  }}
                />
                <InputRightElement mt="1" cursor="pointer">
                  <Icon
                    as={FaEye}
                    color="black"
                    onClick={handleShowPasswordClick}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              size="lg"
              type="submit"
              pos="relative"
              minW="300px"
              bgColor="#f4a261"
            >
              <Icon pos="absolute" left="16px" as={EmailIcon} />
              login
            </Button>
          </chakra.form>
        </Stack>
      </Stack>
    </Flex>
  );
}
