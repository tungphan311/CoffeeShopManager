using System.ComponentModel.DataAnnotations;
using System;

namespace CoffeeShopManager.API.Dto
{
    public class MemberForEditDto
    {
        public string Name { get; set; }

        public string Gender { get; set; }

        public int Age { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }
        public string Photo { get; set; }
        public DateTime DateOfBirth{get;set;}
        public bool IsDelete { get; set; }

        public DateTime CreatedDate {get;set;}

        public int Point { get; set; }
    }
}