import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton, TextField, Typography, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function EmployeeList({ employees, setEmployees }) {
  const [searchArray, setSearchArray] = useState(employees);
  
  useEffect(()=>{
    if(searchArray.length == 0) setSearchArray(employees);
  },[employees])

  const handleDelete = (id) => {
    const filteredEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(filteredEmployees);

    const filteredEmployees1 = searchArray.filter((searchArray) => searchArray.id !== id);
    setSearchArray(filteredEmployees1);
  };


  const onChangeHandler = (e) => {
    if(true){
      let str = e.target.value;
      let arr = employees.filter((emp) => emp.first_name.toLowerCase().includes(str.toLowerCase())
         || emp.last_name.toLowerCase().includes(str.toLowerCase())
         || emp.email.toLowerCase().includes(str.toLowerCase())
         || (emp.first_name + " " + emp.last_name).toLowerCase().includes(str.toLowerCase()));

      setSearchArray(arr);   
    }
  }

  return (
    <>
      <Typography variant="h4">Employee List</Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={onChangeHandler}
      />
      <Button variant="contained" color="primary" component={Link} to="/add">
        Add Entry
      </Button>
      <Grid container spacing={2}>
        {searchArray.map((employee) => (
          <Grid item xs={12} key={employee.id}>
            <Typography>{employee.first_name} {employee.last_name}</Typography>
            <Typography>Gender : {employee.gender}</Typography>
            <Typography>Email :  {employee.email}</Typography>
            <IconButton component={Link} to={`/edit/${employee.id}`}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(employee.id)}>
              <Delete />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default EmployeeList;
