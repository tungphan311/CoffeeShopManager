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

        public async Task<Staff> GetStaff(int id)
        {
            var staff = await _context.Staffs.FirstOrDefaultAsync(u => u.Id == id);

            return staff;
        }

        public async Task<PagedList<Staff>> GetStaffs(StaffParams staffParams)
        {
            var staffs = _context.Staffs;

            return await PagedList<Staff>.CreateAsync(staffs, staffParams.PageNumber, staffParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}