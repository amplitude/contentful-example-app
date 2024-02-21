import { Box, Image, Center, Text, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

const NavLink = ({ imgUrl, title }: { imgUrl: string; title: string }) => {
  return (
    <Box pt={{ base: '4' }} pb={{ base: '4' }} pr={{ base: '2' }} pl={{ base: '2' }}>
      <Flex>
        <Image src={imgUrl} width="34" height="34" />
        <Center css={{ marginLeft: 10 }}>
          <Text>{title}</Text>
        </Center>
      </Flex>
    </Box>
  );
};

export const Nav = () => {
  return (
    <Box pl={{ base: '96' }} pr={{ base: '96' }}>
      <Box padding="20px" css={{ borderBottom: '1px solid #F0F0F0' }}>
        <Center>
          <Image
            src="https://amplistore.wpengine.com/wp-content/uploads/2022/04/logo-header.png"
            width="220"
            height="37"
          />
        </Center>
      </Box>
      <Stack direction="row">
        <NavLink
          imgUrl={'https://amplistore.wpengine.com/wp-content/uploads/2022/04/006-vegetables.png'}
          title="Produce"
        />
        <NavLink
          imgUrl={
            'https://amplistore.wpengine.com/wp-content/uploads/2022/04/005-dairy-products.png'
          }
          title="Dairy"
        />
        <NavLink
          imgUrl={'https://amplistore.wpengine.com/wp-content/uploads/2022/04/008-steak.png'}
          title="Protein"
        />
        <NavLink
          imgUrl={'https://amplistore.wpengine.com/wp-content/uploads/2022/04/026-bread.png'}
          title="Pantry Essentials"
        />
        <NavLink
          imgUrl={
            'https://amplistore.wpengine.com/wp-content/uploads/2022/04/020-cleaning-spray.png'
          }
          title="Home Goods"
        />
      </Stack>
    </Box>
  );
};
