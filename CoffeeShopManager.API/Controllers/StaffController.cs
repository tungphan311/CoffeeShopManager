using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using CoffeeShopManager.API.Data.Staffs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using CoffeeShopManager.API.Helpers;

namespace CoffeeShopManager.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IStaffRepository _repo;
        public StaffController(IStaffRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery]EmployeeParams employeeParams)
        {
            var employees = await _repo.GetEmployees(employeeParams);
            
            var employeesToReturn = _mapper.Map<IEnumerable<StaffForListDto>>(employees);

            Response.AddPagination(employees.CurrentPage, employees.PageSize, employees.TotalCount, employees.TotalPages);

            return Ok(employeesToReturn);
            // return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _repo.GetEmployee(id);
            var employeeToReturn = _mapper.Map<StaffForDetailDto>(employee);
            return Ok(employeeToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, StaffForEditDto employeeForEditDto){
            // if(id!= int.Parse(Employee.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unahthrized();
            var employeeFromRepo = await _repo.GetEmployee(id);
            _mapper.Map(employeeForEditDto, employeeFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating employee {id} failed on save");
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(StaffForCreateDto employeeForCreateDto)
        {
            var employeeToCreate = new Employee
            {
                Name = employeeForCreateDto.Name
            };

            var createdEmployee = await _repo.Create(employeeToCreate);

            return StatusCode(201);
        }
    }
}