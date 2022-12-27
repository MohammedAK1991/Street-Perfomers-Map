import {
  Button,
  Center,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import {
  addPerformance,
  deletePerformance,
  editPerformance,
  usePerformances,
} from '../data/performances';
import useAuth from '../data/useAuth';

const ArtistsPage = () => {
  const { auth } = useAuth();
  console.log('authUID', auth?.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [performanceTitle, setPerformanceTitle] = useState<string>('');
  const [performanceTime, setPerformanceTime] = useState<string>('');
  const [performanceLongitude, setPerformanceLongitude] = useState<string>('');
  const [performanceLatitude, setPerformanceLatitude] = useState<string>('');
  const [editPerformanceID, setEditPerformanceID] = useState<string>('');
  const [editPerformanceTitle, setEditPerformanceTitle] = useState<string>('');
  const [editPerformanceTime, setEditPerformanceTime] = useState<string>('');

  const [idPerformancetobeEdited, setIdPerformancetobeEdited] =
    useState<string>('');
  const [namePerformancetobeEdited, setNamePerformancetobeEdited] =
    useState<string>('');
  const [timePerformancetobeEdited, setTimePerformancetobeEdited] =
    useState<string>('');

  const { performances, loading, error, mutate } = usePerformances();
  const [errorTitle, setErrorTitle] = useState<string>('');
  console.log('data', performances);
  console.log('errorhahhaaaa', error);
  if (error) {
    setErrorTitle(error.message);
  }
  return (
    <>
      <Flex bgColor='white' flexGrow={1} direction='column'>
        <Head>
          <title>Street Perfomers Map </title>
          <meta name='description' content='Street Perfomers Map' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Heading textAlign='center' mt='100px' color='surface'>
          Probably a Modal that opens when we add a marker to the map <br></br>
          Enter Details of your Performance Artists!
        </Heading>
        <Center my='auto'>
          <chakra.form
            gap='4'
            color='surface'
            onSubmit={async (event) => {
              event.preventDefault();
              await addPerformance(
                auth,
                performanceTitle,
                performanceTime,
                parseFloat(performanceLatitude),
                parseFloat(performanceLongitude),
              );
              mutate();
              setPerformanceTitle('');
              setPerformanceTime('');
              setPerformanceLatitude('');
              setPerformanceLongitude('');
            }}
            display='flex'
            alignSelf='stretch'
            flexDirection='column'
          >
            <FormControl rounded='md'>
              <FormLabel>Enter Performance Title</FormLabel>
              <Input
                minW='300px'
                alignSelf='stretch'
                type='text'
                value={performanceTitle}
                onChange={(event) => setPerformanceTitle(event.target.value)}
                variant='outline'
                size='lg'
                isRequired
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>
            <FormControl rounded='md'>
              <FormLabel>Enter Performance Time</FormLabel>

              <Input
                minW='300px'
                value={performanceTime}
                onChange={(event) => setPerformanceTime(event.target.value)}
                variant='outline'
                size='lg'
                isRequired
                autoComplete='true'
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>
            <FormControl rounded='md'>
              <FormLabel>Enter Performance Latitude</FormLabel>

              <Input
                minW='300px'
                value={performanceLatitude}
                onChange={(event) => setPerformanceLatitude(event.target.value)}
                variant='outline'
                size='lg'
                isRequired
                autoComplete='true'
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>
            <FormControl rounded='md'>
              <FormLabel>Enter Performance Longitude</FormLabel>

              <Input
                minW='300px'
                value={performanceLongitude}
                onChange={(event) =>
                  setPerformanceLongitude(event.target.value)
                }
                variant='outline'
                size='lg'
                isRequired
                autoComplete='true'
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>

            <Button
              color='white'
              size='lg'
              type='submit'
              pos='relative'
              minW='300px'
              variant='primary'
              bgColor='black'
              isLoading={loading}
            >
              Submit{' '}
            </Button>
            <Text>{errorTitle}</Text>
          </chakra.form>
        </Center>
        <hr style={{ marginTop: '30px' }} />
        <Heading textAlign='center' mt='100px'>
          Probably a Modal that opens when we edit a marker to the map <br></br>
          Enter edits of your Performance Artists!
        </Heading>

        <hr style={{ marginTop: '30px' }} />
        <Text>{error && error.message}</Text>
        {performances?.map((item: any) => (
          <Flex
            direction='column'
            align='center'
            key={item.id}
            border='1px lightgrey solid'
          >
            <Text>{item.id}</Text>
            <Text>{item.performance}</Text>
            <Text>{item.performanceTime}</Text>
            <Button
              onClick={async () => {
                await deletePerformance(auth, item.id, item.performance);
                mutate();
              }}
            >
              Delete
            </Button>

            <Modal key={item.id} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit {idPerformancetobeEdited}</ModalHeader>
                <ModalCloseButton
                  onClick={() => {
                    setIdPerformancetobeEdited('');
                    setNamePerformancetobeEdited('');
                    setTimePerformancetobeEdited('');
                  }}
                />
                <ModalBody key={item.id}>
                  <Center my='auto'>
                    <chakra.form
                      gap='4'
                      display='flex'
                      alignSelf='stretch'
                      flexDirection='column'
                    >
                      <FormControl rounded='md'>
                        <FormLabel>enter Performance ID</FormLabel>
                        <Input
                          minW='300px'
                          alignSelf='stretch'
                          type='text'
                          value={editPerformanceID}
                          onChange={(event) =>
                            setEditPerformanceID(event.target.value)
                          }
                          variant='outline'
                          size='lg'
                          isRequired
                          _focus={{ borderColor: 'secondary' }}
                        />
                      </FormControl>
                      <FormControl rounded='md'>
                        <FormLabel>Edit Performance Title</FormLabel>
                        <Input
                          minW='300px'
                          alignSelf='stretch'
                          type='text'
                          value={editPerformanceTitle}
                          onChange={(event) =>
                            setEditPerformanceTitle(event.target.value)
                          }
                          variant='outline'
                          size='lg'
                          isRequired
                          _focus={{ borderColor: 'secondary' }}
                        />
                      </FormControl>
                      <FormControl rounded='md'>
                        <FormLabel>Edit Performance Time</FormLabel>
                        <Input
                          minW='300px'
                          value={editPerformanceTime}
                          onChange={(event) =>
                            setEditPerformanceTime(event.target.value)
                          }
                          variant='outline'
                          size='lg'
                          isRequired
                          autoComplete='true'
                          _focus={{ borderColor: 'secondary' }}
                        />
                      </FormControl>

                      <Text>{idPerformancetobeEdited}</Text>
                      <Text>{namePerformancetobeEdited}</Text>
                      <Text>{timePerformancetobeEdited}</Text>
                    </chakra.form>
                  </Center>
                </ModalBody>
                <ModalFooter>
                  {/* <Button onClick={onClose} px={10}> */}
                  <Button
                    onClick={() => {
                      setIdPerformancetobeEdited('');
                      setNamePerformancetobeEdited('');
                      setTimePerformancetobeEdited('');
                      onClose();
                    }}
                    px={10}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={async (event) => {
                      console.log('clicked');
                      event.preventDefault();
                      console.log('item name', namePerformancetobeEdited);
                      setIdPerformancetobeEdited(item.id);
                      setNamePerformancetobeEdited(item.performance);
                      setTimePerformancetobeEdited(item.performanceTime);
                      console.log('id', idPerformancetobeEdited);
                      console.log('name', namePerformancetobeEdited);
                      console.log('time', timePerformancetobeEdited);
                      await editPerformance(
                        auth,
                        editPerformanceTitle,
                        editPerformanceTime,
                        editPerformanceID,
                      );
                      mutate().then(() => {
                        setIdPerformancetobeEdited('');
                        setNamePerformancetobeEdited('');
                        setTimePerformancetobeEdited('');
                        onClose();
                      });
                    }}
                    color='white'
                    size='lg'
                    // type='submit'
                    pos='relative'
                    minW='300px'
                    variant='primary'
                    bgColor='black'
                    isLoading={loading}
                  >
                    Edit Performance{' '}
                  </Button>
                  {/* <Button
                    onClick={async () => {
                      await deletePerformance(auth, item.id, item.performance);
                      mutate();
                      onClose();
                    }}
                  >
                    Delete
                  </Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              onClick={() => {
                console.log('clicked ASSS');
                setIdPerformancetobeEdited(item.id);
                setNamePerformancetobeEdited(item.performance);
                setTimePerformancetobeEdited(item.performanceTime);
                onOpen();
              }}
              // onClick={async () => {
              //     await updatePerformance(auth, item.id, item.performance);
              //     mutate();
            >
              edit
            </Button>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
export default ArtistsPage;
