import Content from '@/components/Content';
import Header from '@/components/Header';
import { media } from '@/components/theme';
import Wrapper, { body } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';
import styled from 'styled-components';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Home({ packages, header, content, content2 }) {
  return (
    <>
      <Header {...header} />
      <Layout>
        <main>
          <Content>{content}</Content>
        </main>
        <Grid className="packages">
          {packages.map(({ _key, title, content, more }) => (
            <StyledPackage key={_key}>
              <h3>{title}</h3>
              {more && (
                <>
                  <a className="more" id={`${title}-more`} style={{ cursor: 'pointer' }}>
                    <AiOutlineInfoCircle />
                  </a>
                  <Tooltip anchorSelect={`#${title}-more`} style={{ maxWidth: '300px' }}>
                    <Content>{more}</Content>
                  </Tooltip>
                </>
              )}
              <Content className="package-content">{content}</Content>
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
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-template-rows: 40px auto;
  h3 {
    color: ${({ theme }) => theme.orange};
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  .more {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
  .package-content {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
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
        },
        more[] {
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
