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
            CreateMap<Staff, StaffForDetailDto>()
                .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Team, TeamForViewDto>();
            CreateMap<Bill, BillForViewDto>();
            CreateMap<Product, ProductForViewDto>();
            CreateMap<ProductType, ProductTypeForViewDto>();
            CreateMap<ProductDetail, ProductDetailForViewDto>();

            CreateMap<Photo, PhotoForDetailDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}