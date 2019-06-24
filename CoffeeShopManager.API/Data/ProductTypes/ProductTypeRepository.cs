using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.ProductTypes
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly DataContext _context;
        public ProductTypeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ProductType> GetProductType(int id)
        {
            var type = await _context.ProductTypes.FirstOrDefaultAsync(t => t.Id == id);

            return type;
        }

        public async Task<IEnumerable<ProductType>> GetProductTypes()
        {
            var types = await _context.ProductTypes.ToListAsync();

            return types;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}