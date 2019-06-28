using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using CoffeeShopManager.API.Models;
namespace CoffeeShopManager.API.Dto
{
    public class StaffForCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int TeamId { get; set; }
        [Required]
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address{ get; set; }
        public string Photo { get; set; }
    }
}