namespace CoffeeShopManager.API.Models
{
    public class BillDetail
    {
        public int Id { get; set; }

        public int ProductDetailId  { get; set; }

        public int Amount { get; set; }
        
        public Bill Bill { get; set; }

        public int BillId { get; set; }
    }
}