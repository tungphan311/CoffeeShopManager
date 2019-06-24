using AutoMapper;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Models;
using CoffeeShopManager.API.Helpers;

namespace CoffeeShopManager.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForViewDto>();
            CreateMap<Staff, StaffForListDto>()
                .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Staff, StaffForDetailDto>();
            CreateMap<Team, TeamForViewDto>();
        }
    }
}