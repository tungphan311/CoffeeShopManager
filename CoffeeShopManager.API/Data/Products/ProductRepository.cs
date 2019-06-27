using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.Products
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProductByType(int typeId)
        {
            var products = await _context.Products.ToListAsync(); 

            var productByType = products.FindAll(x => x.TypeId == typeId);

            return productByType;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return products;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}