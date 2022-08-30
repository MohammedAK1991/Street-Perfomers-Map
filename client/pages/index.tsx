import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Flex,
  Stack,
  Box,
  Heading,
  Textarea,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/Header';
import useEmailAddresses, { addEmailAddress } from '../data/emailAddresses';
import useAuth from '../data/useAuth';
import EmailListItem from '../components/EmailListItem';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      }
    });
  }, [router]);

  const { auth } = useAuth();

  const [emailText, setEmailText] = useState('');
  const [newEmailAddress, setNewEmailAddress] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setEmailText(inputValue);
  }

  const { emailAddresses, mutate } = useEmailAddresses();

  return (
    <Box h="100vh" w="100vw" bg="white" display="flex" flexDirection="column">
      <Head>
        <title>Calllypso coding assignemt</title>
        <meta name="description" content="Calllypso coding assignemt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex flexGrow={1}>
        <Stack mr={10} p={['2', '8']}>
          <Heading fontSize="2xl">Contacts</Heading>

          <Stack pt={4} spacing={4}>
            <InputGroup minWidth="350px">
              <Input
                value={newEmailAddress}
                onChange={(e) => {
                  setNewEmailAddress(e.target.value);
                }}
                placeholder="foo@bar.com"
                w="full"
              />
              <InputRightElement>
                <Button
                  px="8"
                  size="md"
                  onClick={async () => {
                    await addEmailAddress(auth, newEmailAddress);
                    mutate();
                    setNewEmailAddress('');
                  }}
                >
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
            {emailAddresses
              ? emailAddresses.map((emailListItem) => {
                  return (
                    <EmailListItem
                      key={emailListItem.id}
                      emailListItem={emailListItem}
                    />
                  );
                })
              : null}
          </Stack>
        </Stack>

        <Divider height="100%" orientation="vertical" />

        <Box flexGrow={1} p={['2', '8']}>
          <Heading fontSize="2xl" mb="6">
            Enter the body of the email below :
          </Heading>
          <Textarea
            w="full"
            p="4"
            lineHeight={6}
            minH="60vh"
            value={emailText}
            onChange={handleInputChange}
            placeholder="Please enter the email body here. The email will be sent to all the emails from your mailing list on the left. You may edit, add or delete items from your mailing list as you wish"
            size="sm"
          />
        </Box>
      </Flex>
    </Box>
  );
}
