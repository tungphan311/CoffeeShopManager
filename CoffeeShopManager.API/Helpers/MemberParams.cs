namespace CoffeeShopManager.API.Helpers
{
    public class MemberParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get;set;} = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value> MaxPageSize) ? MaxPageSize : value;}
        }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Gender { get; set; }

    }
}