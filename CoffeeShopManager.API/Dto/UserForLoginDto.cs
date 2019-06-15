using System.ComponentModel.DataAnnotations;

namespace CoffeeShopManager.API.Dto
{
    public class UserForLoginDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}