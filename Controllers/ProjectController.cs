using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using projectcontact_app.Models;

namespace projectcontact_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectAppContext _context;  
        public ProjectController(ProjectAppContext context) {  
            _context = context;  
        } 
        
        [HttpGet]
        [Route("getAllProject")]
        public IEnumerable<Project> GetAll()
        {
            return _context.Project.ToList();
        }

         [HttpGet]
        [Route("getAllProjectNames")]
        public string[] getAllProjectNames()
        {
            return _context.Project.Select(x=>x.name).ToArray();
        }

        [HttpGet()]
        [Route("getProject")]
        public IActionResult GetById([FromQuery] long id)
        {
            var item = _context.Project.FirstOrDefault(t => t.id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        [Route("addProject")]
        public IActionResult Create([FromBody] Project item)
        {
            if (item == null)
            {
                return BadRequest(item);
            }
            _context.Project.Add(new Project
            {
                name = item.name               
            });
            _context.SaveChanges();

            return Ok( new { message= "Project is added successfully."});
        }

        [HttpPut()]
        [Route("updateProject")]
        public IActionResult Update([FromQuery] long id, [FromBody] Project item)
        {            
            if (item == null)
            {
                return BadRequest();
            }

            var Project = _context.Project.FirstOrDefault(t => t.id == item.id);
            if (Project == null)
            {
                return NotFound();
            }

            Project.name = item.name;           
            Project.message = item.message;
            _context.Project.Update(Project);
            _context.SaveChanges();
            return Ok( new { message= "Project is updated successfully."});
        }


        [HttpDelete()]
        [Route("deleteProject")]
        public IActionResult Delete([FromQuery] long id)
        {
            var project = _context.Project.FirstOrDefault(t => t.id == id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(project);
            _context.SaveChanges();
            return Ok( new { message= "Project is deleted successfully."});
        }
    }
}