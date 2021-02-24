import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { rootState } from '../../modules';
import { getPost } from '../../modules/post';
import { Spinner } from '../layout/Spinner';
import { PostItem } from './PostItem';

interface MatchParams {
  post_id: string;
}

export const Post: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state: rootState) => state.post);

  useEffect(() => {
    dispatch(getPost(match.params.post_id));
  }, [dispatch]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
    </>
  );
};
