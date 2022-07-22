import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

export const Membership = (props) => {
  const { setMemberships, memberships } = useContext(AuthContext);
  const LeaveOrg = async (e) => {
    e.preventDefault();
    let remove = memberships.filter((member) => member.id !== props.id);

    try {
      await axios.delete(`memberships/${props.id}`);
      setMemberships(remove);
    } catch (err) {
      // alert(err);
    }
  };
  return (
    <div className="card">
      <div>{props.name}</div>
      <button className="edit">Edit</button>
      <button onClick={LeaveOrg} name={props.id} className="leave">
        Leave
      </button>
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
  const { currentUser, setMemberships, memberships } = useContext(AuthContext);
  const JoinOrg = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "memberships.json",
        JSON.stringify({
          user_id: currentUser.id,
          organization_id: props.org_id,
        })
      );
      console.log("post call data", resp.data);
      setMemberships([resp.data[0], ...memberships]);
      console.log("memberships", memberships);
    } catch {}
    console.log("joined");
  };
  return (
    <div className="card">
      <div>{props.name}</div>
      <button className="edit">Edit</button>
      <button onClick={JoinOrg} className="join">
        Join
      </button>
    </div>
  );
};
