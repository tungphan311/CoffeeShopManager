using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.ProductDetails;
using CoffeeShopManager.API.Dto;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailController : ControllerBase
    {
        private readonly IProductDetailRepository _repo;
        private readonly IMapper _mapper;
        public ProductDetailController(IProductDetailRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductDetails()
        {
            var details = await _repo.GetProductDetails();

            var detailsForView = _mapper.Map<IEnumerable<ProductDetailForViewDto>>(details);

            return Ok(detailsForView);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetail(int id)
        {
            var detail = await _repo.GetProductDetail(id);

            var detailForView = _mapper.Map<IEnumerable<ProductDetailForViewDto>>(detail);

            return Ok(detailForView);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetProductDetailById(int id)
        {
            var detail = await _repo.GetProductDetailById(id);

            var detailForView = _mapper.Map<ProductDetailForViewDto>(detail);

            return Ok(detailForView);
        }
    }
}