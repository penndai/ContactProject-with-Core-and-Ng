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
     public class SelectionController : ControllerBase
     {
        private readonly ProjectAppContext _context;
        public SelectionController(ProjectAppContext context) {  
            _context = context;  
        } 

        [HttpGet]
        [Route("getAllSelection")]
        public IEnumerable<Selection> GetAll()
        {
            return _context.Selection.ToList();
        }

         [HttpPost]
        [Route("addSelection")]
        public IActionResult Create([FromBody] Selection item)
        {
            if (item == null)
            {
                return BadRequest(item);
            }
            _context.Selection.Add(new Selection
            {
                project = item.project,
                contact = item.contact          
            });

            _context.SaveChanges();

            return Ok( new { message= "Selection is added successfully."});
        }

        [HttpPut()]
        [Route("updateSelection")]
        public IActionResult Update([FromQuery] long id, [FromBody] Selection item)
        {            
            if (item == null)
            {
                return BadRequest();
            }

            var Selection = _context.Selection.FirstOrDefault(t => t.id == item.id);
            if (Selection == null)
            {
                return NotFound();
            }

            Selection.project = item.project;           
            Selection.contact = item.contact;
            _context.Selection.Update(Selection);
            _context.SaveChanges();
            return Ok( new { message= "Selection is updated successfully."});
        }


        [HttpDelete()]
        [Route("deleteSelection")]
        public IActionResult Delete([FromQuery] long id)
        {
            var selection = _context.Selection.FirstOrDefault(t => t.id == id);
            if (selection == null)
            {
                return NotFound();
            }

            _context.Selection.Remove(selection);
            _context.SaveChanges();
            return Ok( new { message= "Selection is deleted successfully."});
        }
     }
}