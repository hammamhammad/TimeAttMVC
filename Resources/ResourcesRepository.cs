
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;


namespace Resources
{
  public  class ResourcesRepository : GenericRepository<LocalizationDBModel>
    {
        public HashSet<Localizations> GetAll()
        {
            try
            {
                return Context.ExecuteToDataTable<Localizations>("tb_Localization_GetAll");
            }
            catch (Exception ex)
            {

                throw ex;
            }
         
        }

        public Localizations GetByID(int ID)
        {
           try
            {
                return Context.ExecuteToDataTable<Localizations>("tb_Localization_GetByID",new SqlParameter[] { new SqlParameter("@ID",ID) }).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int Rename(string resourceSet,string newResourceSet)
        {
            try
            {
                return Context.ExecuteNonQuery("tb_Localization_Rename", new SqlParameter[] { new SqlParameter("@ResourceSet", resourceSet), new SqlParameter("@NewResourceSet", newResourceSet) }, true).ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int CreateUpdate(Localizations localization)
        {
            try
            {
                return Context.ExecuteNonQuery("tb_Localization_CreateOrUpdate", new SqlParameter[] {
                    new SqlParameter("@ID", localization.ID),
                    new SqlParameter("@RName", localization.RName),
                    new SqlParameter("@RValueAR", localization.RValueAR),
                    new SqlParameter("@RValueEN", localization.RValueEN),
                    new SqlParameter("@ResourceSet", localization.ResourceSet)

                }, true).ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Delete(int iD)
        {
            try
            {
                return Context.ExecuteNonQuery("tb_Localization_Delete", new SqlParameter[] {
                    new SqlParameter("@ID", iD),
                   

                }, true).ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
