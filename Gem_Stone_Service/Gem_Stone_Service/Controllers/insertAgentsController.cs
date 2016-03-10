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
    public class insertAgentsController : ApiController
    {
        private GEMSTONE_VER_LIVEEntities6 db = new GEMSTONE_VER_LIVEEntities6();

        // GET: api/insertAgents
        public IQueryable<insertAgent> GetinsertAgents()
        {
            return db.insertAgents;
        }

        // GET: api/insertAgents/5
        [ResponseType(typeof(insertAgent))]
        public IHttpActionResult GetinsertAgent(int id)
        {
            insertAgent insertAgent = db.insertAgents.Find(id);
            if (insertAgent == null)
            {
                return NotFound();
            }

            return Ok(insertAgent);
        }

        // PUT: api/insertAgents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutinsertAgent(int id, insertAgent insertAgent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != insertAgent.id)
            {
                return BadRequest();
            }

            db.Entry(insertAgent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!insertAgentExists(id))
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

        // POST: api/insertAgents
        [ResponseType(typeof(insertAgent))]
        public IHttpActionResult PostinsertAgent(insertAgent insertAgent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.insertAgents.Add(insertAgent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = insertAgent.id }, insertAgent);
        }

        // DELETE: api/insertAgents/5
        [ResponseType(typeof(insertAgent))]
        public IHttpActionResult DeleteinsertAgent(int id)
        {
            insertAgent insertAgent = db.insertAgents.Find(id);
            if (insertAgent == null)
            {
                return NotFound();
            }

            db.insertAgents.Remove(insertAgent);
            db.SaveChanges();

            return Ok(insertAgent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool insertAgentExists(int id)
        {
            return db.insertAgents.Count(e => e.id == id) > 0;
        }
    }
}