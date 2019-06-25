using Microsoft.AspNetCore.Http;

namespace CoffeeShopManager.API.Dto
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }

        public IFormFile File { get; set; }

        public string Description { get; set; }

        public string PublicId { get; set; }
    }
}