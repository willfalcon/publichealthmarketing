import BlogPage from '@/components/Blog/BlogPage';

import Wrapper, { body, site } from '@/components/Wrapper';
import client from '@/lib/client';
import groq from 'groq';

export default function blog({ blogPage, site, posts, numPages, page }) {
  return (
    // <Meta seo={blogPage.seoSettings} title={`${blogPage.title} | Page ${page}`} />
    <BlogPage {...blogPage} posts={posts} numPages={numPages} currentPage={page} />
  );
}

export async function getStaticPaths() {
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
  const numPages = Math.ceil(count / perPage);

  const paths = [...Array(numPages).keys()].map((_, i) => ({
    params: {
      page: `${i + 1}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const page = parseInt(context.params.page);
  // console.log(page);
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
  const start = (page - 1) * perPage;
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
      numPages,
      page,
    },
  };
}
