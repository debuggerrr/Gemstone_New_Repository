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
    public class itemDetailsController : ApiController
    {
        private GemStone_LIVEEntities2 db = new GemStone_LIVEEntities2();

        // GET: api/itemDetails
        public IQueryable<itemDetail> GetitemDetails()
        {
            return db.itemDetails;
        }

        // GET: api/itemDetails
        public IQueryable<itemDetail> GetitemDetails(string name_user)
        {
            return db.itemDetails.Where(e => e.userNames == name_user);
        }

        // GET: api/itemDetails/5
        [ResponseType(typeof(itemDetail))]
        public IHttpActionResult GetitemDetail(int id)
        {
            itemDetail itemDetail = db.itemDetails.Find(id);
            if (itemDetail == null)
            {
                return NotFound();
            }

            return Ok(itemDetail);
        }

        // PUT: api/itemDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutitemDetail(int id, itemDetail itemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemDetail.id)
            {
                return BadRequest();
            }

            db.Entry(itemDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!itemDetailExists(id))
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

        // POST: api/itemDetails
        [ResponseType(typeof(itemDetail))]
        public IHttpActionResult PostitemDetail(itemDetail itemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.itemDetails.Add(itemDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = itemDetail.id }, itemDetail);
        }

        // DELETE: api/itemDetails/5
        [ResponseType(typeof(itemDetail))]
        public IHttpActionResult DeleteitemDetail(int id)
        {
            itemDetail itemDetail = db.itemDetails.Find(id);
            if (itemDetail == null)
            {
                return NotFound();
            }

            db.itemDetails.Remove(itemDetail);
            db.SaveChanges();

            return Ok(itemDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool itemDetailExists(int id)
        {
            return db.itemDetails.Count(e => e.id == id) > 0;
        }
    }
}