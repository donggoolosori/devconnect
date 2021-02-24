import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../modules/post';

interface Props {}

export const PostForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPost({ text }));
    setText('');
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          //   cols="30"
          //   rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
