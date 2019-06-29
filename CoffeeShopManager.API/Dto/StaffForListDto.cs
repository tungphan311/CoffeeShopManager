using System.ComponentModel.DataAnnotations;
using System;
namespace CoffeeShopManager.API.Dto
{
    public class StaffForListDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TeamId { get; set; }

        public string Gender { get; set; }

        public string Phone {get;set;}

        public string Address {get;set;}

        public int Age { get; set; }
        public bool IsDelete { get; set; }

        public string DateOfBirth {get;set;}

        //public string Phone { get; set; }

        //public string Email { get; set; }

        //public string Address { get; set; }

        public string Photo {get;set;}
    }
}