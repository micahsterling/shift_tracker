import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { Membership, Organization, getOrgId } from "./OrgMemList";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Organizations = () => {
  const { logout, currentUser } = useContext(AuthContext);

  console.log("current user", currentUser);
  // const currentUser = {
  //   name: localStorage.getItem("name"),
  //   id: localStorage.getItem("user_id"),
  // };
  const [organizations, setOrganizations] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [orgFilter, setOrgFilter] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Get user memberships from api and update state
    axios
      .get("memberships.json", {
        params: { user_id: currentUser.id },
      })
      .then((resp) => {
        setMemberships(resp.data);
      })
      .catch((resp) => console.log("catch", resp));
    // Get all orgs from api and update state
    axios
      .get("organizations.json")
      .then((resp) => {
        setOrganizations(resp.data);
      })
      .catch((resp) => console.log("catch", resp));
  }, [setMemberships, setOrganizations]);
  console.log("mem", memberships);
  console.log("org", organizations);

  const memberList = memberships.map((item) => {
    return (
      <Membership
        name={item.name}
        slug={item.slug}
        org_id={item.organization_id}
      />
      // <div className="card">
      //   <div className="org name">{item.name}</div>
      //   <button className="edit">Edit</button>
      //   {/* <button className="join">Join</button> */}
      //   <div className="link">
      //     <Link to={`/organizations/${item.slug}`}>Shifts</Link>
      //   </div>
      // </div>
    );
  });

  const diff = organizations.filter(
    (org) => !memberships.find((mem) => org.name === mem.name)
  );

  console.log("diff", diff);

  const orgList = diff.map((item) => {
    return <Organization name={item.name} />;
  });

  // function logout() {
  //   localStorage.clear();
  //   console.log("logged out");
  //   navigate(from, { replace: true });
  // }

  return (
    <div>
      <p>Logged in as {currentUser.name}</p>
      <button onClick={logout}>Log Out</button>
      <p>You aren't a member of an organization.</p>
      <p>Join and existing one or create a new one.</p>
      <h1>My Organizations</h1>
      <ul>{memberList}</ul>
      <h1>Organizations</h1>
      <ul>{orgList}</ul>
      <h1>Create Organization</h1>
      <form action="" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="hourly rate">Hourly Rate: $</label>
        <input type="text" id="hourly rate" name="hourly rate" />
        <input type="submit" value="Create and Join" />
      </form>
    </div>
  );
};

export default Organizations;
