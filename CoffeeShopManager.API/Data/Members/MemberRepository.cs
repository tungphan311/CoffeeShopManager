using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data.Members
{
    public class MemberRepository: IMemberRepository
    {
        private readonly DataContext _context;
        public MemberRepository(DataContext context)
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

        public async Task<Member> GetMember(int id)
        {
            var member = await _context.Members.FirstOrDefaultAsync(u => u.Id == id);

            return member;
        }

        public async Task<PagedList<Member>> GetMembers(MemberParams memberParams)
        {
            var members = _context.Members;

            return await PagedList<Member>.CreateAsync(members, memberParams.PageNumber, memberParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Member> Create (Member member){
            await _context.Members.AddAsync(member);
            await _context.SaveChangesAsync();

            return member;
        }
        
    }
}