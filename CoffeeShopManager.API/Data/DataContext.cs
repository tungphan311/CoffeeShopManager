using CoffeeShopManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopManager.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base (options)
        {
            
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Product> Products {get; set;}
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}