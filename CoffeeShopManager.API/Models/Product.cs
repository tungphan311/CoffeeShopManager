using System.Collections.Generic;

namespace CoffeeShopManager.API.Models
{
    public class Product
    {
        public int Id { get; set;}
        
        public string SizeID {get; set;}

        public string TypeOfProductID {get; set;}

        public string Name {get; set;}

        public string Price {get; set;}

        public string Photo { get; set; }
    }
}