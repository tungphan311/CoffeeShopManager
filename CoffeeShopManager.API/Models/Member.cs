using System;

namespace CoffeeShopManager.API.Models
{
    public class Member
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Gender { get; set; }

        public string Phone { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Photo { get; set; }
    }
}