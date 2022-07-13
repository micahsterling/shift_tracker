import React, {useState, useEffect} from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import './Shift.css'
// import ShiftForm from './ShiftForm'


function Shifts() {
  const client = axios.create({ baseURL: '/api/v1/shifts' })
  const [shift, setShift] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [formData, setFormData] = useState({})

  const handleFormChange = (e) => {
    e.preventDefault()

    setFormData(Object.assign({}, formData, {[e.target.name]: e.target.value}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let startData = formData.date + " " + formData.startTime
    let endData = formData.date + " " + formData.endTime

    const start = new Date(startData)
    const end = new Date(endData)

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const user_id = 3
    const organization_id = 1
    client.post('', {
      user_id: user_id, 
      start: start, 
      end: end, 
      break_length: formData.break_length, 
      // organization_id: organization_id, 
    })
    .then(resp => {
      setShift([resp.data, ...shift])
    })
    .catch(resp => {})
    setFormData('')
  }

  const tData = shift.map(item => {
    let date = dayjs(item.start).format("M/DD/YYYY")
    let startTime = dayjs(item.start).format("h:mm a")
    let endTime = dayjs(item.end).format("h:mm a")
    let shiftLength = dayjs(item.end).diff(item.start, "hour")
    let breakLengthHours = parseFloat(item.break_length / 60)
    let hoursWorked = shiftLength - breakLengthHours
    let shiftCost = hoursWorked * item.hourly_rate
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
    )
  })

  useEffect(() => {
    // Get all organizations from api
    // update org in state
    client.get()
      .then(resp => {
        console.log(resp.data)
        setShift(resp.data)
      })
      .catch(resp => console.log(resp))
  }, [])

  return (
    <div>
      <div className="app-container">
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
                <td>
                  <input
                    type='text'
                    name='name'
                    value={formData.name || ''}
                    // required='required'
                    placeholder='name' 
                    onChange={handleFormChange}/>
                </td>
                <td>
                  <input
                    type='date'
                    name='date'
                    value={formData.date || ''}
                    // required='required'
                    placeholder='Shift Date'
                    onChange={handleFormChange} />
                </td>
                <td>
                  <input
                    type='time'
                    name='startTime'
                    value={formData.startTime || ''}
                    // required='required'
                    placeholder='Start time'
                    onChange={handleFormChange} />
                </td>
                <td>
                  <input
                    type='time'
                    name='endTime'
                    value={formData.endTime || ''}
                    // required='required'
                    placeholder='End time'
                    onChange={handleFormChange} />
                </td>
                <td>
                  <input
                    type='number'
                    name='break_length'
                    value={formData.break_length || ''}
                    placeholder='Break length'
                    onChange={handleFormChange} />
                </td>
                <td>
                  <button type='submit'>Add Shift</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default Shifts