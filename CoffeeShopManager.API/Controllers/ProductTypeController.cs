using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CoffeeShopManager.API.Data.ProductTypes;
using CoffeeShopManager.API.Dto;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private readonly IProductTypeRepository _repo;
        private readonly IMapper _mapper;
        public ProductTypeController(IProductTypeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductTypes()
        {
            var types = await _repo.GetProductTypes();

            var typesForView = _mapper.Map<IEnumerable<ProductTypeForViewDto>>(types);

            return Ok(typesForView);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductType(int id)
        {
            var type = await _repo.GetProductType(id);

            var typeForView = _mapper.Map<ProductTypeForViewDto>(type);

            return Ok(typeForView);
        }
    }
}