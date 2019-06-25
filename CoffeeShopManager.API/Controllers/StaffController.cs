using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using CoffeeShopManager.API.Data.Staffs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;

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
        public async Task<IActionResult> GetStaffs ()
        {
            var staffs = await _repo.GetStaffs();
            
            var staffsToReturn = _mapper.Map<IEnumerable<StaffForListDto>>(staffs);
            return Ok(staffsToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaff(int id)
        {
            var staff = await _repo.GetStaff(id);
            var staffToReturn = _mapper.Map<StaffForDetailDto>(staff);
            return Ok(staffToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(int id, StaffForEditDto staffForEditDto){
            // if(id!= int.Parse(Staff.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unahthrized();
            var staffFromRepo = await _repo.GetStaff(id);
            _mapper.Map(staffForEditDto, staffFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating staff {id} failed on save");
        }
    }
}