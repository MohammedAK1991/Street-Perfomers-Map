import {
  Button,
  Center,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/common/Header';
import {
  addPerformance,
  deletePerformance,
  editPerformance,
  usePerformances,
} from '../data/performances';
import useAuth from '../data/useAuth';

const ArtistsPage = () => {
  const { auth } = useAuth();

  const [performanceTitle, setPerformanceTitle] = useState<string>('');
  const [performanceTime, setPerformanceTime] = useState<string>('');
  const [editPerformanceID, setEditPerformanceID] = useState<string>('');
  const [editPerformanceTitle, setEditPerformanceTitle] = useState<string>('');
  const [editPerformanceTime, setEditPerformanceTime] = useState<string>('');

  const { performances, loading, error, mutate } = usePerformances();
  console.log('data', performances);
  console.log('error', error);

  return (
    <>
      <Flex bgColor='white' flexGrow={1} direction='column'>
        <Head>
          <title>Street Perfomers Map </title>
          <meta name='description' content='Street Perfomers Map' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Heading textAlign='center' mt='100px'>
          Probably a Modal that opens when we add a marker to the map <br></br>
          Enter Details of your Performance Artists!
        </Heading>
        <Center my='auto'>
          <chakra.form
            gap='4'
            onSubmit={async (event) => {
              event.preventDefault();
              await addPerformance(auth, performanceTitle, performanceTime);
              mutate();
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
          </chakra.form>
        </Center>
        <hr style={{ marginTop: '30px' }} />
        <Heading textAlign='center' mt='100px'>
          Probably a Modal that opens when we edit a marker to the map <br></br>
          Enter edits of your Performance Artists!
        </Heading>
        <Center my='auto'>
          <chakra.form
            gap='4'
            display='flex'
            alignSelf='stretch'
            flexDirection='column'
            onSubmit={async (event) => {
              console.log('clicked');
              event.preventDefault();
              await editPerformance(
                auth,
                editPerformanceTitle,
                editPerformanceTime,
                editPerformanceID,
              );
              mutate();
            }}
          >
            <FormControl rounded='md'>
              <FormLabel>enter Performance ID</FormLabel>
              <Input
                minW='300px'
                alignSelf='stretch'
                type='text'
                value={editPerformanceID}
                onChange={(event) => setEditPerformanceID(event.target.value)}
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
                onChange={(event) => setEditPerformanceTime(event.target.value)}
                variant='outline'
                size='lg'
                isRequired
                autoComplete='true'
                _focus={{ borderColor: 'secondary' }}
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
          </chakra.form>
        </Center>
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
                await deletePerformance(auth, item.id);
                mutate();
              }}
            >
              Delete
            </Button>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
export default ArtistsPage;
