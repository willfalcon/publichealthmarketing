import styled from 'styled-components';

import { media } from '../theme';
import PostListItem from './PostListItem';

const PostsList = ({ posts }) => {
  return (
    <>
      <SideBackground className="posts-list-background" />
      <StyledPostsList className="posts-list">
        {posts.map(post => {
          return <PostListItem {...post} key={post._id} />;
        })}
      </StyledPostsList>
    </>
  );
};

const StyledPostsList = styled.ul`
  list-style: none;
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
`;

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

export default PostsList;
