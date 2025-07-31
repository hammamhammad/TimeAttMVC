using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.DBContext
{
    public class DBContextBase : DbContext
    {
        public string ClientKey { get; private set; }

        /// We make use of the DbContext constructor overload that accepts a
        /// connection string to connect to.

        public DBContextBase(string clientKey)
            : base(GetClientConnectionString(clientKey))
        {
            ClientKey = clientKey;
        }

        /// There's a static method in one of our base assemblies that returns a
        /// client's database connection string based on the client's short name.

        public static string GetClientConnectionString(string clientKey)
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings[clientKey].ConnectionString;
        }

        private SqlParameter GetReturnParameter()
        {
            SqlParameter retpara = new SqlParameter();
            retpara.ParameterName = "ReturnValue";
            retpara.Direction = ParameterDirection.ReturnValue;
            return retpara;
        }
        private DbConnection Connection { get { return this.Database.Connection; } }
        private DbCommand getCommand(string sqlcomand = "")
        {
            var cmd = this.Database.Connection.CreateCommand();
            cmd.CommandTimeout = 36000;
            cmd.CommandText = sqlcomand;
            return cmd;

        }
        public object ExecuteScaler(string SpName, SqlParameter[] sqlpara = null)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    if (Connection.State != ConnectionState.Open)
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
                throw new Exception("ExecuteScaler SPname=" + SpName + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public object ExecuteScaler(string CommandText)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    return cmd.ExecuteScalar();
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteScaler SPname=" + CommandText + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public object ExecuteNonQuery(string SpName, SqlParameter[] sqlpara = null, bool returnvalue = false)
        {
            SqlParameter retpara = null;
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                        return retpara.Value;
                    else
                        return i;
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteNonQuery SPname=" + SpName + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                retpara = null;
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public object ExecuteNonQuery(string CommandText)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    int i = cmd.ExecuteNonQuery();
                    return i;
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteNonQuery CmmandText=" + CommandText + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public List<T> ExecuteToDataTable<T>(string SpName, SqlParameter[] sqlpara = null) where T : class, new()
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                    DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                    DataTable dt = new DataTable();
                    dt.Load(dataReader);
                    cmd.Parameters.Clear();
                    return TimeAtt.Common.MapTo<T>(dt);
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTable SpName=" + SpName + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public List<T> ExecuteCommandToDataTable<T>(string CmmandText) where T : class, new()
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CmmandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                    DataTable dt = new DataTable();
                    dt.Load(dataReader);
                    return TimeAtt.Common.MapTo<T>(dt);
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteCommandToDataTable Command=" + CmmandText + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public List<T> ExecuteToDataTableWithReturnValue<T>(string SpName, out object returnvalue, SqlParameter[] sqlpara = null) where T : class, new()
        {
            SqlParameter retpara = null;
            returnvalue = null;
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                    DbDataReader dataReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                    returnvalue = retpara.Value;
                    DataTable dt = new DataTable();
                    dt.Load(dataReader);
                    return TimeAtt.Common.MapTo<T>(dt);
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTableWithReturnValue SPname=" + SpName + Environment.NewLine + sqlex.ToString(), sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }


        ////////////////////////////////////////////////////////////////////////////


        public async  Task<object> ExecuteScalerAsync(string SpName, SqlParameter[] sqlpara = null)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;


                    if (Connection.State != ConnectionState.Open)
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

                    return await  cmd.ExecuteScalarAsync();
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteScaler SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public  Task<object> ExecuteScalerAsync(string CommandText)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    return  cmd.ExecuteScalarAsync();
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteScaler SPname=" + CommandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public  Task<int> ExecuteNonQueryAsync(string SpName, SqlParameter[] sqlpara = null, bool returnvalue = false)
        {
            SqlParameter retpara = null;
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                    Task<int> i = cmd.ExecuteNonQueryAsync();
                    if (returnvalue)
                        return  Task.FromResult(retpara.Value.ToInt());
                    else
                        return  i;
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
                    Connection.Close();
            }
        }
        public  Task<int> ExecuteNonQueryAsync(string CommandText)
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CommandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    Task<int> i = cmd.ExecuteNonQueryAsync();
                    return  i;
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteNonQuery CmmandText=" + CommandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public  Task<List<T>> ExecuteToDataTableAsync<T>(string SpName, SqlParameter[] sqlpara = null) where T : class, new()
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                    Task<DbDataReader> dataReader = cmd.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);
                    DataTable dt = new DataTable();
                    dt.Load(dataReader.Result);
                    cmd.Parameters.Clear();
                    return  Task.FromResult(TimeAtt.Common.MapTo<T>(dt));
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTable SpName=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public  Task<List<T>> ExecuteCommandToDataTableasync<T>(string CmmandText) where T : class, new()
        {
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(CmmandText))
                {
                    cmd.CommandType = CommandType.Text;
                    if (Connection.State != ConnectionState.Open)
                        Connection.Open();
                    Task<DbDataReader> dataReader = cmd.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);
                    DataTable dt = new DataTable();
                    dt.Load(dataReader.Result);
                    return  Task.FromResult(TimeAtt.Common.MapTo<T>(dt));
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteCommandToDataTable Command=" + CmmandText + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public  Task<List<T>> ExecuteToDataTableWithReturnValueAsync<T>(string SpName, out object returnvalue, SqlParameter[] sqlpara = null) where T : class, new()
        {
            SqlParameter retpara = null;
            returnvalue = null;
            var connectionState = Connection.State;
            try
            {
                using (var cmd = getCommand(SpName))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (Connection.State != ConnectionState.Open)
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
                    Task<DbDataReader> dataReader = cmd.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);
                    returnvalue = retpara.Value;
                    DataTable dt = new DataTable();
                    dt.Load(dataReader.Result);
                    return Task.FromResult( TimeAtt.Common.MapTo<T>(dt));
                }
            }
            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataTableWithReturnValue SPname=" + SpName + Environment.NewLine, sqlex);
            }
            finally
            {
                if (connectionState != ConnectionState.Open)
                    Connection.Close();
            }
        }
        public DataSet ExecuteToDataSet(string SpName, SqlParameter[] sqlpara = null)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(GetClientConnectionString(ClientKey)))
                {

                    using (SqlCommand cmd = new SqlCommand(SpName))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = connection;
                        cmd.CommandTimeout = connection.ConnectionTimeout;
                        connection.Open();
                        if (sqlpara != null)
                        {
                            foreach (SqlParameter para in sqlpara)
                            {
                                if (para.Value == null)
                                    para.Value = DBNull.Value;
                                cmd.Parameters.Add(para);
                            }
                        }
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            DataSet ds = new DataSet();
                            da.Fill(ds);
                            return ds;
                        }
                    }
                }
            }

            catch (SqlException sqlex)
            {
                throw new Exception("ExecuteToDataSet SPname=" + SpName + Environment.NewLine, sqlex);

                //ErrorLog.LogError("ExecuteToDataSet SPName=" + SpName + " " + sqlex.ToString(), fileid);
                //return null;
            }
        }
    }
}
       