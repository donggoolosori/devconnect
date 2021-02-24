import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import { getPosts } from '../../modules/post';

interface Props {}

export const Posts: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: rootState) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return <div className="Posts"></div>;
};
