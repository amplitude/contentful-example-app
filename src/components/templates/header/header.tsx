import {
  Box,
  BoxProps,
  Flex,
  Text,
  Switch,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { ExperimentContext } from '@src/components/shared/ExperimentProvider';

export const HEADER_HEIGHT = 70;

export const Header = (props: BoxProps) => {
  const { t } = useTranslation();
  const { demoExperimentMode, setDemoExperimentMode, setExperimentVariant } =
    useContext(ExperimentContext);

  return (
    <Flex
      as="nav"
      align="center"
      pl={{ base: 16, md: 32, lg: 32 }}
      pr={{ base: 16, md: 32, lg: 32 }}
      height={`${HEADER_HEIGHT}px`}
      zIndex="2"
      gap={24}
      {...props}>
      <Box
        mt={{ base: 2, md: 2, lg: 2 }}
        mb={{ base: 2, md: 2, lg: 2 }}
        display={{ base: 'none', md: 'block' }}
        w="144px">
        <Link href="/" title={t('common.homepage')}>
          <Image
            src={
              'https://amplistore.wpengine.com/wp-content/themes/amplistore-dist/assets/images/amplitude-logo-white.jpg'
            }
            width="144"
            height="38"
          />
        </Link>
      </Box>

      <Box css={{ paddingRight: '24px', borderRight: '1px solid white', height: '50px' }}>
        <Box css={{ paddingTop: '12px' }}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="demo-experiment" mb="0" color="white">
              Demo Experiment:
            </FormLabel>
            <Switch
              id="demo-experiment"
              colorScheme="green"
              onChange={() => {
                setDemoExperimentMode(!demoExperimentMode);
              }}
            />
          </FormControl>
        </Box>
      </Box>

      <Box>
        <RadioGroup
          defaultValue="control"
          color="white"
          onChange={event => {
            console.log('event', event);
            setExperimentVariant(event);
          }}>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="treatment">
              Treatment
            </Radio>
            <Radio colorScheme="green" value="control">
              Control
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Flex>
  );
};
