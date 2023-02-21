import Content from '@/components/Content';
import Header from '@/components/Header';
import { media } from '@/components/theme';
import Wrapper, { body } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';
import styled from 'styled-components';

export default function Home({ packages, header, content, content2 }) {
  return (
    <>
      <Header {...header} />
      <Layout>
        <main>
          <Content>{content}</Content>
        </main>
        <Grid className="packages">
          {packages.map(({ _key, title, content }) => (
            <StyledPackage key={_key}>
              <h3>{title}</h3>
              <Content>{content}</Content>
            </StyledPackage>
          ))}
        </Grid>
        <Content>{content2}</Content>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 1000px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  main {
    font-weight: bold;
    color: ${({ theme }) => theme.dark};
    padding: 0 40px;
    margin: 20px 0;
  }
`;

const StyledPackage = styled.div`
  border: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 10px;
  h3 {
    color: ${({ theme }) => theme.orange};
  }
`;

const Grid = styled.div`
  ${media.break`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  `}
`;

export async function getStaticProps() {
  const data = await client.fetch(groq`
    *[_id == 'publicHealthMarketing'][0] {
      header {
        heading,
        subheading,
        body[] {
          ${body}
        }
      },
      packages[] {
        _key,
        title,
        content[] {
          ${body}
        }
      },
      content[] {
        ${body}
      },
      content2[] {
        ${body}
      }
    }
  `);
  return {
    props: data,
  };
}
