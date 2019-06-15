using System.ComponentModel.DataAnnotations;

namespace CoffeeShopManager.API.Dto
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 6, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }
    }
}