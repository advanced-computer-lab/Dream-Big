import React from "react";
import { animated } from "react-spring";

const Transition = props => (
  <animated.div className = {props.width && props.width} style={props.style}>
    {props.children}
  </animated.div>
);

export default Transition;
