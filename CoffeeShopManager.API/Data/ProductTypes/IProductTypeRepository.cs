using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.ProductTypes
{
    public interface IProductTypeRepository
    {
        Task<bool> SaveAll();

        Task<IEnumerable<ProductType>> GetProductTypes();

        Task<ProductType> GetProductType(int id);
    }
}