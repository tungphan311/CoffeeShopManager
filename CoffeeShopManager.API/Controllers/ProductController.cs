using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.Products;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        // [HttpGet] 
        // public async Task<IActionResult> GetProducts()
        // {
        //     var products = await _repo.GetProducts();

        //     return Ok(products);
        // }
    }
}