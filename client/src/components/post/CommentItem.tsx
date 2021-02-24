import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootState } from '../../modules';
import { Comment, deleteComment } from '../../modules/post';

interface Props {
  post_id: string;
  comment: Comment;
}

export const CommentItem: React.FC<Props> = ({ post_id, comment }) => {
  const dispatch = useDispatch();
  const { _id, text, name, avatar, user, date } = comment;
  const auth = useSelector((state: rootState) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteComment(post_id, _id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};
