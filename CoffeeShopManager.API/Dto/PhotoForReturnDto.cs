namespace CoffeeShopManager.API.Dto
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }
    }
}