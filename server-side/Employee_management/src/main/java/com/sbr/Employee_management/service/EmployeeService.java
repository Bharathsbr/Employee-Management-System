package com.sbr.Employee_management.service;

import com.sbr.Employee_management.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getEmployees();

    int updateEmployee(Long id,EmployeeDto dto);

    int deleteEmployee(Long id);
}
