import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Foundation';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content=" "
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection imageUrl="/demo-illustration-1.gif" title="Post-quantum algorithm." overTitle="Future proof blockchain architecture">
            <p>
            Post-quantum cryptography involves the development and implementation of new cryptographic algorithms that are resistant to attacks from both classical and quantum computers.{' '}
              <Link href="/docs-page.html">The urgency of post-quantum algorithm</Link> The algorithms are designed to withstand against computational power of quantum computers, ensuring the sustainability of blockchain networks.
            </p>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.gif" title="The power of community." overTitle="Secure future decentralized world" reversed>
            <p>
            The mission is to provide user-friendly tools and resources that empower developers, community, and businesses to effortlessly build and deploy applications on the blockchain.{' '}
            </p>
            <ul>
              <li>User-friendly</li>
              <li>Decentralized, secured by communtiy</li>
            </ul>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
