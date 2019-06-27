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

        // [HttpGet]
        // public async Task<IActionResult> GetStaffs([FromQuery]StaffParams staffParams)
        // {
        //     var staffs = await _repo.GetStaffs(staffParams);
            
        //     var staffsToReturn = _mapper.Map<IEnumerable<StaffForListDto>>(staffs);

        //     Response.AddPagination(staffs.CurrentPage, staffs.PageSize, staffs.TotalCount, staffs.TotalPages);

        //     return Ok(staffsToReturn);
        //     // return Ok(staffs);
        // }
        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetStaff(int id)
        // {
        //     var staff = await _repo.GetStaff(id);
        //     var staffToReturn = _mapper.Map<StaffForDetailDto>(staff);
        //     return Ok(staffToReturn);
        // }
        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateStaff(int id, StaffForEditDto staffForEditDto){
        //     // if(id!= int.Parse(Staff.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     //     return Unahthrized();
        //     var staffFromRepo = await _repo.GetStaff(id);
        //     _mapper.Map(staffForEditDto, staffFromRepo);

        //     if(await _repo.SaveAll())
        //         return NoContent();
        //     throw new Exception($"Updating staff {id} failed on save");
        // }
        // [HttpPost("create")]
        // public async Task<IActionResult> Create(StaffForCreateDto staffForCreateDto)
        // {
        //     var staffToCreate = new Staff
        //     {
        //         Name = staffForCreateDto.Name
        //     };

        //     var createdStaff = await _repo.Create(staffToCreate);

        //     return StatusCode(201);
        // }
       
        //     if(await _repo.SaveAll())
        //         return NoContent();
        //     throw new Exception($"Updating staff {id} failed on save");
        // }
    }
}