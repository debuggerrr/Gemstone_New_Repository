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
    public class soldItemDetailsController : ApiController
    {
        private GemStone_LIVEEntities10 db = new GemStone_LIVEEntities10();

        // GET: api/soldItemDetails
        public IQueryable<soldItemDetail> GetsoldItemDetails()
        {
            return db.soldItemDetails;
        }

        // GET: api/soldItemDetails/5
        [ResponseType(typeof(soldItemDetail))]
        public IHttpActionResult GetsoldItemDetail(int id)
        {
            soldItemDetail soldItemDetail = db.soldItemDetails.Find(id);
            if (soldItemDetail == null)
            {
                return NotFound();
            }

            return Ok(soldItemDetail);
        }

        // PUT: api/soldItemDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutsoldItemDetail(int id, soldItemDetail soldItemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != soldItemDetail.id)
            {
                return BadRequest();
            }

            db.Entry(soldItemDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!soldItemDetailExists(id))
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

        // POST: api/soldItemDetails
        [ResponseType(typeof(soldItemDetail))]
        public IHttpActionResult PostsoldItemDetail(soldItemDetail soldItemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.soldItemDetails.Add(soldItemDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = soldItemDetail.id }, soldItemDetail);
        }

        // DELETE: api/soldItemDetails/5
        [ResponseType(typeof(soldItemDetail))]
        public IHttpActionResult DeletesoldItemDetail(int id)
        {
            soldItemDetail soldItemDetail = db.soldItemDetails.Find(id);
            if (soldItemDetail == null)
            {
                return NotFound();
            }

            db.soldItemDetails.Remove(soldItemDetail);
            db.SaveChanges();

            return Ok(soldItemDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool soldItemDetailExists(int id)
        {
            return db.soldItemDetails.Count(e => e.id == id) > 0;
        }
    }
}