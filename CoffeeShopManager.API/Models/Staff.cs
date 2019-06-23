namespace CoffeeShopManager.API.Models
{
    public class Staff
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Team Team { get; set; }

        public int TeamId { get; set; }

        public string Gender { get; set; }

        public int YearOfBirth { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string Photo { get; set; }
    }
}