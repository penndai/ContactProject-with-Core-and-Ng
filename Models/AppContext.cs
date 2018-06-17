using Microsoft.EntityFrameworkCore;
namespace projectcontact_app.Models
{
    public class ProjectAppContext : DbContext
    {
          public ProjectAppContext(DbContextOptions<ProjectAppContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contact { get; set; }
        public DbSet<Project> Project { get; set; }

        public DbSet<Selection> Selection {get;set;}

    }
}