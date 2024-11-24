import { useEffect,useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import {  useNavigate,useParams } from "react-router-dom";

function AddEmployee()
{
    const[firstName,setFirstname]=useState("");
    const[lastName,setLastname]=useState("");
    const[email,setEmail]=useState("");

    const {id}=useParams();



    const [errors,setErrors]=useState(
        {
            firstName:"",
            lastName:"",
            email:""
        }
    );
    const navigator=useNavigate();


    useEffect(()=>{
        if(id)
        {
            getEmployee(id).then((response)=>{
                setFirstname(response.data.firstName);
                setLastname(response.data.lastName);
                setEmail(response.data.email);
            }).catch(er=>console.error(er))
        }
    },[id]);

    function saveOrUpdateEmployee(e)
    {
        e.preventDefault();
        if(validateForm())
        {
            const emp={firstName,lastName,email};
            if(id)
            {
                updateEmployee(id,emp).then((response)=>
                {
                    console.log(response.data);
                    navigator("/employees")
                })
            }
            else{
            createEmployee(emp).then((response)=>{
                console.log(response.data);
            navigator("/employees");
            }
            )
        }
        }
    }

    function validateForm()
    {
        let valid=true;
        const errorcopy={...errors};

        if(firstName.trim())
        {
            errorcopy.firstName="";
        }
        else
        {
            errorcopy.firstName="First name is required";
            valid=false;
        }
        if(lastName.trim())
        {
            errorcopy.lastName="";
        }
        else
        {
            errorcopy.lastName="Last name is required";
            valid=false;
        }

        if(email.trim())
        {
            errorcopy.email="";
        }
        else
        {
            errorcopy.email="Email is required";
            valid=false;
        }

        setErrors(errorcopy);
        return valid;

    }

    function pageTitle()
    {
        if(id)
        {
            return <h2 className="text-center">Update Employee</h2>;
        }
        else{
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>

                            <div className="form-group mb-2">
                                <label className="form-label">First Name</label>
                                <input 
                                type="text"
                                placeholder="Enter your first name"
                                value={firstName}
                                name="firstname"
                                onChange={(e)=>setFirstname(e.target.value)}
                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}
                                </div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last Name</label>
                                <input 
                                type="text"
                                placeholder="Enter your last name"
                                value={lastName}
                                name="lastname"
                                onChange={(e)=> setLastname(e.target.value)}
                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input 
                                type="text"
                                placeholder="Enter your  mail"
                                value={email}
                                name="email"
                                onChange={(e)=> setEmail(e.target.value)}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                />
                                 {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AddEmployee;