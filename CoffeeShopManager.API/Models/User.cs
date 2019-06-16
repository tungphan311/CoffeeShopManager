using System;

namespace CoffeeShopManager.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public int AccessCode { get; set; }

        public int StaffId { get; set; }
    }
}