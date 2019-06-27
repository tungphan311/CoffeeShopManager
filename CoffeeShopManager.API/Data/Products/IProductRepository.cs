using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Products
{
    public interface IProductRepository
    {
         void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<IEnumerable<Product>> GetProducts();

        Task<Product> GetProduct(int id);

        Task<IEnumerable<Product>> GetProductByType(int typeId);
    }
}