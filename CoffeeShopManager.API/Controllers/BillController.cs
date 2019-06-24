using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.Bills;
using CoffeeShopManager.API.Dto;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController: ControllerBase
    {
        private readonly IBillRepository _repo;
        private readonly IMapper _mapper;
        public BillController(IBillRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet] 
        public async Task<IActionResult> GetBills()
        {
            var bills = await _repo.GetBills();

            var billsForView = _mapper.Map<IEnumerable<BillForViewDto>>(bills);

            return Ok(billsForView);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBill(int id)
        {
            var bill = await _repo.GetBill(id);

            var billForView = _mapper.Map<BillForViewDto>(bill);

            return Ok(billForView);
        }
    }
}