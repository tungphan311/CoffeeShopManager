using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Members
{
    public interface IMemberRepository
    {
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<PagedList<Member>> GetMembers(MemberParams memberParams);

        Task<Member> GetMember(int id);

        // Task<IEnumerable<Member>> GetAllMembers();

        Task<Member> Create(Member member);
    }
}