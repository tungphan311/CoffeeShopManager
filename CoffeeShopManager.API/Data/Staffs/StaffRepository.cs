using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.Staffs
{
    public class StaffRepository: IStaffRepository
    {
        private readonly DataContext _context;
        public StaffRepository(DataContext context)
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

        public async Task<Employee> GetEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(u => u.Id == id);

            return employee;
        }

        public async Task<PagedList<Employee>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees = _context.Employees;

            return await PagedList<Employee>.CreateAsync(employees, employeeParams.PageNumber, employeeParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Employee> Create (Employee employee){
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return employee;
        }
    }
}