using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.ProductDetails
{
    public interface IProductDetailRepository
    {
        Task<bool> SaveAll();

        Task<IEnumerable<ProductDetail>> GetProductDetails();

        Task<IEnumerable<ProductDetail>> GetProductDetail(int id);

        Task<ProductDetail> GetProductDetailById(int id);
    }
}