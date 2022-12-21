import { Flex } from '@chakra-ui/react';
import Header from './Header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex bgColor='surface' direction='column' flexGrow={1} id='root'>
      <Header />
      {children}
    </Flex>
  );
}

export default Layout;
