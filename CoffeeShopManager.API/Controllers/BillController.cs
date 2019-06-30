using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data;
using CoffeeShopManager.API.Data.BillDetails;
using CoffeeShopManager.API.Data.Bills;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillRepository _repo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public BillController(IBillRepository repo, IMapper mapper, DataContext context)
        {
            _context = context;
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

        [HttpGet("bills/{id}")]
        public IEnumerable<BillDetailForViewDto> GetBillDetails(int id)
        {
            var billDetails =  _repo.GetBillDetails(id);

            var billsDetailForView = _mapper.Map<IEnumerable<BillDetailForViewDto>>(billDetails);

            return billsDetailForView;
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

        [HttpPost("create")]
        public async Task<IActionResult> Create(BillForCreateDto billForCreateDto)
        {
            var billToCreate = new Bill
            {
                StaffId = billForCreateDto.StaffId,
                MemberId = billForCreateDto.MemberId,
                CreatedDate = billForCreateDto.CreatedDate,
                Value = billForCreateDto.Value
            };

            var createdBill = await _repo.Create(billToCreate);

            var bills = _context.Bills.ToList();

            var id = bills[bills.Count - 1].Id;

            foreach (var detail in billForCreateDto.BillDetails)
            {
                var detailToCreate = new BillDetail
                {
                    BillId = id,
                    ProductDetailId = detail.ProductDetailId,
                    Amount = detail.Amount
                };

                var createBillDetail = await _repo.CreateBillDetail(detailToCreate);
            }

            return StatusCode(201);
        }
    }
}