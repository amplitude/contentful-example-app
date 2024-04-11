import { Box, Grid, GridItem, Heading, Button, Text } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, useContext } from 'react';

import { CtfImage } from '../contentful/ctf-image';

import { ExperimentContext } from '@src/components/shared/ExperimentProvider';
import { experiment } from '@src/components/templates/layout';
import { Nav } from '@src/components/templates/nav';
import { Hero, PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

const StyledGridItem = styled(GridItem)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    max-height: 60vh;
  }
`;

export const HeroBanner = ({
  // Tutorial: contentful-and-the-starter-template.md
  // Uncomment the line below to make the Greeting field available to render
  heroBanner,
  sys: { id: entryId },
}: PageLandingFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });
  const { demoExperimentMode, experimentVariant, userId } = useContext(ExperimentContext);
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const matchExperimentData = async () => {
      await experiment.fetch({
        user_id: userId,
      });

      const variant = experiment.variant(heroBanner?.experimentId ?? 'control');
      let resolvedVariant;
      if (heroBanner && variant.value) {
        const variation = heroBanner.meta[variant.value];
        resolvedVariant = heroBanner.variantsCollection?.items.find(hero => {
          return hero?.__typename === 'Hero' && hero?.sys.id === variation;
        });
        setHero(resolvedVariant);
      }
    };
    matchExperimentData();
  }, [heroBanner, userId]);

  return (
    <Grid
      position="relative"
      gridRow={3}
      gridColumn={1}
      templateAreas={`"header header"
                      "nav nav"
                      "hero hero"
                      "content content"`}
      {...inspectorProps({ fieldId: 'heroBannerImage' })}>
      <GridItem area={'nav'}>
        <Nav />
      </GridItem>
      {hero && (
        <StyledGridItem area={'hero'} zIndex={0}>
          {hero.image && hero.image.url && <CtfImage {...hero.image} />}
          <Box css={{ position: 'absolute', top: '50%', left: '20%' }}>
            <Box css={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Text>{hero?.preHeadline}</Text>
            </Box>
            <Box css={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <Heading as="h1">{hero?.headline}</Heading>
            </Box>
            <Box css={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Text>{hero?.description}</Text>
            </Box>
            <Box css={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Button colorScheme="green" size="lg">
                {hero?.cta}
              </Button>
            </Box>
          </Box>
        </StyledGridItem>
      )}
    </Grid>
  );
};
