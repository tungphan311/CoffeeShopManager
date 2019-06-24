using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using Microsoft.AspNetCore.Mvc;
using CoffeeShopManager.API.Data.Teams;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _repo;
        private readonly IMapper _mapper;
        public TeamController(ITeamRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            var teams = await _repo.GetTeams();

            var teamsToReturn = _mapper.Map<IEnumerable<TeamForViewDto>>(teams);

            return Ok(teamsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeam(int id)
        {
            var team = await _repo.GetTeam(id);

            var teamToReturn = _mapper.Map<TeamForViewDto>(team);

            return Ok(teamToReturn);
        }
    }
}