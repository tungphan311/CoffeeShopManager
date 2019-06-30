﻿// <auto-generated />
using System;
using CoffeeShopManager.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CoffeeShopManager.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190630071005_MemberDel")]
    partial class MemberDel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity("CoffeeShopManager.API.Models.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("MemberId");

                    b.Property<int>("StaffId");

                    b.Property<int>("Value");

                    b.HasKey("Id");

                    b.ToTable("Bills");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.BillDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<int>("BillId");

                    b.Property<int>("ProductDetailId");

                    b.HasKey("Id");

                    b.HasIndex("BillId");

                    b.ToTable("BillDetails");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<bool>("IsDelete");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.Property<string>("Photo");

                    b.Property<int>("TeamId");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Gender");

                    b.Property<bool>("IsDelete");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.Property<string>("Photo");

                    b.HasKey("Id");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<int>("EmployeeId");

                    b.Property<bool>("IsMain");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Photo");

                    b.Property<int>("TypeId");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.ProductDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Price");

                    b.Property<int>("ProductId");

                    b.Property<string>("Size");

                    b.HasKey("Id");

                    b.ToTable("ProductDetails");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.ProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProductTypes");
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

                    b.Property<string>("AccessCode");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<int>("StaffId");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.BillDetail", b =>
                {
                    b.HasOne("CoffeeShopManager.API.Models.Bill", "Bill")
                        .WithMany("BillDetails")
                        .HasForeignKey("BillId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CoffeeShopManager.API.Models.Photo", b =>
                {
                    b.HasOne("CoffeeShopManager.API.Models.Employee", "Employee")
                        .WithMany("Photos")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
