import {Routes,Route, Switch} from 'react-router-dom';
import EmployeeList from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';
import { useEffect, useState } from 'react';
import emps from './data.js';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // fetch('./data.js')
    //   .then((res)=> res.json())
    //   .then((data)=>setEmployees(data));
    setEmployees(emps);

  }, [])

  console.log(employees);

  return (
    <Routes>
      <Route path="/" element = {<EmployeeList setEmployees={setEmployees} employees={employees}></EmployeeList>} exact>
      </Route>
      <Route path="/add" element = {<EmployeeForm setEmployees={setEmployees} employees={employees}/>}>
      </Route>
      <Route path="/edit/:id" element = {<EmployeeForm setEmployees={setEmployees} employees={employees} />}>
      </Route>
    </Routes>
  );
}

export default App;
