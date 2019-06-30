using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.Bills
{
    public class BillRepository : IBillRepository
    {
        private readonly DataContext _context;

        public BillRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<Bill> Create(Bill bill)
        {
            await _context.Bills.AddAsync(bill);
            await _context.SaveChangesAsync();

            return bill;
        }

        public async Task<BillDetail> CreateBillDetail(BillDetail billDetail)
        {
            await _context.BillDetails.AddAsync(billDetail);
            await _context.SaveChangesAsync();

            return billDetail;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Bill> GetBill(int id)
        {
            var bill = await _context.Bills.FirstOrDefaultAsync(p => p.Id == id);

            return bill;
        }

        public async Task<IEnumerable<Bill>> GetBills()
        {
            var bills = await _context.Bills.ToListAsync();
            return bills;
        }

        public async Task<PagedList<Bill>> GetBills(BillParams billParams)
        {
            var bills = _context.Bills.AsQueryable();

            if (billParams.year!=0)
            {
                
                bills=bills.Where(b => b.CreatedDate.Year==billParams.year);
            }
            if (billParams.month!=0)
            {
                bills=bills.Where(b => b.CreatedDate.Month==billParams.month);
            }
            if (billParams.day!=0)
            {
                bills=bills.Where(b => b.CreatedDate.Day==billParams.day);
            }
            return await PagedList<Bill>.CreateAsync(bills,billParams.PageNumber, billParams.PageSize);

        }

        public IEnumerable<BillDetail> GetBillDetails(int billID)
        {
            var billDetails =  _context.BillDetails.ToList();

            var billsToReturn = billDetails.FindAll(b => b.BillId == billID);
            
            return billsToReturn;
        }

        public int GetTotalRevenue(BillParams billParams)
        {
            var bills = _context.Bills.AsQueryable();
            var total = 0;

            if (billParams.year!=0)
            {
                bills=bills.Where(b => b.CreatedDate.Year==billParams.year);
            }
            if (billParams.month!=0)
            {
                bills=bills.Where(b => b.CreatedDate.Month==billParams.month);
            }
            if (billParams.day!=0)
            {
                bills=bills.Where(b => b.CreatedDate.Day==billParams.day);
            }

            foreach(var bill in bills)
            {
                total += bill.Value;
            }

            return total;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}