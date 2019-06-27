using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.Bills;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Helpers;
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
        public async Task<IActionResult> GetBills([FromQuery]BillParams billParams)
        {
            var bills = await _repo.GetBills(billParams);

            var billsForView = _mapper.Map<IEnumerable<BillForViewDto>>(bills);

            Response.AddPagination(bills.CurrentPage, bills.PageSize, bills.TotalCount, bills.TotalPages);


            return Ok(billsForView);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBill(int id)
        {
            var bill = await _repo.GetBill(id);

            var billForView = _mapper.Map<BillForViewDto>(bill);

            return Ok(billForView);
        }

        [HttpGet("total")]
        public int GetTotalRevenue([FromQuery]BillParams billParams)
        {
            var bills = _repo.GetTotalRevenue(billParams);

            // var billsForView = _mapper.Map<IEnumerable<BillForViewDto>>(bills);

            // Response.AddPagination(bills.CurrentPage, bills.PageSize, bills.TotalCount, bills.TotalPages);


            return bills;
        }
    }
}