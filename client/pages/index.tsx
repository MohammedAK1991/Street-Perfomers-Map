import React, { useEffect, useState, useCallback } from 'react';
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
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  ModalBody,
  IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/Header';
import useEmailAddresses, { addEmailAddress } from '../data/emailAddresses';
import { getEmailBody, updateEmailBody } from '../data/emailBody';
import useAuth from '../data/useAuth';
import EmailListItem from '../components/EmailListItem';
import { CheckIcon } from '@chakra-ui/icons';
import emailjs from '@emailjs/browser';
import { Autosave, useAutosave } from 'react-autosave';
import { getEnvironmentUrl, wait } from '../data/utils';
import { AddIcon } from '@chakra-ui/icons';

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

  const url = getEnvironmentUrl();

  const updateBody = useCallback(
    (emailText: string) => updateEmailBody(emailText),
    [],
  );

  useEffect(() => {
    getEmailBody()
      .then((res) => {
        setEmailText(res.body);
      })
      .catch((e) => {
        console.log('error getting email body from databsee', e);
        setEmailText('');
      });
  }, [auth, url]);

  useAutosave({ data: emailText, onSave: updateBody });

  const {
    emailAddresses,
    loading: loadingEmailAddresses,
    error,
    mutate,
  } = useEmailAddresses();

  if (error) {
    console.log('error getting email addresseses');
  }

  console.log(
    process.env.NEXT_PUBLIC_SERVICE_ID,
    process.env.NEXT_PUBLIC_TEMPLATE_ID,
    process.env.NEXT_PUBLIC_PUBLIC_KEY,
  );

  const sendEmail = useCallback(
    async (e: { preventDefault: () => void }) => {
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
    },
    [emailAddresses, emailText, onClose, onOpen, subject, toast],
  );

  return (
    <Box h="100vh" w="100vw" bg="white" display="flex" flexDirection="column">
      <Head>
        <title>Calllypso coding assignemt</title>
        <meta name="description" content="Calllypso coding assignemt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex flexGrow={1}>
        <Stack mr={10} p={['2', '7']}>
          <Heading fontSize="xl">To</Heading>

          <Stack pt={2} spacing={4}>
            <InputGroup w="full">
              <Input
                value={newEmailAddress}
                onChange={(e) => {
                  setNewEmailAddress(e.target.value);
                }}
                placeholder="foo@bar.com"
                w="full"
              />
              <InputRightElement>
                <IconButton
                  px="8"
                  size="md"
                  aria-label="edit email"
                  onClick={async () => {
                    await addEmailAddress(auth, newEmailAddress);
                    mutate();
                    setNewEmailAddress('');
                  }}
                  icon={<AddIcon color="blue.500" />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>

          {loadingEmailAddresses ? (
            <Spinner
              thickness="4px"
              speed="0.85s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          ) : null}

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

        <Divider height="100%" orientation="vertical" />

        <Box flexGrow={1} p={['2', '8']}>
          <chakra.form onSubmit={sendEmail}>
            <Input
              type="text"
              value={subject}
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              mb="2"
            />

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
            <Autosave data={emailText} onSave={updateBody} />

            <Button mt={2} type="submit">
              Send
            </Button>
          </chakra.form>
        </Box>
      </Flex>
      {/* Modal to show progress of emails being sent to contact list*/}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent px="4" py={8}>
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
