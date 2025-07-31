using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TimeAttWebAPI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Formatting;
    using System.Net.Http.Headers;
    using System.Runtime.Serialization;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using System.Xml.Serialization;

  
        /// <summary>
        /// Generic class for opertaions ouput
        /// <see cref="Metadata{T}"/> more info
        /// </summary>
        /// <typeparam name="T"></typeparam>
        [DataContract(Name = "Response", Namespace = "")]
        public class Metadata<T> where T : class
        {
            //[DataMember]
            public int TotalResults { get; set; }

            //[DataMember]
            public int ReturnedResults { get; set; }

            /// <summary>
            /// Array of the service results
            /// <see cref="Metadata{T}"/> more info
            /// </summary>
            [DataMember(Name = "Items", Order = 3)]
            public T[] Results { get; set; }

            /// <summary>
            /// Status of the operation
            /// </summary>
            [DataMember(Name = "Status", Order = 1)]
            public Status OperationStatus { get; set; }

            /// <summary>
            /// Operation information for Tracking
            /// </summary>
            [DataMember(Name = "OperationInfo", Order = 2)]
            public OperationInformation OperationInfo { get; set; }

            public Metadata()
            { }
            public Metadata(HttpResponseMessage httpResponse, bool isIQueryable)
            {
                OperationInformation CurrentOperationInfo = new OperationInformation();
                Status CurrentOperationStatus = new Status();
                CurrentOperationInfo.TimestampUTC = DateTime.Now.ToUniversalTime().ToString("dd/MM/yyy HH:mm:ss");
                CurrentOperationInfo.TrackID = Guid.NewGuid();
                CurrentOperationInfo.ServerName = Environment.MachineName;

                CurrentOperationStatus.IsError = !httpResponse.IsSuccessStatusCode;
                CurrentOperationStatus.StatusCode = httpResponse.StatusCode.ToString();

                if (httpResponse.Content != null && httpResponse.IsSuccessStatusCode)
                {
                    this.TotalResults = 1;
                    this.ReturnedResults = 1;

                    //this.Status = "Success";

                    if (isIQueryable)
                    {
                        IEnumerable<T> enumResponseObject;
                        if (httpResponse.TryGetContentValue<IEnumerable<T>>(out enumResponseObject))
                        {
                            this.Results = enumResponseObject.ToArray();
                            this.ReturnedResults = enumResponseObject.Count();
                        }
                        else
                        {
                            T responseObject;
                            httpResponse.TryGetContentValue<T>(out responseObject);
                            this.Results = new T[] { responseObject };
                        }
                    }
                    else
                    {
                        T responseObject;
                        httpResponse.TryGetContentValue<T>(out responseObject);
                        this.Results = new T[] { responseObject };
                    }
                }
                else
                {
                    //this.Status = "Error";
                    this.ReturnedResults = 0;
                }
                this.OperationInfo = CurrentOperationInfo;
                this.OperationStatus = CurrentOperationStatus;
            }



        }

        [DataContract(Name = "Response", Namespace = "")]
        public class StringMetadata
        {

            [DataMember(Name = "Result", Order = 3)]
            public string Result { get; set; }


            [DataMember(Name = "Status", Order = 1)]
            public Status OperationStatus { get; set; }

            [DataMember(Name = "OperationInfo", Order = 2)]
            public OperationInformation OperationInfo { get; set; }


            public StringMetadata(HttpResponseMessage httpResponse)
            {
                OperationInformation CurrentOperationInfo = new OperationInformation();
                Status CurrentOperationStatus = new Status();
                CurrentOperationInfo.TimestampUTC = DateTime.Now.ToUniversalTime().ToString("dd/MM/yyy HH:mm:ss");
                CurrentOperationInfo.TrackID = Guid.NewGuid();
                CurrentOperationInfo.ServerName = Environment.MachineName;

                CurrentOperationStatus.IsError = !httpResponse.IsSuccessStatusCode;
                CurrentOperationStatus.StatusCode = httpResponse.StatusCode.ToString();

                if (httpResponse.Content != null && httpResponse.IsSuccessStatusCode && httpResponse.Content is StringContent)
                {



                    this.Result = (httpResponse.Content as StringContent).ReadAsStringAsync().Result;

                }

                this.OperationInfo = CurrentOperationInfo;
                this.OperationStatus = CurrentOperationStatus;
            }
        }

        /// <summary>
        /// holds the status of a single operation
        /// </summary>
        [DataContract(Name = "Status")]
        public class Status
        {
            /// <summary>
            /// Http Status Code name
            /// </summary>
            [DataMember]
            public string StatusCode { get; set; }
            /// <summary>
            /// message incase of error
            /// </summary>
            [DataMember]
            public string Message { get; set; }
            /// <summary>
            /// indecator of Errors during the excution of the operation
            /// </summary>
            [DataMember]
            public bool IsError { get; set; }
        }
        /// <summary>
        /// Holds the operation information for tracking and logging 
        /// </summary>
        [DataContract(Name = "OperationInfo")]
        public class OperationInformation
        {
            /// <summary>
            /// unique id for tracking the operation
            /// </summary>
            [DataMember]
            public Guid TrackID { get; set; }
            /// <summary>
            /// Operation Time stamp in UTC time
            /// </summary>
            [DataMember]
            public string TimestampUTC { get; set; }
            /// <summary>
            /// the server which excuted this operation as the service may be running in a load balanced enviroment
            /// </summary>
            [DataMember]
            public string ServerName { get; set; }
        }



        public class MetadataHandler : DelegatingHandler
        {
            protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            {
                return base.SendAsync(request, cancellationToken).ContinueWith<HttpResponseMessage>(
                    (task) =>
                    {
                        if (ResponseIsValid(task.Result) && task.Result.Content is ObjectContent)
                        {
                            object responseObject;
                            task.Result.TryGetContentValue(out responseObject);
                            ProcessObject(responseObject as IEnumerable<object>, task.Result, responseObject is IEnumerable);
                            //if (responseObject is IQueryable)
                            //{
                            //    ProcessObject<object>(responseObject as IQueryable<object>, task.Result, true);
                            //}
                            //else
                            //{
                            //    var list = new List<object>();
                            //    list.Add(responseObject);
                            //    ProcessObject<object>(responseObject as IEnumerable<object>, task.Result, true);
                            //}
                            return task.Result;
                        }
                        else if (ResponseIsValid(task.Result) && task.Result.Content is System.Net.Http.StringContent)
                        {
                            ProcessObject(task.Result);
                            return task.Result;
                        }
                        else
                            return task.Result;

                    }
                 );
            }

            private void ProcessObject<T>(IEnumerable<T> responseObject, HttpResponseMessage response, bool isIQueryable) where T : class
            {
                var metadata = new Metadata<T>(response, isIQueryable);
                var originalSize = new string[1] as IEnumerable<string>;

                response.Headers.TryGetValues("originalSize", out originalSize);
                response.Headers.Remove("originalSize");
                if (originalSize != null)
                {
                    metadata.TotalResults = Convert.ToInt32(originalSize.FirstOrDefault());
                }
                //uncomment this to preserve content negotation, but remember about typecasting for DataContractSerliaizer
                var formatter = GlobalConfiguration.Configuration.Formatters.First(t => t.SupportedMediaTypes.Contains(new MediaTypeHeaderValue(response.Content.Headers.ContentType.MediaType)));
                response.Content = new ObjectContent<Metadata<T>>(metadata, formatter);
                //response.Content = new ObjectContent<Metadata<T>>(metadata, GlobalConfiguration.Configuration.Formatters[0]);
            }
            private void ProcessObject(HttpResponseMessage response)
            {
                var metadata = new StringMetadata(response);
                //var originalSize = new string[1] as IEnumerable<string>;

                //response.Headers.TryGetValues("originalSize", out originalSize);
                //response.Headers.Remove("originalSize");
                //if (originalSize != null)
                //{
                //    metadata.TotalResults = Convert.ToInt32(originalSize.FirstOrDefault());
                //}
                //response.RequestMessage.Content.Headers.ContentType
                //uncomment this to preserve content negotation, but remember about typecasting for DataContractSerliaizer
                var formatter = GlobalConfiguration.Configuration.Formatters.First(t => t.SupportedMediaTypes.Contains(new MediaTypeHeaderValue(response.Content.Headers.ContentType.MediaType)));

                response.Content = new ObjectContent<StringMetadata>(metadata, formatter);
                //response.Content = new ObjectContent<Metadata<T>>(metadata, GlobalConfiguration.Configuration.Formatters[0]);
            }





            private bool ResponseIsValid(HttpResponseMessage response)
            {
                if (response == null || response.StatusCode != HttpStatusCode.OK)
                {
                    return false;//|| !(response.Content is ObjectContent)
                }
                //if(response.Content is )
                return true;
            }
        }
    

        //public class CustomQueryableAttribute : QueryableAttribute
        //{
        //    protected override IQueryable ApplyResultLimit(HttpActionExecutedContext actionExecutedContext, IQueryable query)
        //    {
        //        object responseObject;
        //        actionExecutedContext.Response.TryGetContentValue(out responseObject);
        //        var originalquery = responseObject as IQueryable<object>;

        //        if (originalquery != null)
        //        {
        //            var originalSize = new string[] { originalquery.Count().ToString() };
        //            actionExecutedContext.Response.Headers.Add("originalSize", originalSize as IEnumerable<string>);
        //        }
        //        return base.ApplyResultLimit(actionExecutedContext, query);
        //    }
        //}
    }

