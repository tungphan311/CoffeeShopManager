using System;
using System.Collections.Generic;
using CoffeeShopManager.API.Models;
using Newtonsoft.Json;

namespace CoffeeShopManager.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUser()
        {
            var userData = System.IO.File.ReadAllText("Data/Seed/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);

            var productType = System.IO.File.ReadAllText("Data/Seed/ProductTypeSeedData.json");
            var types = JsonConvert.DeserializeObject<List<ProductType>>(productType);

            var productData = System.IO.File.ReadAllText("Data/Seed/ProductSeedData.json");
            var products = JsonConvert.DeserializeObject<List<Product>>(productData);

            var productDetailData = System.IO.File.ReadAllText("Data/Seed/ProductDetailSeedData.json");
            var details = JsonConvert.DeserializeObject<List<ProductDetail>>(productDetailData);
            
            var teamData = System.IO.File.ReadAllText("Data/Seed/Teams.json");
            var teams = JsonConvert.DeserializeObject<List<Team>>(teamData);

            var employeeData = System.IO.File.ReadAllText("Data/Seed/Staffs.json");
            var employees = JsonConvert.DeserializeObject<List<Employee>>(employeeData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                _context.Users.Add(user);
            }

            foreach (var employee in employees)
            {
                _context.Employees.Add(employee);
            }
            foreach (var team in teams)
            {
                _context.Teams.Add(team);
            }

            foreach (var type in types)
            {
                _context.ProductTypes.Add(type);
            }

            foreach (var product in products)
            {
                _context.Products.Add(product);
            }

            foreach (var detail in details)
            {
                _context.ProductDetails.Add(detail);
            }

            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}