import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Membership = (props) => {
  return (
    <div className="card">
      <div>{props.name}</div>
      <p>Org ID: {props.org_id}</p>
      <button className="edit">Edit</button>
      <button className="leave">Leave</button>
      <button className="link">
        <Link
          to={`/organizations/${props.slug}`}
          state={[props.name, props.org_id]}
        >
          View Shifts
        </Link>
      </button>
    </div>
  );
};

export const Organization = (props) => {
  return (
    <div className="card">
      <div>{props.name}</div>
      <button className="edit">Edit</button>
      <button className="join">Join</button>
    </div>
  );
};
