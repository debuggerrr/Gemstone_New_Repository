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
using GemStoneLive_WebAPI;

namespace GemStoneLive_WebAPI.Controllers
{
    public class userRegistersController : ApiController
    {
        private GemStone_LIVEEntities12 db = new GemStone_LIVEEntities12();

        // GET: api/userRegisters
        public IQueryable<userRegister> GetuserRegisters()
        {
            return db.userRegisters;
        }

        // GET: api/userRegisters
        public IQueryable<userRegister> GetuserRegisters(string user)
        {
            return db.userRegisters.Where(e => e.userName == user);
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