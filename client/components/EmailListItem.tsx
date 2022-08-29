import { useState } from 'react';
import { InputGroup, InputRightElement, Input, Button } from '@chakra-ui/react';
import useEmailAddresses, {
  deleteEmailAddress,
  editEmailAddress,
} from '../data/emailAddresses';
import useAuth from '../data/useAuth';

interface EmailListItemProps {
  id: string;
  email: string;
}

export default function EmailListItem({
  emailListItem,
}: {
  emailListItem: EmailListItemProps;
}) {
  const { auth } = useAuth();
  const [newEmailAddress, setNewEmailAddress] = useState(emailListItem.email);
  const { mutate } = useEmailAddresses();

  return (
    <InputGroup key={emailListItem.id} width="auto">
      <Input
        key={emailListItem.id}
        value={newEmailAddress}
        onChange={(e) => {
          setNewEmailAddress(e.target.value);
        }}
      />
      <InputRightElement>
        <Button
          px="8"
          size="md"
          onClick={async () => {
            await editEmailAddress(auth, emailListItem.id, newEmailAddress);
            mutate();
          }}
        >
          Edit
        </Button>
        <Button
          px="8"
          color="white"
          bg="red"
          size="md"
          onClick={async () => {
            await deleteEmailAddress(auth, emailListItem.email);
            mutate();
          }}
        >
          Delete
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
