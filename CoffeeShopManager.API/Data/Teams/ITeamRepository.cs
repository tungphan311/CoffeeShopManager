using System.Collections.Generic;
using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.Teams
{
    public interface ITeamRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Team>> GetTeams();
        Task<Team> GetTeam(int id);
         
    }
}