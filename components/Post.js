import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import Heading from './Heading';
import Content from './Content';

// import NewsletterButton from './NewsletterButton';

import { media, grid } from './theme';
import { format } from 'date-fns';
// import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/client';

const Post = ({ body, mainImage, title, author, publishedAt, categories }) => {
  const imageWidth = 800;
  const aspect = mainImage?.asset.metadata?.dimensions.aspectRatio;
  const imageHeight = imageWidth / aspect;

  const authorWidth = 300;
  const authorAspect = author.image?.asset.metadata?.dimensions.aspectRatio;
  const authorHeight = authorWidth / authorAspect;

  const src = mainImage ? urlFor(mainImage).width(800).url() : null;
  const authorSrc = author.image ? urlFor(author.image).width(300).url() : null;

  return (
    <Article className="single-post">
      {mainImage && (
        <img
          src={src}
          alt={mainImage.alt ? mainImage.alt : title}
          className="single-post__image"
          // width={imageWidth}
          // height={imageHeight}
          // placeholder="blur"
          // blurDataURL={mainImage.asset.metadata.lqip}
        />
      )}
      {publishedAt && <span className="date">{format(new Date(publishedAt), 'MM.dd.yy')}</span>}
      <Heading>{title}</Heading>
      <Content>{body}</Content>
      <AuthorBio className="author">
        {author.image && (
          <img
            className="author__image"
            src={authorSrc}
            alt={author.name}
            // width={authorWidth}
            // height={authorHeight}
            // placeholder="blur"
            // blurDataURL={author.image.asset.metadata.lqip}
          />
        )}
        <h3 className="author__name">{author.name}</h3>
        {author.bio && <Content className="author__bio">{author.bio}</Content>}
      </AuthorBio>
    </Article>
  );
};

const Categories = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 5rem;
  .post-categories__heading {
    flex: 100%;
  }
  .category {
    text-decoration: none;
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.offWhite};
    padding: 0 1.5rem;
    border-radius: 10rem;
    /* font-family: ${({ theme }) => theme.font.heading}; */
    font-weight: ${({ theme }) => theme.font.bold};
    margin-right: 1rem;
  }
`;

const Article = styled.article`
  padding: 1rem;
  width: 800px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  ${media.break`
    padding-top: 10rem;
  `}
  .date {
    display: block;
    margin-top: 3rem;
  }
  h1 {
    line-height: 1.25;
    margin-bottom: 3rem;
  }
`;

const AuthorBio = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  background: ${({ theme }) => rgba(theme.dark, 0.25)};
  padding: 2rem;
  /* color: white; */
  .author {
    &__bio p {
      font-size: 1.6rem;
      line-height: 1.5;
    }
    &__name {
      font-size: 1.6rem;
      line-height: 1;
      margin-bottom: 1rem;
    }
  }
  ${media.break`
    ${grid.enabled`
      display: grid;
      grid-template-columns: 300px 1fr;
      grid-column-gap: 2rem;
      .author {
        &__image {
          grid-column: 1 / 2;
          grid-row: span 2;
        }
        &__name {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        &__bio {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
      }
    `}
  `}
`;

export default Post;
