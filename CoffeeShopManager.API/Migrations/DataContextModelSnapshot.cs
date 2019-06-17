﻿// <auto-generated />
using System;
using CoffeeShopManager.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CoffeeShopManager.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity("CoffeeShopManager.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("StaffId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("StaffId")
                        .IsUnique();

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Staff", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.Property<int>("TeamId");

                    b.Property<int>("YearOfBirth");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Staffs");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessCode");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<int>("StaffId");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("StaffId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Photo", b =>
                {
                    b.HasOne("CoffeeShopManager.API.Models.Staff", "Staff")
                        .WithOne("Photo")
                        .HasForeignKey("CoffeeShopManager.API.Models.Photo", "StaffId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Staff", b =>
                {
                    b.HasOne("CoffeeShopManager.API.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.User", b =>
                {
                    b.HasOne("CoffeeShopManager.API.Models.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("StaffId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
