using System;
using System.Reflection;

namespace GEMSTONE_WEB_API_ORIGINAL.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}