using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.BillDetails
{
    public interface IBillDetailRepository
    {
        Task<BillDetail> Create(BillDetail billDetail);
    }
}