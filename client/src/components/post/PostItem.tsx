import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootState } from '../../modules';
import { addLike, deletePost, Post, removeLike } from '../../modules/post';

interface Props {
  post: Post;
}

export const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: rootState) => state.auth);
  const { _id, text, name, avatar, user, likes, comments, date } = post;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => dispatch(addLike(_id))}
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes?.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => dispatch(removeLike(_id))}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => dispatch(deletePost(_id))}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};
