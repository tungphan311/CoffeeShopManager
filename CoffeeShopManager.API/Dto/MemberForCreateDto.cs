using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using CoffeeShopManager.API.Models;
namespace CoffeeShopManager.API.Dto
{
    public class MemberForCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public string Address{ get; set; }
    }
}