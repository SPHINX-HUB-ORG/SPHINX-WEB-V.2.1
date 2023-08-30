import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Coinomics</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title="Miner rewards"
          description="Miner transistion"
          benefits={['13 years coins distribution', '70% mining block', 'start from 100 SPX rewards per block', '5x halving periods']}
        >
         70%<span> block mining</span>
        </PricingCard>
        <PricingCard
          title="Developer flag"
          description="Developer mining phase"
          benefits={['5 month mining phase', 'reduce 30% energy consumption', '100 SPX rewards per blocks', '20% development','20% treasury','5% promotion','10% contributors']}
          isOutlined
        >
         30%<span> block mining</span>
        </PricingCard>
        <PricingCard
          title="ICO"
          description="Raising fund"
          benefits={[
            '35% SPX',
          ]}
        >
          $-<span>/SPX</span>
        </PricingCard>
      </AutofitGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;
