import Link from 'next/link';
import styled from 'styled-components';
import { format } from 'date-fns';
import { media } from './theme';
import { urlFor } from '@/lib/client';

export default function Posts({ posts }) {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Posts</h2>
      <PostsSection className="posts">
        <SideBackground className="posts-list-background" />
        <ul className="posts-list">
          {posts.map(({ _id, slug, publishedAt, title, author, mainImage }) => {
            const src = mainImage ? urlFor(mainImage).height(300).url() : null;
            return (
              <li className="post" key={_id}>
                <Link className="post__link" href={`/post/${slug.current}`}>
                  <div className="post__info">
                    {publishedAt && <span className="date">{format(new Date(publishedAt), 'MM.dd.yy')}</span>}
                    <h3>{title}</h3>
                    {author && <span className="author">by {author.name}</span>}
                  </div>
                  <div className="side">
                    {mainImage && (
                      <img
                        className="post__image"
                        src={src}
                        alt={mainImage.alt}
                        // fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                        // placeholder="blur"
                        // blurDataURL={mainImage.asset.metadata.lqip}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="more">
          <Link href="/blog">More Posts</Link>
        </div>
      </PostsSection>
    </>
  );
}

const SideBackground = styled.div`
  ${media.break`
    width: 40%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.orange};
  `}
`;

const PostsSection = styled.section`
  padding: 0 40px;

  position: relative;
  width: 100%;
  h2,
  .more {
    width: 1000px;
    max-width: 100%;
    margin: 20px auto;
  }
  .posts-list {
    list-style: none;
    width: 1000px;
    max-width: 100%;
    margin: 20px auto;
    padding: 0;
    ${media.break`
      position: relative;

      .side {
        flex: 0 0 50%;
        order: 2;
        position: relative;
        height: 300px;
      }
    `}
  }
  .post {
    border-bottom: 2px solid ${({ theme }) => theme.orange};
    margin-bottom: 2rem;
    &__link {
      display: flex;
      text-decoration: none;
      color: ${({ theme }) => theme.dark};
      flex-direction: column;
    }
    &__info {
      order: 2;
    }
    &__image {
      /* display: block; */
      margin: 0 auto;
    }
    ${media.break`
      border: 0;
      &__link {
        align-items: center;
        min-height: 200px;
        flex-direction: row;
      }
      &__info {
        flex: 0 0 50%;
        order: 1;
        padding-right: 1rem;
      }
      &__image {
        /* display: initial; */
        margin: 0;
        height: 300px;
        /* width: auto; */
      }
    `}

    .side {
      order: 1;
    }
  }
`;
