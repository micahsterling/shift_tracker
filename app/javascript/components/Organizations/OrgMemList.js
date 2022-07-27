import React, { useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { Button, BtnLink, BtnWrapper, OrgTitle, Card } from "./OrgMemElements";

export const Membership = (props) => {
  const { memberships, setMemberships } = useContext(AuthContext);
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
    <Card>
      <OrgTitle>{props.name}</OrgTitle>
      <BtnWrapper>
        <Button>
          <BtnLink
            to={`/shifts/${props.slug}`}
            state={[props.name, props.org_id]}
          >
            View Shifts
          </BtnLink>
        </Button>
        <Button>
          <BtnLink to={`/organizations/${props.org_id}`}>Edit</BtnLink>
        </Button>
        <Button onClick={LeaveOrg} name={props.id}>
          Leave
        </Button>
      </BtnWrapper>
    </Card>
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
  };
  return (
    <Card>
      <OrgTitle>{props.name}</OrgTitle>
      {/* <Button >
        <Link to={`/organizations/${props.org_id}`}>Edit</Link>
      </Button> */}
      <BtnWrapper>
        <Button onClick={JoinOrg}>Join</Button>
      </BtnWrapper>
    </Card>
  );
};
