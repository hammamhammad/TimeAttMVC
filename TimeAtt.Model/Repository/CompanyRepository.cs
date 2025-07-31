using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Models;

namespace TimeAtt.Model
{
    public interface ICompanyRepository : IGenericRepository<CompanyInfo>
    {

        CompanyInfo GetSingle();
    }
    public class CompanyRepository : GenericRepository<TimeAttDBModel, CompanyInfo>, ICompanyRepository
    {
        public CompanyInfo GetSingle()
        {
            var result = Context.ExecuteToDataTable<CompanyInfo>("spGetOrganization");
            return result.SingleOrDefault();
        }

        public override IEnumerable< CompanyInfo> GetAll()
        {
            var result = Context.ExecuteToDataTable<CompanyInfo>("spGetOrganization");
            return result;
        }
        public string GetSettings(int sid)
        {
            var result = Context.ExecuteScaler("spGetSettingbyID",new SqlParameter[] { new SqlParameter("@sid", sid) });
            
            return result.ToNullableString();
        }
        public int Update(CompanyInfo Company)
        {
            try
            {
                var paras = new List<SqlParameter>();

                paras.Add(new SqlParameter("@org_name", Company.name.ToTrim()));
                if (Company.logo != null)
                {
                    paras.Add(new SqlParameter("@org_logo ", Company.logo));
                }
                var result = Context.ExecuteNonQuery("spsaveorganization", paras.ToArray(), true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
