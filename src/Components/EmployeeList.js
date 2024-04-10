import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, IconButton, TextField, Typography, Button,Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import emps from '../data.js';

function EmployeeList({ employees, setEmployees }) {
  const [searchArray, setSearchArray] = useState(employees);
  
  useEffect(()=>{
    if(searchArray.length == 0){
      setSearchArray(employees);
    } 
  },[employees])

  const handleDelete = (id) => {
    const filteredEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(filteredEmployees);

    const filteredEmployees1 = searchArray.filter((searchArray) => searchArray.id !== id);
    if(filteredEmployees1.length === 0){
      
    }
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

  async function HandleClickAPI() {
    try {
      const response = await fetch('https://my.api.mockaroo.com/users.json?key=fc3ff1f0');
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function HandleClickData() {
    try {
      setEmployees(emps);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }



  return (
    <>
    <Box display = 'flex' justifyContent="space-around">
      <Button variant="contained" color="primary" component={Link} to="/add">
        Add Entry
      </Button>

      <Button variant="contained" color="primary" onClick={HandleClickAPI}>
        Fetch From API
      </Button>

      <Button variant="contained" color="primary" onClick={HandleClickData}>
        Fetch From Data.js
      </Button>
    </Box>

      <Typography variant="h4" align="center">Employee List</Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={onChangeHandler}
      />
      
      <Grid container spacing={2}>
        {searchArray.map((employee) => (
          <Grid item xs={6} key={employee.id}>
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
