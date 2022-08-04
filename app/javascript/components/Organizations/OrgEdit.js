import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header";
import {
  Button,
  EditContainer,
  EditInput,
  EditLabel,
  EditWrapper,
  EditTitle,
  FormContainer,
} from "./OrgMemElements";

function EditOrg() {
  let { id } = useParams();
  id = parseInt(id);

  const { organizations, setOrganizations, setShow } = useContext(AuthContext);
  const [update, setUpdate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
    if (!organizations.length) {
      getOrganizations();
    }
  }, [organizations]);

  const getOrganizations = async () => {
    try {
      const resp = await axios.get("organizations.json");
      setOrganizations(resp.data);
    } catch {}
  };

  let orgData = organizations.filter((org) => org.id === id);
  let org = orgData[0];

  useEffect(() => {
    setUpdate(org);
  }, [org]);

  const handleFormChange = (e) => {
    e.preventDefault();

    setUpdate((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const Submit = () => {
    axios
      .patch(`/organizations/${id}`, {
        name: update.name,
        hourly_rate: update.hourly_rate,
      })
      .then((response) => {
        navigate("/organizations");
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          alert("Name has already been taken");
        }
      });
  };

  if (update === undefined) {
    return null;
  } else {
    return (
      <EditContainer>
        <Header />
        <EditWrapper>
          <EditTitle>Edit {org.name}</EditTitle>
          <FormContainer>
            <EditLabel>Name:</EditLabel>
            <EditInput
              type="text"
              name="name"
              value={update.name || ""}
              onChange={handleFormChange}
            />
            <EditLabel>Hourly Rate: $</EditLabel>
            <EditInput
              type="float"
              name="hourly_rate"
              value={update.hourly_rate || ""}
              onChange={handleFormChange}
            />
            <Button onClick={Submit}>Update</Button>
          </FormContainer>
        </EditWrapper>
      </EditContainer>
    );
  }
}

export default EditOrg;
