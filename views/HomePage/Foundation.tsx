import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Container from 'components/Container';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.jpg',
    title: 'Founder & inventor.',
    description: 'C kusuma',
    name: 'Lead engineer', // Add the name property
  },
  {
    imageUrl: '/grid-icons/asset-1.jpg',
    title: 'Co-Founder & inventor.',
    description: 'C kusuma',
    name: 'Head engineer', // Add the name property
  },
  {
    imageUrl: '/grid-icons/asset-1.jpg',
    title: 'Co-Founder & inventor.',
    description: 'C kusuma',
    name: 'Vp operation', // Add the name property
  },
];

export default function Features() {
  return (
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.title} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}


const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 30rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
