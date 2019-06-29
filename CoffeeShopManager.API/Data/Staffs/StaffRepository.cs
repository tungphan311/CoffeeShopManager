using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
            var employee = await _context.Employees.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return employee;
        }

        public async Task<PagedList<Employee>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees = _context.Employees.Include(p => p.Photos).AsQueryable();

            employees = employees.Where(e => e.IsDelete == false);

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

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);

            return photo;   
        }
        public async Task<Photo> GetMainPhotoForEmployee(int employeeId){
            return await _context.Photos.Where(u => u.EmployeeId == employeeId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }
    }
}