import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header";
import { Membership, Organization } from "./OrgMemList";
import { Body, Form, List, ListTitle, TextWrap } from "./OrgElements";

const Organizations = () => {
  const {
    currentUser,
    organizations,
    setOrganizations,
    memberships,
    setMemberships,
    setShow,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setShow(false);
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
  // console.log("mem", memberships);
  // console.log("org", organizations);

  const memberList = memberships.map((item) => {
    return (
      <Membership
        name={item.name}
        slug={item.slug}
        org_id={item.organization_id}
        id={item.id}
      />
    );
  });

  const diff = organizations.filter(
    (org) => !memberships.find((mem) => org.name === mem.name)
  );

  // console.log("diff", diff);

  const orgList = diff.map((item) => {
    return <Organization name={item.name} org_id={item.id} />;
  });

  const handleFormChange = (e) => {
    e.preventDefault();

    setFormData(
      Object.assign({}, formData, { [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("organizations", {
        user_id: currentUser.id,
        name: formData.name,
        hourly_rate: formData.hourly_rate,
      })
      .then((resp) => {
        setMemberships([formData, ...memberships]);
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          alert("Name has already been taken");
        }
      });
    setFormData("");
  };

  return (
    <>
      <Header />
      <Body>
        <TextWrap>
          <p>You aren't a member of an organization.</p>
          <p>Join and existing one or create a new one.</p>
        </TextWrap>
        <ListTitle>My Organizations</ListTitle>
        <List>{memberList}</List>
        <ListTitle>Organizations</ListTitle>
        <List>{orgList}</List>
        <ListTitle>Create Organization</ListTitle>
        <Form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name || ""}
            onChange={handleFormChange}
          />
          <label>Hourly Rate: $</label>
          <input
            type="number"
            name="hourly_rate"
            required="required"
            value={formData.hourly_rate || ""}
            onChange={handleFormChange}
          />
          <input type="submit" value="Create and Join" />
        </Form>
      </Body>
    </>
  );
};

export default Organizations;
