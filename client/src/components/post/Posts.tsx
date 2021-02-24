import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import { getPosts, Post } from '../../modules/post';
import { Spinner } from '../layout/Spinner';
import { PostForm } from './PostForm';
import { PostItem } from './PostItem';

interface Props {}

export const Posts: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: rootState) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="larget text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post: Post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};
