using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using CoffeeShopManager.API.Dto;

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

            if (employeeParams.Name != null) 
            {
                employees = employees.Where(e => e.Name.ToLower().Contains(employeeParams.Name));
            }

            if (employeeParams.Phone != null) {
                if (employeeParams.Phone.All(char.IsDigit)) 
                {
                    employees = employees.Where(e => e.Phone.Contains(employeeParams.Phone));
                }   
            }

            if (employeeParams.Address != null) 
            {
                employees = employees.Where(e => e.Address.ToLower().Contains(employeeParams.Address));
            }

            if (employeeParams.Gender != null) 
            {
                employees = employees.Where(e => e.Gender.ToLower().Contains(employeeParams.Gender));
            }

            // if (employeeParams.Age != null) {
            //     if (employeeParams.Age.All(char.IsDigit)) 
            //     {
            //         employees = employees.Where(e => e.Age.Contains(employeeParams.Age));
            //     }   
            // }

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

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();

            var available = employees.Where(x => !x.IsDelete);

            return available;
        }
    }
}