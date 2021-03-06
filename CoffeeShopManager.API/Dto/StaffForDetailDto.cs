using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Dto
{
    public class StaffForDetailDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TeamId { get; set; }

        public string Gender { get; set; }

        public int Age { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Photo { get; set; }

        public ICollection<PhotoForDetailDto> Photos { get; set; }
    }
}