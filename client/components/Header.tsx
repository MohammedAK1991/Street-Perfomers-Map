/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import useAuth from '../data/useAuth';

export default function Header() {
  const router = useRouter();

  const HEADER_HEIGHT = '72px';

  const { auth, loading, signOut } = useAuth();

  const handleOnSignOutClick = useCallback(() => {
    signOut()
      .then(() => router.push('/login'))
      .catch();
  }, [router, signOut]);

  return (
    <Flex
      zIndex={999}
      width="100%"
      height={HEADER_HEIGHT}
      bgColor="#2a9d8f"
      borderWidth="1px"
      borderBottomColor="surfaceVariant"
      align="center"
      direction="row"
      p={['1', '4']}
    >
      <Link href="/" passHref>
        <HStack cursor="pointer">
          <Heading as="a" display={['flex']} fontSize="2xl" color="primary">
            Callypso assignment
          </Heading>
        </HStack>
      </Link>

      <Spacer />

      {auth && (
        <Text mx="3" display={['none', 'flex']}>
          {auth?.email}
        </Text>
      )}

      {auth ? (
        <Menu autoSelect={false} size="sm">
          <MenuButton>
            <HStack
              mr="1"
              spacing="2"
              cursor="pointer"
              minW="60px"
              alignItems="center"
            >
              <Avatar
                bg="primary"
                color="surface"
                boxSize="42px"
                size="sm"
                name={auth?.displayName || 'user'}
                src={auth?.photoURL || 'https://via.placeholder.com/150' }
              />
              <ChevronDownIcon boxSize="20px" />
            </HStack>
          </MenuButton>
          <MenuList py="0" bgColor="surface">
            <MenuItem
              _hover={{ bgColor: 'surfaceVariant' }}
              fontFamily="heading"
              fontWeight="400"
              fontSize="sm"
              py="2"
              onClick={handleOnSignOutClick}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : !loading ? (
        <Link href="/login" passHref>
          <Button size="sm" variant="primary" minW="unset">
            Login
          </Button>
        </Link>
      ) : (
        <Skeleton mx="4" opacity={0.5} rounded="lg" w="60px" h="30px" />
      )}
    </Flex>
  );
}
