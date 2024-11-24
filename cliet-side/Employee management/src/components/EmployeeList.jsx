import {useState , useEffect} from "react";
import { deleteEmployee, listOfEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function EmpoyeeList()
{
    const[employees,setEmployees]=useState([]);
    const navigator=useNavigate();

    useEffect(()=>{
        getAllEmployees();
    }
,[])


    function getAllEmployees()
    {
        listOfEmployees().then((response)=>{
            setEmployees(response.data);
        }).catch(error=>{console.log(error);
        });
    }
    
    function addEmployee()
    {
        navigator("/add-employee");
    }


    
    function updateEmployee(id)
    {
        navigator(`/update-employee/${id}`);
    }



    function deleteEmp(id)
    {
        deleteEmployee(id).then(()=>{
            getAllEmployees();
        }).catch((error) => {
            console.error(error);
          });
    }



    return (
        <div className='container'>
            <h2 style={{}}>Employee Details</h2>
            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee=>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-info" onClick={()=>updateEmployee(employee.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={()=>deleteEmp(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        
        </div>
    )
}

export default EmpoyeeList;