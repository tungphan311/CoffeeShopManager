using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Staffs
{
    public interface IStaffRepository
    {
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        // Task<PagedList<Staff>> GetStaffs(StaffParams stafParams);

        // Task<Staff> GetStaff(int id);
        
        // Task<Staff> Create(Staff staff);
    }
}