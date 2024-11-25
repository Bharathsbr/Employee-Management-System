import axios from "axios";

const REST_API_GET_URL="http://localhost:8080/employees/get";
export const listOfEmployees=()=>axios.get(REST_API_GET_URL);

const REST_API_CREATE_URL="http://localhost:8080/employees/create";
export const createEmployee=(employee)=>axios.post(REST_API_CREATE_URL,employee);

export const getEmployee=(id)=>axios.get(REST_API_GET_URL+"/"+id);

export const updateEmployee=(id,employee)=>axios.put("http://localhost:8080/employees/update/"+id,employee);

export const deleteEmployee=(id)=>axios.delete("http://localhost:8080/employees/delete/"+id);