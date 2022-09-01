import { useState } from 'react';
import {
  InputGroup,
  IconButton,
  InputRightElement,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import useEmailAddresses, {
  deleteEmailAddress,
  editEmailAddress,
} from '../data/emailAddresses';
import useAuth from '../data/useAuth';
import { EmailIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

export interface EmailListItemProps {
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
    <InputGroup key={emailListItem.id} width="auto" minWidth="360px">
      <InputLeftElement>
        <EmailIcon color="teal" bg="grey.100" />
      </InputLeftElement>
      <Input
        key={emailListItem.id}
        value={newEmailAddress}
        onChange={(e) => {
          setNewEmailAddress(e.target.value);
        }}
      />
      <InputRightElement>
        <IconButton
          size="md"
          aria-label="edit email"
          onClick={async () => {
            await editEmailAddress(auth, emailListItem.id, newEmailAddress);
            mutate();
          }}
          icon={<EditIcon color="orange" />}
        />
        <IconButton
          size="md"
          aria-label="delete email"
          onClick={async () => {
            await deleteEmailAddress(auth, emailListItem.id);
            mutate();
          }}
          icon={<DeleteIcon color="red" />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
