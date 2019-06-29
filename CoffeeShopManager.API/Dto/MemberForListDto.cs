using System.ComponentModel.DataAnnotations;
using System;
namespace CoffeeShopManager.API.Dto
{
    public class MemberFotListDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Gender { get; set; }

        public string Phone {get;set;}

        public string Address {get;set;}

        public int Age { get; set; }

        public string DateOfBirth {get;set;}

        public string CreatedDate {get;set;}
    }
}