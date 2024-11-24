package com.sbr.Employee_management.service;

import com.sbr.Employee_management.dto.EmployeeDto;
import com.sbr.Employee_management.entity.Employee;
import com.sbr.Employee_management.mapper.EmployeeMapper;
import com.sbr.Employee_management.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepo repo;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee=EmployeeMapper.mapToEmployee(employeeDto);
        Employee create=repo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(create);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Optional<Employee> employee=repo.findById(employeeId);
        if(employee.isEmpty())
        {
            return null;
        }
        return EmployeeMapper.mapToEmployeeDto(employee.get());
    }

    @Override
    public List<EmployeeDto> getEmployees() {
        List<Employee> employees=repo.findAll();
        List<EmployeeDto> employeeDtos=new ArrayList<>();
        for(Employee employee:employees)
        {
            EmployeeDto dto=EmployeeMapper.mapToEmployeeDto(employee);
            employeeDtos.add(dto);
        }
        return employeeDtos;
    }

    @Override
    public int updateEmployee(Long id,EmployeeDto employeeDto) {
        if(getEmployeeById(id)==null)
        {
            return 0;
        }
        Employee employee=repo.findById(id).get();
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        repo.save(employee);
        return 1;
    }

    @Override
    public int deleteEmployee(Long id) {
        if(getEmployeeById(id)==null)
        {
            return 0;
        }
        repo.deleteById(id);
        return 1;
    }
}
