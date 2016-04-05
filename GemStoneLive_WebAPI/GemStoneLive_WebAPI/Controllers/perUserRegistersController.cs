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
    public class perUserRegistersController : ApiController
    {
        private GemStone_LIVEEntities9 db = new GemStone_LIVEEntities9();

        // GET: api/perUserRegisters
        public IQueryable<perUserRegister> GetperUserRegisters()
        {
            return db.perUserRegisters;
        }

        // GET: api/perUserRegisters
        public IQueryable<perUserRegister> GetperUserRegisters(string username,string password)
        {
            return db.perUserRegisters.Where(e=> e.userName==username && e.passWord==password);
        }

        // GET: api/perUserRegisters
        public IQueryable<perUserRegister> GetperUserRegisters(string username)
        {
            return db.perUserRegisters.Where(e => e.userName == username);
        }


        // GET: api/perUserRegisters/5
        [ResponseType(typeof(perUserRegister))]
        public IHttpActionResult GetperUserRegister(int id)
        {
            perUserRegister perUserRegister = db.perUserRegisters.Find(id);
            if (perUserRegister == null)
            {
                return NotFound();
            }

            return Ok(perUserRegister);
        }

        // PUT: api/perUserRegisters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutperUserRegister(int id, perUserRegister perUserRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != perUserRegister.id)
            {
                return BadRequest();
            }

            db.Entry(perUserRegister).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!perUserRegisterExists(id))
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

        // POST: api/perUserRegisters
        [ResponseType(typeof(perUserRegister))]
        public IHttpActionResult PostperUserRegister(perUserRegister perUserRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.perUserRegisters.Add(perUserRegister);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = perUserRegister.id }, perUserRegister);
        }

        // DELETE: api/perUserRegisters/5
        [ResponseType(typeof(perUserRegister))]
        public IHttpActionResult DeleteperUserRegister(int id)
        {
            perUserRegister perUserRegister = db.perUserRegisters.Find(id);
            if (perUserRegister == null)
            {
                return NotFound();
            }

            db.perUserRegisters.Remove(perUserRegister);
            db.SaveChanges();

            return Ok(perUserRegister);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool perUserRegisterExists(int id)
        {
            return db.perUserRegisters.Count(e => e.id == id) > 0;
        }
    }
}