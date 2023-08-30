import NextImage from 'next/image';
import styled from 'styled-components';

interface BasicCardProps {
  title: string;
  description: string;
  imageUrl: string;
  name: string;
}

export default function BasicCard({ title, description, imageUrl, name }: BasicCardProps) {
  return (
    <Card>
      <ImageContainer>
        <NextImage src={imageUrl} width={900} height={550} alt={title} />
      </ImageContainer>
      <Title>{title}</Title>
      <div>{name}</div> {/* Replace <Name> with <div> */}
      <Description>
        <DescriptionLink href={`/profile/${encodeURIComponent(description)}`}>
          {description}
        </DescriptionLink>
      </Description>
    </Card>
  );
}

// ... (other styles)

const DescriptionLink = styled.a`
  /* Styling for the clickable description link */
  color: white; /* Initial color */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s; /* Smooth transition effect */

  &:hover {
    color: blue; /* Color on hover */
  }
`;



const Card = styled.div`
  display: flex;
  padding: 2.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  border-radius: 0.6rem;
  color: rgb(var(--text));
  font-size: 1.6rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 500px; /* Adjust this value to control the maximum width */
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Description = styled.div`
  opacity: 0.6;
`;