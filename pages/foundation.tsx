import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import YoutubeVideo from 'components/YoutubeVideo';
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

export default function FeaturesPage() {
  return (
    <Page title="Founder's vision" description="As concerned members of a community deeply invested in the rapid advancement of quantum computing, we have devoted ourselves to making a meaningful contribution by developing post-quantum security solutions for the global community. Our vision is to safeguard the world against potential threats posed by the progress of quantum computers.">
      <Wrapper>
        <SectionTitle>Check out this quick introduction</SectionTitle>
        <YoutubeVideo url="https://www.youtube.com/watch?v=BggrpKfqh1c" />
        <CustomAutofitGrid>
          {FEATURES.map((singleFeature, idx) => (
            <BasicCard key={singleFeature.title} {...singleFeature} />
          ))}
        </CustomAutofitGrid>
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 0rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
