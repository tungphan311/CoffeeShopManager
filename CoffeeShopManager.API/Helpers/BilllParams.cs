using System;

namespace CoffeeShopManager.API.Helpers
{
    public class BillParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get;set;} = 1;
        private int pageSize = 100;
        public int PageSize
        {
            get { return pageSize = 100;}
            set { pageSize = (value> MaxPageSize) ? MaxPageSize : value;}
        }

        public int BillID {get; set;}

        public int year { get; set; }
        public int month {get; set;}
        public int day {get; set;}
    }
}