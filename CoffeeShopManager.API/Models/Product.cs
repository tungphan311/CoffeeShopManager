using System.Collections.Generic;

namespace CoffeeShopManager.API.Models
{
    public class Product
    {
        public int Id { get; set;}

        public string Name {get; set;}

        public int TypeId { get; set; }

        public string Photo { get; set; }
    }
}