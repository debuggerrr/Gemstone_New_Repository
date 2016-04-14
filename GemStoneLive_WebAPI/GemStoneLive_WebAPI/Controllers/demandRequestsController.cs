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
    public class demandRequestsController : ApiController
    {
        private GemStone_LIVEEntities db = new GemStone_LIVEEntities();

        // GET: api/demandRequests
        public IQueryable<demandRequest> GetdemandRequests()
        {
            return db.demandRequests;
        }

        // GET: api/demandRequests/5
        [ResponseType(typeof(demandRequest))]
        public IHttpActionResult GetdemandRequest(int id)
        {
            demandRequest demandRequest = db.demandRequests.Find(id);
            if (demandRequest == null)
            {
                return NotFound();
            }

            return Ok(demandRequest);
        }

        // PUT: api/demandRequests/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutdemandRequest(int id, demandRequest demandRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != demandRequest.Id)
            {
                return BadRequest();
            }

            db.Entry(demandRequest).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!demandRequestExists(id))
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

        // POST: api/demandRequests
        [ResponseType(typeof(demandRequest))]
        public IHttpActionResult PostdemandRequest(demandRequest demandRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.demandRequests.Add(demandRequest);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = demandRequest.Id }, demandRequest);
        }

        // DELETE: api/demandRequests/5
        [ResponseType(typeof(demandRequest))]
        public IHttpActionResult DeletedemandRequest(int id)
        {
            demandRequest demandRequest = db.demandRequests.Find(id);
            if (demandRequest == null)
            {
                return NotFound();
            }

            db.demandRequests.Remove(demandRequest);
            db.SaveChanges();

            return Ok(demandRequest);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool demandRequestExists(int id)
        {
            return db.demandRequests.Count(e => e.Id == id) > 0;
        }
    }
}