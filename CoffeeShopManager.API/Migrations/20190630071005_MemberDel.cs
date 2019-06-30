using Microsoft.EntityFrameworkCore.Migrations;

namespace CoffeeShopManager.API.Migrations
{
    public partial class MemberDel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Members",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Members");
        }
    }
}
