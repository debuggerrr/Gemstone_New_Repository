using System.Web;
using System.Web.Mvc;

namespace GEMSTONE_WEB_API_ORIGINAL
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
