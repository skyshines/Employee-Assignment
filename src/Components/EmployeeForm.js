import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const initialState = {
    "id" : '',
    "first_name" : '',
    "last_name" : '',
    "gender" : '',
    "email" : ''
}

function EmployeeForm({ employees, setEmployees}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialState);

  useEffect(()=>{
    if(id){
        const i = employees.findIndex(emp=>emp.id == id)
        setEmployee(employees[i]);
    }
  },[])

  function handleChange(e) {
    setEmployee({...employee,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (id) {
        setEmployee({...employee,
            "id" : id
        })
        console.log(employees)

        const index = employees.findIndex(e=>e.id == id)
        const newEmployees = [...employees]
        newEmployees.splice(index,1,employee)
        setEmployees(newEmployees)
    } else {
        setEmployee({...employee,
            "id" : employees.length + 1
        })
        setEmployees([...employees, employee]);
    }
    
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4">{id ? 'Edit' : 'Add'} Employee</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name = "first_name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name = "last_name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name = "gender"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.gender}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name = "email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.email}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          {id ? 'Edit' : 'Add'} Employee
        </Button>
      </form>
    </>
  );
}

export default EmployeeForm;
