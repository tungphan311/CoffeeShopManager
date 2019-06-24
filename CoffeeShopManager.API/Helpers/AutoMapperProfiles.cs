using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;

namespace CoffeeShopManager.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForViewDto>();
            CreateMap<Staff, StaffForListDto>();
            CreateMap<Staff, StaffForDetailDto>();
            CreateMap<Bill, BillForViewDto>();
        }
    }
}