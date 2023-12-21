import React from "react";

const Section = (props) => {
  return <div className="section" style={props.style}>{props.children}</div>;
};

export const SectionTitle = (props) => {
  return <div className="section__title" style={props.style}> {props?.children} </div>
};

export const SectionBody = (props) => {
  return <div className="section__body" style={props.style}>{props.children}</div>;
};

export default Section;
