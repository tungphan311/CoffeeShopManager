using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Dto
{
    public class BillDetailForViewDto
    {
        public int Id { get; set; }

        public int ProductDetailId  { get; set; }

        public int Amount { get; set; }
        
        public int BillId { get; set; }
    }
}