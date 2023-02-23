import { urlFor } from '@/lib/client';
import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import { media } from '../theme';

export default function PostListItem({ title, mainImage, slug, publishedAt, author }) {
  const src = mainImage ? urlFor(mainImage).height(300).url() : null;
  return (
    <StyledPostItem className="post">
      <Link href={`/post/${slug.current}`} className="post__link">
        <div className="post__info">
          {publishedAt && <span className="date">{format(new Date(publishedAt), 'MM.dd.yy')}</span>}
          <h2 className="post__title">{title}</h2>
          <span className="author">by {author.name}</span>
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
    </StyledPostItem>
  );
}

const StyledPostItem = styled.li`
  border-bottom: 2px solid ${({ theme }) => theme.orange};
  margin-bottom: 2rem;
  .post {
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
  }
  ${media.break`
    border: 0;
    .post {
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
    }
  `}

  .side {
    order: 1;
  }
`;
