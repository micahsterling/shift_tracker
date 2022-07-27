import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import ShiftData from "./ShiftData";
import Header from "../Header/Header";
import {
  Button,
  Input,
  Form,
  ShiftContainer,
  ShiftTitle,
  ShiftWrapper,
  Table,
  Tbody,
  TD,
  TH,
  THead,
  TR,
} from "./ShiftElements";

function Shifts() {
  const SHIFT_URL = `/shifts.json`;

  const [shift, setShift] = useState([]);
  const [formData, setFormData] = useState({});
  const { currentUser, setShow } = useContext(AuthContext);

  const location = useLocation();
  const orgId = location.state[1];
  const orgName = location.state[0];

  useEffect(() => {
    setShow(true);
    axios
      .get(SHIFT_URL, {
        params: { organization_id: orgId },
      })
      .then((resp) => {
        setShift(resp.data);
      })
      .catch((resp) => console.log(resp));
  }, []);

  const handleFormChange = (e) => {
    e.preventDefault();

    setFormData(
      Object.assign({}, formData, { [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let startData = formData.date + " " + formData.startTime;
    let endData = formData.date + " " + formData.endTime;

    const start = new Date(startData);
    const end = new Date(endData);
    const user_id = currentUser.id;
    const organization_id = orgId;

    axios
      .post(SHIFT_URL, {
        user_id: user_id,
        user_name: currentUser.name,
        start: start,
        end: end,
        break_length: formData.break_length,
        organization_id: organization_id,
      })
      .then((resp) => {
        setShift([resp.data, ...shift]);
      })
      .catch((resp) => console.log("catch", resp));
    setFormData("");
  };

  const tData = shift.map((item) => {
    return (
      <ShiftData
        user_name={item.user_name}
        date={item.date}
        start={item.start}
        end={item.end}
        break_length={item.break_length}
        hourly_rate={item.hourly_rate}
      />
    );
  });

  return (
    <ShiftContainer>
      <Header />
      <ShiftWrapper>
        <ShiftTitle>{orgName}</ShiftTitle>
        <Form onSubmit={handleSubmit}>
          <Table>
            <THead>
              <TR>
                <TH>Employee Name</TH>
                <TH>Shift Date</TH>
                <TH>Start Time</TH>
                <TH>Finish Time</TH>
                <TH>Break Length (minutes)</TH>
                <TH>Hours Worked</TH>
                <TH>Shift Cost</TH>
              </TR>
            </THead>
            <Tbody>
              {tData}
              <TR>
                <TD name="user_name" value={formData.user_name || ""}>
                  {currentUser.name}
                </TD>
                <TD>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date || ""}
                    required="required"
                    placeholder="Shift Date"
                    onChange={handleFormChange}
                  />
                </TD>
                <TD>
                  <Input
                    type="time"
                    name="startTime"
                    value={formData.startTime || ""}
                    required="required"
                    placeholder="Start time"
                    onChange={handleFormChange}
                  />
                </TD>
                <TD>
                  <Input
                    type="time"
                    name="endTime"
                    value={formData.endTime || ""}
                    required="required"
                    placeholder="End time"
                    onChange={handleFormChange}
                  />
                </TD>
                <TD>
                  <Input
                    type="number"
                    name="break_length"
                    value={formData.break_length || ""}
                    placeholder="Break length"
                    onChange={handleFormChange}
                  />
                </TD>
                <TD>
                  <Button type="submit">Add Shift</Button>
                </TD>
              </TR>
            </Tbody>
          </Table>
        </Form>
      </ShiftWrapper>
    </ShiftContainer>
  );
}

export default Shifts;
