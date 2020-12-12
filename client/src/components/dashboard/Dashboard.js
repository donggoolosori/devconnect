import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
