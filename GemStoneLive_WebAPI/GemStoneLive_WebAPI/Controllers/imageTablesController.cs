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
    public class imageTablesController : ApiController
    {
        private GemStone_LIVEEntities1 db = new GemStone_LIVEEntities1();

        // GET: api/imageTables
        public IQueryable<imageTable> GetimageTables()
        {
            return db.imageTables;
        }

        // GET: api/imageTables/5
        [ResponseType(typeof(imageTable))]
        public IHttpActionResult GetimageTable(int id)
        {
            imageTable imageTable = db.imageTables.Find(id);
            if (imageTable == null)
            {
                return NotFound();
            }

            return Ok(imageTable);
        }

        // PUT: api/imageTables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutimageTable(int id, imageTable imageTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imageTable.Id)
            {
                return BadRequest();
            }

            db.Entry(imageTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!imageTableExists(id))
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

        // POST: api/imageTables
        [ResponseType(typeof(imageTable))]
        public IHttpActionResult PostimageTable(imageTable imageTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.imageTables.Add(imageTable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imageTable.Id }, imageTable);
        }

        // DELETE: api/imageTables/5
        [ResponseType(typeof(imageTable))]
        public IHttpActionResult DeleteimageTable(int id)
        {
            imageTable imageTable = db.imageTables.Find(id);
            if (imageTable == null)
            {
                return NotFound();
            }

            db.imageTables.Remove(imageTable);
            db.SaveChanges();

            return Ok(imageTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool imageTableExists(int id)
        {
            return db.imageTables.Count(e => e.Id == id) > 0;
        }
    }
}