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
    public class ContactController : ControllerBase
    {
        private readonly ProjectAppContext _context;  
        public ContactController(ProjectAppContext context) {  
            _context = context;  
        } 
        
        [HttpGet]
        [Route("getAllContact")]
        public IEnumerable<Contact> GetAll()
        {
            return _context.Contact.ToList();
        }

        [HttpGet]
        [Route("getAllContactNames")]
        public string[] getAllContactNames()
        {
            return _context.Contact.Select(x=>x.name).ToArray();
        }

        [HttpGet()]
        [Route("getContact")]
        public IActionResult GetById([FromQuery] long id)
        {
            // filter contact records by contact id
            var item = _context.Contact.FirstOrDefault(t => t.id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        [Route("addContact")]
        public IActionResult Create([FromBody] Contact item)
        {
            // set bad request if contact data is not provided in body
            if (item == null)
            {
                return BadRequest();
            }
            _context.Contact.Add(new Contact
            {
                name = item.name,
                email = item.email,
                gender = item.gender,
                birth = item.birth,
                techno = item.techno,
                message = item.message              
            });
            _context.SaveChanges();

            return Ok( new { message= "Contact is added successfully."});
        }

        [HttpPut]
        [Route("updateContact")]
        public IActionResult Update([FromQuery] long id, [FromBody] Contact item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var contact = _context.Contact.FirstOrDefault(t => t.id == item.id);
            if (contact == null)
            {
                return NotFound();
            }

            contact.name = item.name; 
            contact.email = item.email;
            contact.gender = item.gender;
            contact.birth = item.birth;
            contact.techno = item.techno;
            contact.message = item.message;          

            _context.Contact.Update(contact);
            _context.SaveChanges();
            return Ok( new { message= "Contact is updated successfully."});
        }
        
        [HttpDelete]
        [Route("deleteContact")]
        public IActionResult Delete([FromQuery] long id)
        {
            var contact = _context.Contact.FirstOrDefault(t => t.id == id);
            
            if (contact == null)
            {
                return NotFound("id: " + id);
            }

            _context.Contact.Remove(contact);
            _context.SaveChanges();
            return Ok( new { message= "Contact is deleted successfully."});
        }
    }
}