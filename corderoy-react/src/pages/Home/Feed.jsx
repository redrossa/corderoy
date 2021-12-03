import '../../styles/Home/Feed.scss';
import React from "react";
import classNames from "classnames";
import {useLocation} from "react-router-dom";

export default function Feed(props) {
  const location = useLocation();
  console.log(location);

  return (
      <div className={classNames('Feed', props.className)}>

      </div>
  );
}