using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;


namespace Resources
{
    public class DBContextBase : DbContext
    {
        public string ClientKey { get; private set; }
        public string DbName { get; private set; }

        private static string GetConnectionString(string Key)
        {
            if (ConfigurationManager.ConnectionStrings[Key] != null)
                return ConfigurationManager.ConnectionStrings[Key].ConnectionString;
            else
                return "";
        }

        /// We make use of the DbContext constructor overload that accepts a
        /// connection string to connect to.

        public DBContextBase(string clientKey)
            : base(GetClientConnectionString(clientKey))
        {
            ClientKey = clientKey;
        }
        public DBContextBase(string clientKey,string dbName)
            : base(GetClientConnectionString(clientKey, dbName))
        {
            ClientKey = clientKey;
            DbName = dbName;
        }

        /// There's a static method in one of our base assemblies that returns a
        /// client's database connection string based on the client's short name.

        public static string GetClientConnectionString(string clientKey,string dbName="")
        {
            try
            {
                if (dbName == "")
                    return GetConnectionString(clientKey);
                else
                {

                    SqlConnectionStringBuilder cb = new SqlConnectionStringBuilder(GetConnectionString(clientKey));
                    cb.InitialCatalog = dbName;
                    return cb.ConnectionString;

                }
            }
            catch (Exception ex)
            {
                
                throw new Exception("Company Database not set for user or Database not accessible");
            }
          
        }

        private DbCommand getCommand(string command)
        {
            var cmd = this.Database.Connection.CreateCommand();
            cmd.CommandText = command;
            return cmd;
        }
        private SqlParameter GetReturnParameter()
        {
            SqlParameter retpara = new SqlParameter();
            retpara.ParameterName = "ReturnValue";
            retpara.Direction = ParameterDirection.ReturnValue;
            return retpara;
        }
        private DbConnection Connection { get { return this.Database.Connection; } }
        public object ExecuteScaler(string SpName, SqlParameter[] sqlpara = null)
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    if (sqlpara != null)
                    {
                        foreach (SqlParameter para in sqlpara)
                        {
                            if (para.Value == null)
                                para.Value = DBNull.Value;
                            cmd.Parameters.Add(para);
                        }
                    }
                    return cmd.ExecuteScalar();
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteScaler SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }
        public object ExecuteScaler(string CommandText)
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    return cmd.ExecuteScalar();
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteScaler SPname=" + CommandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }
        public int ExecuteNonQuery(string SpName, SqlParameter[] sqlpara = null, bool returnvalue = false)
        {
            SqlParameter retpara = null;
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    if (sqlpara != null)
                    {
                        foreach (SqlParameter para in sqlpara)
                        {
                            if (para.Value == null)
                                para.Value = DBNull.Value;
                            cmd.Parameters.Add(para);
                        }
                    }
                    if (returnvalue)
                    {
                        retpara = GetReturnParameter();
                        cmd.Parameters.Add(retpara);
                    }
                    int i = cmd.ExecuteNonQuery();
                    if (returnvalue)
                        return retpara.Value.ToInt();
                    else
                        return i;
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteNonQuery SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                retpara = null;
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }
        public int ExecuteNonQuery(string CommandText)
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();

                    int i = cmd.ExecuteNonQuery();

                    return i;

                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteNonQuery CmmandText=" + CommandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

        }
        public HashSet<T> ExecuteToDataTable<T>(string SpName, SqlParameter[] sqlpara = null) where T : class, new()
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    if (sqlpara != null)
                    {
                        foreach (SqlParameter para in sqlpara)
                        {
                            if (para.Value == null)
                                para.Value = DBNull.Value;
                            cmd.Parameters.Add(para);
                        }
                    }
                    using (DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
                    {
                        DataTable dt = new DataTable();
                        dt.Load(dataReader);
                        cmd.Parameters.Clear();
                        return dt.MapTo<T>();
                    }
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTable SpName=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }

      

        public HashSet<T> ExecuteCommandToDataTable<T>(string CmmandText) where T : class, new()
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(CmmandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    using (DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
                    {
                        DataTable dt = new DataTable();
                        dt.Load(dataReader);
                        cmd.Parameters.Clear();
                        return dt.MapTo<T>();
                    }
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteCommandToDataTable Command=" + CmmandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

        }
        public HashSet<T> ExecuteToDataTableWithReturnValue<T>(string SpName, out object returnvalue, SqlParameter[] sqlpara = null) where T : class, new()
        {
            SqlParameter retpara = null;
            returnvalue = null;
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    if (sqlpara != null)
                    {
                        foreach (SqlParameter para in sqlpara)
                        {
                            if (para.Value == null)
                                para.Value = DBNull.Value;
                            cmd.Parameters.Add(para);
                        }
                    }

                    retpara = GetReturnParameter();
                    cmd.Parameters.Add(retpara);

                    using (DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
                    {
                        returnvalue = retpara.Value;
                        DataTable dt = new DataTable();
                        dt.Load(dataReader);
                        cmd.Parameters.Clear();
                        return dt.MapTo<T>();
                    }
                }
            }

            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTableWithReturnValue SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

        }
        public  DataSet ExecuteToDataSet(string SpName, SqlParameter[] sqlpara = null)
        {
            var connectionState = this.Database.Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (connectionState != ConnectionState.Open)
                        Connection.Open();
                    if (sqlpara != null)
                    {
                        foreach (SqlParameter para in sqlpara)
                        {
                            if (para.Value == null)
                                para.Value = DBNull.Value;
                            cmd.Parameters.Add(para);
                        }
                    }

                    DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.SqlClient");

                    using (DbDataAdapter da = factory.CreateDataAdapter())
                    {
                        DataSet ds = new DataSet();
                        da.SelectCommand = cmd;
                        da.Fill(ds);
                        return ds;
                    }
                }
            }

            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTableWithReturnValue SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

           
           
        }
    }
}
