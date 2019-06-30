using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using CoffeeShopManager.API.Data.Members;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using CoffeeShopManager.API.Helpers;

namespace CoffeeShopManager.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMemberRepository _repo;
        public MemberController(IMemberRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetMembers([FromQuery]MemberParams memberParams)
        {
            var members = await _repo.GetMembers(memberParams);
            
            var membersToReturn = _mapper.Map<IEnumerable<MemberForListDto>>(members);

            Response.AddPagination(members.CurrentPage, members.PageSize, members.TotalCount, members.TotalPages);

            return Ok(membersToReturn);
            // return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(int id)
        {
            var member = await _repo.GetMember(id);
            var membersToReturn = _mapper.Map<MemberForDetailDto>(member);
            return Ok(membersToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, MemberForEditDto memberForEditDto){
            // if(id!= int.Parse(Employee.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unahthrized();
            var memberFromRepo = await _repo.GetMember(id);
            _mapper.Map(memberForEditDto, memberFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating member {id} failed on save");
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(MemberForCreateDto memberForCreateDto)
        {
            var memberToCreate = new Member
            {
                Name = memberForCreateDto.Name,
                Gender = memberForCreateDto.Gender,
                DateOfBirth = memberForCreateDto.DateOfBirth,
                Phone = memberForCreateDto.Phone,
                Address = memberForCreateDto.Address,
                CreatedDate = memberForCreateDto.CreatedDate
            };

            var createdMember = await _repo.Create(memberToCreate);

            return StatusCode(201);
        
        }

        // [HttpGet("all")]
        // public async Task<IActionResult> GetAllMembers()
        // {
        //     var members = await _repo.GetAllMembers();

        //     var memberToReturn = _mapper.Map<IEnumerable<MemberForListDto>>(members);

        //     return Ok(memberToReturn);
        // }
    }
}