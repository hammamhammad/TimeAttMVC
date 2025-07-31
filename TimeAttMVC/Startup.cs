using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TimeAttMVC.Startup))]
namespace TimeAttMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
