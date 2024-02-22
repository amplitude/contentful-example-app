import { Experiment } from '@amplitude/experiment-js-client';
import { Flex, useTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

import { ExperimentProvider } from '@src/components/shared/ExperimentProvider';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const experiment = Experiment.initialize(process.env.NEXT_PUBLIC_AMPLITUDE_EXPERIMENT_CLIENT_KEY || "", {
  debug: true,
});

export const Layout = ({ children }: LayoutPropsInterface) => {
  const router = useRouter();
  const theme = useTheme();

  const isHomePage = router.pathname === '/';

  return (
    <ExperimentProvider>
      <Header
        borderBottom={isHomePage ? '' : '1px'}
        borderColor={isHomePage ? null : theme.f36.gray200}
        backgroundColor={isHomePage ? '#8bbb4c' : 'white'}
      />
      <Flex flexGrow="1" flexDirection="column" width="100%" as="main" pb={{ base: 8, lg: 12 }}>
        {children}
      </Flex>
      <Footer />
    </ExperimentProvider>
  );
};
