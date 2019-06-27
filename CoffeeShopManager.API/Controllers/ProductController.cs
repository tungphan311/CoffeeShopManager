using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.Products;
using CoffeeShopManager.API.Dto;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController: ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet] 
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();

            var productsForView = _mapper.Map<IEnumerable<ProductForViewDto>>(products);

            return Ok(productsForView);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);

            var productForView = _mapper.Map<ProductForViewDto>(product);

            return Ok(productForView);
        }

        [HttpGet("type/{id}")]
        public async Task<IActionResult> GetProductByType(int id)
        {
            var products = await _repo.GetProductByType(id);

            var productsForView = _mapper.Map<IEnumerable<ProductForViewDto>>(products);

            return Ok(productsForView); 
        }
    }
}