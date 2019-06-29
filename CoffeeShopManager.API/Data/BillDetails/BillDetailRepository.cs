using System.Threading.Tasks;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Data.BillDetails
{
    public class BillDetailRepository : IBillDetailRepository
    {
        private readonly DataContext context;
        public BillDetailRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<BillDetail> Create(BillDetail billDetail)
        {
            await context.BillDetails.AddAsync(billDetail);
            await context.SaveChangesAsync();

            return billDetail;
        }
    }
}