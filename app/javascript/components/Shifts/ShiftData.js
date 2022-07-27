import React from "react";
import dayjs from "dayjs";
import { TD, TR } from "./ShiftElements";

function ShiftData(item) {
  let date = dayjs(item.start).format("M/DD/YYYY");
  let startTime = dayjs(item.start).format("h:mm a");
  let endTime = dayjs(item.end).format("h:mm a");
  let shiftLength = dayjs(item.end).diff(item.start, "h", true);
  let breakLengthHours = parseFloat(item.break_length / 60);
  let hoursWorked = shiftLength - breakLengthHours;
  let shiftCost = hoursWorked * item.hourly_rate;
  return (
    <TR>
      <TD>{item.user_name}</TD>
      <TD>{date}</TD>
      <TD>{startTime}</TD>
      <TD>{endTime}</TD>
      <TD>{item.break_length}</TD>
      <TD>{hoursWorked.toFixed(2)}</TD>
      <TD>${shiftCost.toFixed(2)}</TD>
    </TR>
  );
}

export default ShiftData;
