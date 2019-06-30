using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Bills
{
    public interface IBillRepository
    {
         
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<PagedList<Bill>> GetBills(BillParams billParams);

        Task<Bill> GetBill(int id);

        int GetTotalRevenue(BillParams billParams);

        Task<Bill> Create(Bill bill);

        Task<BillDetail> CreateBillDetail(BillDetail billDetail);

        IEnumerable<BillDetail> GetBillDetails(int billID);
    }
}