using System;

namespace projectcontact_app.Models
{
    public class Contact
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public int gender { get; set; }
        public DateTime? birth { get; set; }
        public string techno { get; set; }
        public string message { get; set; }
    }
}