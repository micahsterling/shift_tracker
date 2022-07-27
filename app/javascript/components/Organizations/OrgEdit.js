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
  const [setLoading] = useState(true);
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    if (!organizations.length) {
      getOrganizations();
    }
  }, [organizations]);

  const getOrganizations = async () => {
    try {
      const resp = await axios.get("organizations.json");
      setOrganizations(resp.data);
      console.log("axios ran");
    } catch {}
  };

  let orgData = organizations.filter((org) => org.id === id);
  let org = orgData[0];

  const handleFormChange = (e) => {
    e.preventDefault();
    setUpdate(
      Object.assign({}, update, {
        [e.target.name]: e.target.value,
      })
    );
  };

  const Submit = () => {
    axios
      .patch(`/organizations/${id}`, {
        name: update.name,
        hourly_rate: update.hourly_rate,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/organizations");
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          alert("Name has already been taken");
        }
      });
  };

  if (!organizations.length) {
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
              value={update.name || org.name}
              onChange={handleFormChange}
            />
            <EditLabel>Hourly Rate: $</EditLabel>
            <EditInput
              type="float"
              name="hourly_rate"
              value={update.hourly_rate || org.hourly_rate}
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
