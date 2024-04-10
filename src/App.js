import {BrowserRouter as Router,Router} from 'react-router-dom';
import EmployeeList from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(fetch('https://my.api.mockaroo.com/users.json?key=495ed610').then((res)=> res.json));
  }, [])

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <EmployeeList employees={employees} setEmployees={setEmployees} />
          </Route>
          <Route path="/add">
            <EmployeeForm setEmployees={setEmployees} />
          </Route>
          <Route path="/edit/:id">
            <EmployeeForm setEmployees={setEmployees} employees={employees} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
