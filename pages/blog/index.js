import BlogPage from '@/components/Blog/BlogPage';

import Wrapper, { body } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';

export default function blog({ blogPage, posts, site, page, numPages }) {
  return (
    // <Meta title={blogPage.title} seo={blogPage.seoSettings} />
    <BlogPage {...blogPage} posts={posts} numPages={numPages} currentPage={page} />
  );
}

export async function getStaticProps() {
  const cats = await client.fetch(groq`
    *[_id == 'publicHealthMarketing'][0].postCategory[]->_id
  `);

  const catRefs = cats.join(',');

  const count = await client.fetch(
    groq`
      count(*[_type == 'post' && count((categories[]->_id)[@ in [$cats]]) > 0])
    `,
    { cats: catRefs }
  );

  const perPage = 3;
  const start = 0;
  const end = start + perPage;

  const posts = await client.fetch(
    groq`
    *[_type == 'post' && count((categories[]->_id)[@ in [$cats]]) > 0] | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      slug,
      publishedAt,
      body[] {
        ${body}
      },
      categories[]->{ _id, slug, title },
      mainImage {
        ...,
        asset->{ 
          url,
          metadata {
            lqip
          }
        }
      },
      author-> { name }
    }
  `,
    { start, end, cats: catRefs }
  );

  const numPages = Math.ceil(count / perPage);

  return {
    props: {
      posts,
      page: 1,
      numPages,
      page: 1,
    },
  };
}
