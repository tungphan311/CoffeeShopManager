using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CoffeeShopManager.API.Data.Products;
using CoffeeShopManager.API.Data.Staffs;
using CoffeeShopManager.API.Data.Users;
using CoffeeShopManager.API.Dto;
using CoffeeShopManager.API.Helpers;
using CoffeeShopManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CoffeeShopManager.API.Controllers
{
    [Route("api/staff/{staffId}/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IStaffRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IStaffRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForStaff(int staffId,
            [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var staffFromRepo = await _repo.GetEmployee(staffId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!staffFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;
            if(staffFromRepo.Photo ==""||staffFromRepo.Photo==null||staffFromRepo.Photo=="https://makitweb.com/demo/broken_image/images/noimage.png"){
                staffFromRepo.Photo = photoForCreationDto.Url;
            }
            staffFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int staffId, int id){
            var staff = await _repo.GetEmployee(staffId);

            if(!staff.Photos.Any(p => p.Id == id ))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already main photo");

            var currenMainPhoto = await _repo.GetMainPhotoForEmployee(staffId);

            currenMainPhoto.IsMain = false;
            staff.Photo = "";

            photoFromRepo.IsMain = true;
            staff.Photo = photoFromRepo.Url;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not set photo to Main");
        }
    }
}