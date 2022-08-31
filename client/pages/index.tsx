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
  chakra,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  ModalBody,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/Header';
import useEmailAddresses, { addEmailAddress } from '../data/emailAddresses';
import useAuth from '../data/useAuth';
import EmailListItem from '../components/EmailListItem';
import { CheckIcon } from '@chakra-ui/icons';
import emailjs from '@emailjs/browser';

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      }
    });
  }, [router]);

  const { auth } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [emailText, setEmailText] = useState('');
  const [newEmailAddress, setNewEmailAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentEmailRecepient, setCurrentEmailRecepient] = useState('');
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);

  const { emailAddresses, mutate } = useEmailAddresses();

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function sendEmail(e) {
    e.preventDefault();

    for await (const doc of emailAddresses) {
      onOpen();
      setEmailSentSuccessfully(false);
      setLoading(true);
      const { email } = doc;
      setCurrentEmailRecepient(email);
      const templateParams = {
        to_email: email,
        subject: subject,
        message: emailText,
      };

      const res = await emailjs.send(
        // @ts-ignore
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY,
      );
      console.log(res);
      if (res.text === 'OK') {
        setEmailSentSuccessfully(true);
      }
      setLoading(false);
      await wait(1000);
      onClose();
    }
    toast({
      status: 'success',
      description: 'emails sent to your mailing list',
    });
  }

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
                      key={emailListItem.email}
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
          <chakra.form onSubmit={sendEmail}>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                mb="2"
              />
            </FormControl>

            <Textarea
              w="full"
              p="4"
              lineHeight={6}
              minH="60vh"
              value={emailText}
              name="message"
              onChange={(e) => {
                setEmailText(e.target.value);
              }}
              placeholder="Please enter the email body here. The email will be sent to all the emails from your mailing list on the left. You may edit, add or delete items from your mailing list as you wish"
              size="sm"
            />
            <Button mt={2} type="submit">
              Send
            </Button>
          </chakra.form>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent px="4" py={12}>
          <ModalBody>
            <Stack
              spacing={8}
              flex-direction="column"
              justify="center"
              align="center"
              w="full"
            >
              {!emailSentSuccessfully ? (
                <Heading fontSize="lg" m={2}>
                  Sending email to {currentEmailRecepient}
                </Heading>
              ) : null}

              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : null}

              {emailSentSuccessfully ? (
                <Heading fontSize="xl" m={2}>
                  <CheckIcon boxSize="10" mr="2" color="green" />
                  Email sent successfully to {currentEmailRecepient}
                </Heading>
              ) : null}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
