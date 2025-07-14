import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBugs } from "../../../Controllers/Redux/bugSlice";
import Card from "../../Components/Dashboard/card";

export default () => {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.bugs);
  const navigate = useNavigate();
  const [highCount, setHighCount] = useState(0);
  const [midCount, setMidCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);

  function redirect() {
    navigate("/viewbugs");
  }

  function filterBugs(priority) {
    return bugs.filter((bug) => bug.priority === priority).length;
  }

  useEffect(() => {
    dispatch(getBugs());
  }, [dispatch]);

  useEffect(() => {
    if (bugs) {
      setHighCount(filterBugs(1));
      setMidCount(filterBugs(2));
      setLowCount(filterBugs(3));
    }
  }, [bugs]);

  return (
    <div className="page-container">
      <Card priority="1" count={highCount} clicked={redirect} />
      <Card priority="2" count={midCount} clicked={redirect} />
      <Card priority="3" count={lowCount} clicked={redirect} />
    </div>
  );
};
