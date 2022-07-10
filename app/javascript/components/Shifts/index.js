import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import './Shift.css'

const Shifts = () => {
  const [shift,setShift] = useState([])

  
  const tData = shift.map( item => {
    let date = moment(item.start).format("M/DD/YYYY");
    let startTime = moment(item.start).format("h:mm a");
    let endTime = moment(item.end).format("h:mm a");
    return (

        <tr>
          <td>{item.userName}</td>
          <td>{date}</td>
          <td>{startTime}</td>
          <td>{endTime}</td>
          {/* <td>{item.break_length}</td> */}
        </tr>
    )
  })
    
  useEffect(() => {
    // Get all organizations from api
    // update org in state
    axios.get('/api/v1/shifts.json')
    .then( resp => {
      console.log(resp.data)
      setShift(resp.data)
    })
    .catch( resp => console.log(resp) )
  }, [])

  return (
    <div >
      <div className="app-container">
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

          </tbody>
        </table>
      </div>
    <div>This is the shifts page</div>
    <div>This is the shifts page</div>
    </div>
  )
}

export default Shifts