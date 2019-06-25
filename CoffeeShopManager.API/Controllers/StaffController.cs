using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using CoffeeShopManager.API.Data.Staffs;
using Microsoft.AspNetCore.Mvc;
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
    }
}