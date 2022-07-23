import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

function EditOrg() {
  let { id } = useParams();
  id = parseInt(id);

  const { organizations, setOrganizations } = useContext(AuthContext);
  const [setLoading] = useState(true);
  const [update, setUpdate] = useState({});

  useEffect(() => {
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
    console.log("handle change");
    setUpdate(
      Object.assign({}, update, {
        [e.target.name]: e.target.value,
      })
    );
    console.log("update", update);
  };

  const Submit = () => {
    axios
      .patch(`/organizations/${id}`, {
        name: update.name,
        hourly_rate: update.hourly_rate,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  if (!organizations.length) {
    return null;
  } else {
    return (
      <div>
        <h1>edit page</h1>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={org.name}
          value={update.name}
          onChange={handleFormChange}
        />
        <label for="hourly rate">Hourly Rate: $</label>
        <input
          type="number"
          id="hourly_rate"
          name="hourly_rate"
          defaultValue={org.hourly_rate}
          value={update.hourly_rate}
          onChange={handleFormChange}
        />
        <button onClick={Submit}>Update</button>
      </div>
    );
  }
}

export default EditOrg;
