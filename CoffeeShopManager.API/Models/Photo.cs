namespace CoffeeShopManager.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public Staff Staff { get; set; }

        public int StaffId { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }
    }
}