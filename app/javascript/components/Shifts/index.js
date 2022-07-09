import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'

const Shifts = () => {
  const [shift,setShift] = useState([])

  
  const list = shift.map( item => {
    let date = moment(item.start).format("M/DD/YYYY");
    let startTime = moment(item.start).format("h:mm a");
    let endTime = moment(item.end).format("h:mm a");
    return (
    
    <div> 
      {item.userName}
      {date}
      {startTime}
      {endTime}
      {item.break_length}
      </div>
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
    <div>
      <div>This is the shifts page</div>
      <div>{list}new</div>
      <div>This is the shifts page</div>
    </div>
  )
}

export default Shifts