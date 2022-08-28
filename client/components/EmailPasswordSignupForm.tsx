import React, { useCallback, useState } from 'react';
import {
  Button,
  VStack,
  chakra,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FaEye } from 'react-icons/fa';
import { IoIosPerson } from 'react-icons/io';

export default function EmailPasswordSignUpForm({
  handleEmailSignUp,
}: {
  handleEmailSignUp: (name: string, email: string, password: string) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNameInputChange = useCallback(
    (ev: { currentTarget: { value: React.SetStateAction<string> } }) =>
      setName(ev.currentTarget.value),
    [],
  );
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
  const handleConfirmPasswordInputChange = useCallback(
    (ev: { currentTarget: { value: React.SetStateAction<string> } }) =>
      setConfirmPassword(ev.currentTarget.value),
    [],
  );
  const handleShowPasswordClick = useCallback(
    () => setShowPassword((prevValue) => !prevValue),
    [],
  );

  const handleEmailPasswordSignUpSubmit = useCallback(
    (ev: { preventDefault: () => void }) => {
      ev.preventDefault();
      handleEmailSignUp(name, email, password);
    },
    [name, email, password],
  );

  return (
    <chakra.form onSubmit={handleEmailPasswordSignUpSubmit}>
      <VStack minW="360px" align="center" spacing="6">
        <FormControl id="name" rounded="md">
          <InputGroup>
            <InputLeftElement mt="1" pointerEvents="none">
              <Icon as={IoIosPerson} color="black" />
            </InputLeftElement>
            <Input
              type="text"
              value={name}
              bgColor="white"
              onChange={handleNameInputChange}
              variant="outline"
              placeholder={'name'}
              size="lg"
              isRequired
              _focus={{
                borderColor: 'secondary',
              }}
              _placeholder={{
                color: 'onSurfaceVariant',
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" rounded="md">
          <InputGroup>
            <InputLeftElement mt="1" pointerEvents="none">
              <EmailIcon color="black" />
            </InputLeftElement>

            <Input
              type="text"
              value={email}
              bgColor="white"
              onChange={handleEmailInputChange}
              variant="outline"
              placeholder={'email'}
              size="lg"
              isRequired
              _focus={{
                borderColor: 'secondary',
              }}
              _placeholder={{
                color: 'onSurfaceVariant',
              }}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="password" rounded="md">
          <InputGroup mb="4">
            <InputLeftElement mt="1" pointerEvents="none">
              <LockIcon color="black" />
            </InputLeftElement>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordInputChange}
              variant="outline"
              bgColor="white"
              placeholder={'password'}
              size="lg"
              autoComplete="true"
              isRequired
              _focus={{
                borderColor: 'secondary',
              }}
              _placeholder={{
                color: 'onSurfaceVariant',
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

        <FormControl id="confirmPassword" rounded="md">
          <InputGroup>
            <InputLeftElement mt="1" pointerEvents="none">
              <LockIcon color="black" />
            </InputLeftElement>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordInputChange}
              variant="outline"
              bgColor="white"
              placeholder={'repeat password'}
              size="lg"
              autoComplete="true"
              py={5}
              px={4}
              isRequired
              _placeholder={{
                color: 'onSurfaceVariant',
              }}
            />
            <InputRightElement cursor="pointer">
              <Icon
                as={FaEye}
                color="black"
                onClick={handleShowPasswordClick}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          disabled={
            !email ||
            !name ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
          alignSelf="stretch"
          size="lg"
          type="submit"
          bgColor="#f4a261"
          onClick={handleEmailPasswordSignUpSubmit}
          color="black"
        >
          sign up
        </Button>
      </VStack>
    </chakra.form>
  );
}
