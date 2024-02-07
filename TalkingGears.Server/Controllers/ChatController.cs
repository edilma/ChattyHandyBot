using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TalkingGears.Server.Models;

namespace TalkingGears.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        public IActionResult PostMessage([FromBody] MessageModel message)
        {
            
            return Ok(message);
        }
    }
}
