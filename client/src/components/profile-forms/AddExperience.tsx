import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { addExperience } from '../../modules/profile';

interface Props extends RouteComponentProps {}

export type ExpFormData = {
  company: string;
  title: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
};

export const AddExperience: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<ExpFormData>({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState<boolean>(false);
  const { company, title, location, from, to, current, description } = formData;
  const dispatch = useDispatch();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addExperience(formData, props));
  };

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            onChange={onChange}
            value={title}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={company}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            value={location}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input onChange={onChange} value={from} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              type="checkbox"
              name="current"
              checked={current}
              value={current ? 1 : 0}
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            onChange={onChange}
            value={to}
            type="date"
            name="to"
            disabled={toDateDisabled}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            // cols="30"
            // rows="5"
            placeholder="Job Description"
            onChange={onChange}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};
