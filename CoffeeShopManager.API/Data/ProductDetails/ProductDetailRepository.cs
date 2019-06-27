using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.ProductDetails
{
    public class ProductDetailRepository : IProductDetailRepository
    {
        private readonly DataContext _context;
        public ProductDetailRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ProductDetail>> GetProductDetail(int id)
        {
            var detail = await _context.ProductDetails.ToListAsync();

            var detailWithId = detail.FindAll(x => x.ProductId == id);

            return detailWithId;
        }

        public async Task<ProductDetail> GetProductDetailById(int id)
        {
            var detail = await _context.ProductDetails.FirstOrDefaultAsync(x => x.Id == id);

            return detail;
        }

        public async Task<IEnumerable<ProductDetail>> GetProductDetails()
        {
            var details = await _context.ProductDetails.ToListAsync();

            return details;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}