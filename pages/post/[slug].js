// import Meta from '@/components/Meta';
import Post from '@/components/Post';
import Wrapper, { body, site } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';

export default function post({ post, site }) {
  return (
    // <Meta title={post.title} seo={post.seoSettings} />
    <Post {...post} />
  );
}

export async function getStaticPaths() {
  const cats = await client.fetch(groq`
    *[_id == 'publicHealthMarketing'][0].postCategory[]->_id
  `);

  const postRefs = cats.join(',');

  const data = await client.fetch(
    groq`
    *[_type == 'post' && count((categories[]->_id)[@ in [$posts]]) > 0][] {
      _id,
      slug
    }
  `,
    { posts: postRefs }
  );

  return {
    paths: data.map(post => ({
      params: {
        id: post._id,
        slug: post.slug.current,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await client.fetch(
    groq`
    {
      "post": *[_type == "post" && slug.current == $slug][0] {
        title,
        publishedAt,
        body[] {
          ${body}
        },
        author->{ 
          name,
          bio[] {
            ${body}
          },
          image {
            ...,
            asset->{
              url,
              metadata {
                dimensions {
                  ...
                },
                lqip
              }
            }
          }
        },
        mainImage {
          ...,
          asset->{
            url,
            metadata {
              dimensions {
                ...
              },
              lqip
            }
          }
        },
        seoSettings
      }
    }
  `,
    { slug: context.params.slug }
  );

  return {
    props: {
      ...data,
    },
  };
}
