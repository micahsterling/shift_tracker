import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header";
import { Membership, Organization } from "./OrgMemList";
import {
  Body,
  Button,
  Container,
  Form,
  Input,
  Label,
  List,
  ListTitle,
  Text,
  TextWrap,
} from "./OrgElements";

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
    <Container>
      <Header />
      <Body>
        {memberships.length < 1 ? (
          <TextWrap>
            <Text>You aren't a member of any organizations.</Text>
            <Text>Join an existing one or create a new one.</Text>
          </TextWrap>
        ) : (
          <>
            <ListTitle>My Organizations</ListTitle>
            <List>{memberList}</List>
          </>
        )}
        <ListTitle>Organizations</ListTitle>
        <List>{orgList}</List>
        <ListTitle>Create An Organization</ListTitle>
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name || ""}
            onChange={handleFormChange}
          />
          <Label>Hourly Rate: $</Label>
          <Input
            type="float"
            name="hourly_rate"
            required="required"
            value={formData.hourly_rate || ""}
            onChange={handleFormChange}
          />
          <Button type="submit">Create and Join</Button>
        </Form>
      </Body>
    </Container>
  );
};

export default Organizations;
