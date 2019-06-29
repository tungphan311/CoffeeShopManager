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

        Task<PagedList<Employee>> GetEmployees(EmployeeParams employeeParams);

        Task<Employee> GetEmployee(int id);
        
        Task<Employee> Create(Employee employee);

        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForEmployee(int employeeId);
    }
}