using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Gem_Stone_Service;

namespace Gem_Stone_Service.Controllers
{
    public class userRegistersController : ApiController
    {
        private GEMSTONE_VER_LIVEEntities4 db = new GEMSTONE_VER_LIVEEntities4();

        // GET: api/userRegisters
        public IQueryable<userRegister> GetuserRegisters()
        {
            return db.userRegisters;
        }

        // GET: api/userRegisters/5
        [ResponseType(typeof(userRegister))]
        public IHttpActionResult GetuserRegister(int id)
        {
            userRegister userRegister = db.userRegisters.Find(id);
            if (userRegister == null)
            {
                return NotFound();
            }

            return Ok(userRegister);
        }

        // PUT: api/userRegisters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutuserRegister(int id, userRegister userRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userRegister.id)
            {
                return BadRequest();
            }

            db.Entry(userRegister).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userRegisterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/userRegisters
        [ResponseType(typeof(userRegister))]
        public IHttpActionResult PostuserRegister(userRegister userRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.userRegisters.Add(userRegister);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userRegister.id }, userRegister);
        }

        // DELETE: api/userRegisters/5
        [ResponseType(typeof(userRegister))]
        public IHttpActionResult DeleteuserRegister(int id)
        {
            userRegister userRegister = db.userRegisters.Find(id);
            if (userRegister == null)
            {
                return NotFound();
            }

            db.userRegisters.Remove(userRegister);
            db.SaveChanges();

            return Ok(userRegister);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userRegisterExists(int id)
        {
            return db.userRegisters.Count(e => e.id == id) > 0;
        }
    }
}