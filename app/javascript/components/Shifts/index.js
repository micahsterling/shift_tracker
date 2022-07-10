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
            <tr>
              <td>
                <input 
                type='text' 
                name='name' 
                required='required' 
                placeholder='name'
                /> 
              </td>
              <td>
                <input 
                type='dateTime' 
                name='date' 
                required='required' 
                placeholder='Shift Date'
                /> 
              </td>
              <td>
                <input 
                type='dateTime' 
                name='start' 
                required='required' 
                placeholder='Start time'
                /> 
              </td>
              <td>
                <input 
                type='dateTime' 
                name='end' 
                required='required' 
                placeholder='End time'
                /> 
              </td>
              <td>
                <input 
                type='text' 
                name='break_length'  
                placeholder='Break length'
                /> 
              </td>
              <td>
                <button type='submit'>Add Shiftt</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <div>This is the shifts page</div>
    <div>This is the shifts page</div>
    </div>
  )
}

export default Shifts