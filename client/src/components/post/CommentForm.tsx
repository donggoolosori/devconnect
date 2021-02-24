import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../modules/post';

interface Props {
  post_id: string;
}

export const CommentForm: React.FC<Props> = ({ post_id }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addComment(post_id, { text }));
    setText('');
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          //   cols="30"
          //   rows="5"
          placeholder="Create a comment"
          required
          value={text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
