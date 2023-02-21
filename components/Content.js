import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import React from 'react';

import { InlineNote, ContentLink } from './Serializers';
// import Form from './Forms/Form';
import { urlFor } from '@/lib/client';

const components = {
  types: {
    image: ({ value }) => {
      const width = 800;
      if (!value) {
        return null;
      }
      const src = urlFor(value).width(800).url();
      return (
        <figure>
          <img src={src} alt={value.alt} />
        </figure>
      );
    },
    video: ({ value }) => {
      const { url } = value;
      return <ReactPlayer url={url} controls />;
    },
    // form: ({ value }) => {
    //   return <Form fields={value.formBuilder} {...value} />;
    // },
  },
  marks: {
    note: props => {
      // const { marks, children } = props;
      return <InlineNote {...props} />;
    },
    link: props => {
      return <ContentLink {...props} />;
    },
  },
};

const Content = React.forwardRef(({ children, className }, ref) => {
  return (
    <ContentContainer className={classNames('block-content', className)} ref={ref}>
      <PortableText value={children} components={components} />
    </ContentContainer>
  );
});

const ContentContainer = styled.div`
  .content-button {
    display: inline-block;
  }
  strong {
    font-weight: bold;
    .what-we-do & {
      font-weight: ${({ theme }) => theme.font.semibold};
    }
  }
  .what-we-do & {
    font-family: ${({ theme }) => theme.font.heading};
  }
`;

export default Content;
