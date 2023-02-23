import Content from '@/components/Content';
import Header from '@/components/Header';
import { media } from '@/components/theme';
import Wrapper, { body } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';
import styled from 'styled-components';

import MoreInfo from '@/components/MoreInfo';
import Posts from '@/components/Posts';

export default function Home({ packages, header, content, content2, posts }) {
  // console.log(posts);
  return (
    <>
      <Header {...header} />
      <Layout>
        <main>
          <Content>{content}</Content>
        </main>
        <Grid className="packages">
          {packages.map(props => (
            <StyledPackage key={props._key}>
              <h3>{props.title}</h3>
              {props.more && <MoreInfo {...props} />}
              <Content className="package-content">{props.content}</Content>
            </StyledPackage>
          ))}
        </Grid>
        <Content className="custom">{content2}</Content>
        {posts && <Posts posts={posts} />}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  main {
    width: 1000px;
    max-width: 100%;
    margin: 20px auto;
    font-weight: bold;
    color: ${({ theme }) => theme.dark};
    padding: 0 40px;
  }
  .custom {
    width: 1000px;
    max-width: 100%;
    margin: 20px auto;
  }
`;

const StyledPackage = styled.div`
  border: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 35px;
  grid-template-rows: auto auto;
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
  width: 1000px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  display: grid;
  gap: 15px;
  ${media.break`
    padding: 0;
    margin: 4rem auto 2rem;
    grid-template-columns: repeat(3, 1fr);
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
      },
      postCategory[]->{
        _id
      }
    }
  `);

  const postRefs = data.postCategory.map(({ _id }) => _id).join(',');

  const posts = await client.fetch(
    groq`
    *[_type == 'post' && count((categories[]->_id)[@ in [$posts]]) > 0] | order(publishedAt desc) [0...3] {
      title,
      slug,
      _id,
      publishedAt,
      mainImage {
        ...,
        asset->{...}
      },
      author->{
        name
      }
    }
  `,
    { posts: postRefs }
  );

  return {
    props: { ...data, posts },
  };
}
