import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import dayjs from "dayjs";
import "./Shift.css";

function Shifts() {
  const SHIFT_URL = `/shifts.json`;

  const [shift, setShift] = useState([]);
  const [formData, setFormData] = useState({});
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const orgId = location.state[1];
  const orgName = location.state[0];

  useEffect(() => {
    axios
      .get(SHIFT_URL, {
        params: { organization_id: orgId },
      })
      .then((resp) => {
        console.log(resp.data);
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
        start: start,
        end: end,
        break_length: formData.break_length,
        organization_id: organization_id,
      })
      .then((resp) => {
        setShift([resp.data, ...shift]);
      })
      .catch((resp) => {});
    setFormData("");
  };

  const tData = shift.map((item) => {
    let date = dayjs(item.start).format("M/DD/YYYY");
    let startTime = dayjs(item.start).format("h:mm a");
    let endTime = dayjs(item.end).format("h:mm a");
    let shiftLength = dayjs(item.end).diff(item.start, "hour");
    let breakLengthHours = parseFloat(item.break_length / 60);
    let hoursWorked = shiftLength - breakLengthHours;
    let shiftCost = hoursWorked * item.hourly_rate;
    return (
      <tr>
        <td>{item.userName}</td>
        <td>{date}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{item.break_length}</td>
        <td>{hoursWorked.toFixed(2)}</td>
        <td>${shiftCost.toFixed(2)}</td>
      </tr>
    );
  });

  return (
    <div>
      <p>Logged in as {currentUser.name}</p>
      <h1>{orgName}</h1>
      <div className="app-container">
        <h2>Shifts</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Shift Date</th>
                <th>Start Time</th>
                <th>Finish Time</th>
                <th>Break Length (minutes)</th>
                <th>Hours Worked</th>
                <th>Shift Cost</th>
              </tr>
            </thead>
            <tbody>
              {tData}
              <tr>
                <td>{currentUser.name}</td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={formData.date || ""}
                    required="required"
                    placeholder="Shift Date"
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime || ""}
                    required="required"
                    placeholder="Start time"
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime || ""}
                    required="required"
                    placeholder="End time"
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="break_length"
                    value={formData.break_length || ""}
                    placeholder="Break length"
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <button type="submit">Add Shift</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Shifts;
