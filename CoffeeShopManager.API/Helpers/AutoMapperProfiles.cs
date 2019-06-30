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

            CreateMap<Employee, StaffForListDto>()
                .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Employee, StaffForDetailDto>()
                .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            // CreateMap<Employee, StaffForFilterDto>()
            //     .ForMember(dest => dest.Age, opt =>{
            //         opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            //     });

            CreateMap<Team, TeamForViewDto>();
            CreateMap<Bill, BillForViewDto>();
            CreateMap<Product, ProductForViewDto>();
            CreateMap<ProductType, ProductTypeForViewDto>();
            CreateMap<ProductDetail, ProductDetailForViewDto>();

            CreateMap<Photo, PhotoForDetailDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            
            CreateMap<StaffForEditDto, Employee>();
            CreateMap<StaffForCreateDto, Employee>();
            CreateMap<StaffForEditDto, Employee>();
        }
    }
}