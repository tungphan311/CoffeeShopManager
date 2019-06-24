using System;

namespace CoffeeShopManager.API.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public int MemberId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Value { get; set; }
        
    }
}