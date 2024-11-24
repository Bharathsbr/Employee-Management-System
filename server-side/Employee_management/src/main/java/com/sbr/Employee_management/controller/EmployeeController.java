package com.sbr.Employee_management.controller;

import com.sbr.Employee_management.dto.EmployeeDto;
import com.sbr.Employee_management.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeServiceImpl service;

    @PostMapping("/create")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto)
    {
        EmployeeDto dto=service.createEmployee(employeeDto);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<List<EmployeeDto>> getEmployees()
    {
        List<EmployeeDto> employeeDtoList=service.getEmployees();
        return new ResponseEntity<>(employeeDtoList,HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id)
    {
        EmployeeDto dto=service.getEmployeeById(id);
        if(dto==null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable Long id,@RequestBody EmployeeDto dto)
    {
        int x=service.updateEmployee(id,dto);
        if(x==0)
        {
            return new ResponseEntity<>("Employee not found",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Updated",HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id)
    {
        int x=service.deleteEmployee(id);
        if(x==0)
        {
            return new ResponseEntity<>("Employee not found",HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok("Deleted");
    }

}
