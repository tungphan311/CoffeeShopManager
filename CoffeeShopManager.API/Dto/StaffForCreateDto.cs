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
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Address{ get; set; }
        public string Photo { get; set; }
    }
}