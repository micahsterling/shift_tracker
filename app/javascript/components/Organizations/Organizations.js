import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Shifts from './ShiftsLink'

const Organizations = () => {
  const[organizations,setOrganizations] = useState([])

  useEffect(() => {
    // Get all organizations from api
    // update org in state
    axios.get('/api/v1/organizations.json')
    .then( resp => {
      setOrganizations(resp.data.data)
    })
    .catch( resp => console.log(resp) )
  }, [organizations.length])

  const list = organizations.map( item => {
    return (
        <Shifts 
          key={item.attributes.name} 
          attributes={item.attributes}
        />
      )
    })
    
    return (
      <div>
      <p>Logged in as user.name</p>
      <button>Log Out</button>
      <p>You aren't a member of an organization.</p>
      <p>Join and existing one or create a new one.</p>
      <h1>Organizations</h1>
      <ul>{list}</ul>
  
      <h1>Create Organization</h1>
      <form action="" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="hourly rate">Hourly Rate: $</label>
        <input type="text" id="hourly rate" name="hourly rate" />
        <input type="submit" value="Create and Join"/>
      </form> 
      </div>
  )
}

export default Organizations