using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Bills
{
    public interface IBillRepository
    {
         
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<IEnumerable<Bill>> GetBills();

        Task<Bill> GetBill(int id);
    }
}