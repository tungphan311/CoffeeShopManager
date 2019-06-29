using System;
using System.Collections.Generic;

namespace CoffeeShopManager.API.Dto
{
    public class BillForCreateDto
    {
        public int StaffId { get; set; }

        public int MemberId { get; set; }

        public DateTime CreatedDate { get; set; }
        
        public int Value { get; set; }

        public ICollection<BillDetailForCreateDto> BillDetails { get; set; }
    }
}