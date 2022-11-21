import {
  Tabs,
  TabList,
  Tab,
  Heading,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

const LandingPageTabs = () => {
  const router = useRouter();
  return (
    <>
      <Tabs
        isFitted
        variant='line'
        height='500px'
        width='500px'
        bg='white'
        borderRadius='20px'
        p='3'
      >
        <TabList mb='1em' height='100px'>
          <Tab>
            <Heading size='md'>Artists</Heading>
          </Tab>
          <Tab>
            <Heading size='md'>Music Lovers</Heading>
          </Tab>
          <Tab>
            <Heading size='md'>Events</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexGrow={1} direction='column'>
              <Stack spacing='30px'>
                <Heading>
                  Post your Peformance on the App and Make Money!
                </Heading>
                <Text>Yes without a doubt you will be making Money!</Text>
                <Flex>
                  <Button
                    onClick={() => router.push('/artists')}
                    variant='primary'
                    size='lg'
                    color='white'
                    bg='black'
                  >
                    Make Money
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexGrow={1} direction='column'>
              <Stack spacing='30px'>
                <Heading>Browse for all the perfomrances in your Area </Heading>
                <Text>Support them by donating to them</Text>
                <Flex>
                  <Button variant='primary' size='lg' color='white' bg='black'>
                    Browse
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexGrow={1} direction='column'>
              <Stack spacing='30px'>
                <Heading>
                  Post your Events on the App and invite artists !
                </Heading>
                <Text>Yes without a doubt you will be making Money!</Text>
                <Flex>
                  <Button variant='primary' size='lg' color='white' bg='black'>
                    Create Events
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default LandingPageTabs;
