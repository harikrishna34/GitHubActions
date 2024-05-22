import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
// import { type } from 'os';
// import {approveCancelRequest} from './user.service.interface';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  checkForUpdates() {
    throw new Error('Method not implemented.');
  }
  HostURL: string =

    "https://secureone.anvayaa.com"
  // "https://secureone.anvayaa.in"           

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is expired
          console.log('tokeeeee');
        }
        if (error.status === 400 && error.error.code === 'V001') {
          // Handle API response code "V001" as needed
          console.log('400000000');
        }

        return throwError(() => {
          console.log('hfhdkshfkwf');
        });
      }),
    );
  }
  ambulanceUser = {
    corporatename: 'Anvayaa Kin Care',
    companyname: 'Anvayaa Kin Care Pvt Ltd',
    parentApp: 'Anvayaakincare',
    apikey: 'anvayaaanvayaa1681792642',
    secretkey: 'QW52YXlhYUFudmF5YWExNjgxNzkyNjQy',
  };
  constructor(private httpclient: HttpClient) { }
  getToken() {
    var TokenObj = localStorage.getItem('x-fiftyaccess-token');
    TokenObj = JSON.stringify(TokenObj);
    let Headers = new HttpHeaders();
    Headers = Headers.set('x-fiftyaccess-token', TokenObj);
    return Headers;
  }
  // New APIs
  viewRequest(requestId: string) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: {
        RequestID: requestId,
      },
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/requestv2/viewRequest`,
      httpOptions,
    );
  }
  updateRequest(requiredParams: { [key: string]: any }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    return this.httpclient.put<any>(
      `${this.HostURL}/api/requestv2/updateRequest`,
      requiredParams,
      httpOptions,
    );
  }
  viewPaymentDetails(paymentId: string) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: {
        AnvayaaPaymentID: paymentId,
      },
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/requestv2/viewPayment`,
      httpOptions,
    );
  }
  getHHCDashBoardCount() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/hhcv2/getHHCDashboardCounts`,
      httpOptions,
    );
  }
  viewOnGoingrequests(paramsObj: {
    startDate?: string;
    endDate?: string;
    status?: string;
    pageLimit: number;
    pageNumber: number;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: paramsObj,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/hhcv2/viewOnGoingrequests`,
      httpOptions,
    );
  }
  viewNewRequests() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/hhcv2/viewNewRequests`,
      httpOptions,
    );
  }
  viewNotApprovedHHCBills(paramsObj: {
    startDate?: string;
    endDate?: string;
    status?: string;
    pageLimit: number;
    pageNumber: number;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: paramsObj,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/api/hhcv2/viewNotApprovedHHCBills`,
      httpOptions,
    );
  }
  viewLeads(paramsObj: {
    startDate?: string;
    endDate?: string;
    status?: string;
    pageLimit: number;
    pageNumber: number;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: paramsObj,
    };
    return this.httpclient.get(
      `${this.HostURL}/api/hhcv2/viewLeads`,
      httpOptions,
    );
  }
  getAllServices() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    return this.httpclient.get(
      `${this.HostURL}/api/VendorManagement/getServices`,
      httpOptions,
    );
  }
  getAllSubServices() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    return this.httpclient.get(
      `${this.HostURL}/api/VendorManagement/getSubCategory`,
      httpOptions,
    );
  }

  //

  getAmbulanceUserToken() {
    var TokenObj = localStorage.getItem('ambulanceUserToken');
    TokenObj = JSON.stringify(TokenObj);
    let Headers = new HttpHeaders();
    Headers = Headers.set('ambulanceUserToken', TokenObj);
    return Headers;
  }
  getAmbulanceList(ambulanceList: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/getambulancelist`,
      ambulanceList,
    );
    return result;
  }
  cancelAmbulanceRequest(ambulanceTrackURL: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/cancelambulancerequest`,
      ambulanceTrackURL,
    );
    return result;
  }
  ambulanceTrackURL(ambulanceTrackURL: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/getambulancetrackurl`,
      ambulanceTrackURL,
    );
    return result;
  }
  getAmbulanceDriverDetails(driverDetails: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/getdriverdetails`,
      driverDetails,
    );
    return result;
  }
  getAmbulanceEquipmentList(getequipmentlist: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/getequipmentlist`,
      getequipmentlist,
    );
    return result;
  }
  DriverDetails(ambulanceUserDetails: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/updatedriverdetailsbasedonRequestID`,
      ambulanceUserDetails,
    );
    return result;
  }
  EmergencyStatus(ambulanceUserDetails: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requests/updateEmergencyRequestStatus`,
      ambulanceUserDetails,
      httpOptions,
    );
    return result;
  }
  registerAmbulanceUser(ambulanceUserDetails: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/registerambulanceuser`,
      ambulanceUserDetails,
    );
    return result;
  }
  createAmbulanceRequest(createAmbulanceParams: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/ambulance/createambulancerequest`,
      createAmbulanceParams,
    );
    return result;
  }
  userlogin(login: any): Observable<any> {
    let result = this.httpclient.post(`${this.HostURL}/login`, login);
    return result;
  }
  userwithotplogin(login: any): Observable<any> {
    let result = this.httpclient.post(
      `${this.HostURL}/api/otp/checkMobileLoginOTP`,
      login,
    );
    return result;
  }
  reGenerateBill(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/ReGenerateBill`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  AdjustDate(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/RequestForBillDateChange`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  UpdateBillRequest(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/UpdateBillRequest`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  searchProfiles(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/searchPartnerprofiles`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  assignProfilesToRequest(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/assignProfilesToRequest`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  removeProfilesFromRequest(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/removeAssignedProfile`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  assignRequestToPartnerteam(RequestID: string): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/assignRequestToPartnerTeam`,
      { RequestID: RequestID },
      httpOptions,
    );
    return result;
  }
  approveCancelRequest(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/userTask/approveCancelRequest`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  ApproveBackDated(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/CareCoOrdinators/updateBackDatedRequestsStatus`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  customerlist(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/users/getAllRegisteredUsers`,
      httpOptions,
    );
    return result;
  }
  beneficiaries(CustRecID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ CustRecID: CustRecID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/ASERS/getRequiredDataForConfiguration`,
      { CustRecID: CustRecID },
      httpOptions,
    );
    return result;
  }
  createCometChatGroup(requiredParams: {
    CustRecID: string;
    CityManagerID: string;
    GroupName: string;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/createCometChatGroup`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  customerConfiguration(reqiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/ASERS/registerAndUpdateConfigurationDetails`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  configrationDetails(CustomerID: any, deviceID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getCustomersConfigurationDetails?CustomerID=` +
      CustomerID +
      '&DeviceID=' +
      deviceID,
      httpOptions,
    );
    return result;
  }
  customerConfigurationDetails(CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ CustRecID: CustRecID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/viewregistereduserdetails`,
      { CustRecID: CustRecID },
      httpOptions,
    );
    return result;
  }
  cancelRequestDetails(bodyParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    // const body = JSON.stringify({ "CustRecID": CustRecID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/userTask/cancelRequest`,
      bodyParams,
      httpOptions,
    );
    return result;
  }
  VitalData(CustomerID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getASERSDashboardData/` + CustomerID,
      httpOptions,
    );
    return result;
  }
  emergencyList(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetWatchEmergencyRequests`,
      httpOptions,
    );
    return result;
  }

  EscalationDashboardCounts(): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/getEscalationDashboardCounts`,
      httpOptions,
    );
    return result;
  }
  // emergencyCustomerData(RequestID:any):Observable<any>{
  //   let Headers=this.getToken();
  //   const httpOptions={
  //     'headers':Headers,
  //     'params':{"RequestID":RequestID}
  //   }
  //   let result = this.httpclient.get<any>(`${this.HostURL}/api/emergency/getEmergencyDetails`,httpOptions)
  //    return result;
  // }
  cutomerDetails(RequestID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/emergency/getEmergencyDetails?RequestID=` +
      RequestID,
      httpOptions,
    );
    return result;
  }
  emegencyAccept(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    // const body=JSON.stringify({"RequestID":RequestID});
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/emergency/confirmEmergency`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  supportDashBoard(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/customersupport/getDashboardCounts`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  Permissions(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/permissions/ViewPermissions`,
      httpOptions,
    );
    return result;
  }
  PartnerRevenueRecords(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/getPartnerRevenueRecords`,
      httpOptions,
    );
    return result;
  }
  UpdatePartnerRevenueRecord(bills: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/updatePartnerRevenueRecord`,
      bills,
      httpOptions,
    );
    return result;
  }
  supportDasshBoardTypeData(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/customersupport/getDashboardData`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  anchorsDashboard(reqiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({});
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/franchisemaster/updateFranchiseDetails`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  anchorsdata(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/franchisemaster/viewFranchiseDetails`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  viewDementiaSchedules(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaSchedule/viewAllSchedules`,
      httpOptions,
    );
    return result;
  }
  viewAllDementiaCustomers(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/PackageSub/viewAllDementialPlanCustomerDetails`,
      httpOptions,
    );
    return result;
  }
  updateEmployeeToChatGroup(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/updateManagerChatGroup`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  getAllEmployees(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/employees/getAllEmployees`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  createDementiaSchedule(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaSchedule/createSchedule`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  Insuranceform(formdetails: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/insurance/CreateInsurancePolicy`,
      formdetails,
      httpOptions,
    );
    return result;
  }
  updateDementiaVisitCount(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaassesment/CreateConfigurationCount`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  InsuranceDetails(requiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/insurance/getInsuranceDetails`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  policylist(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/insurance/AllInsurancesList`,
      httpOptions,
    );
    return result;
  }
  dementiaStages(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiastages/getalldata`,
      httpOptions,
    );
    return result;
  }
  dementiaQuestions(Type: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      // 'params':{"Type":Type}
    };
    // const body=JSON.stringify({"Type":Type});
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaquestoinaries/getquestions?Type=` + Type,
      httpOptions,
    );
    return result;
    // let Headers=this.getToken();
    // const httpOptions={
    //   'headers':Headers,
    // }
    // const body=JSON.stringify({"Type":Type});
    // let result=this.httpclient.get<any>(`${this.HostURL}/api/dementiaquestoinaries/getquestions`,{"Type":Type},httpOptions)
    // return result;
  }
  physicalConditions(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaphysicalcondition/getallcondition`,
      httpOptions,
    );
    return result;
  }
  dementiaassesement(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaassesment/assesmentcreate`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  dementiamusicdata() {
    // /api/dementiamusic/viewAllMusic
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiamusic/viewAllMusic`,
      httpOptions,
    );
    return result;
  }
  // api/dementiavideo/viewAllVideos
  dementivideodata() {
    // /api/dementiamusic/viewAllMusic
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiavideo/viewAllVideos`,
      httpOptions,
    );
    return result;
  }
  demetiaactivitydata() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaActivity/viewAllActivities`,
      httpOptions,
    );
    return result;
  }
  dementiaInitialAssesmentData(CustRecID: any, CustID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID, CustID: CustID },
    };
    const data = JSON.stringify({ CustRecID: CustRecID, CustID: CustID });
    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaassesment/viewDementiaAssesment`,
      httpOptions,
    );
    return result;
  }
  DemetiaRequests(CustRecID: any, CustID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID, CustID: CustID },
    };
    const data = JSON.stringify({ CustRecID: CustRecID, CustID: CustID });
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaassesment/ViewDemenitaRequests`,
      httpOptions,
    );
    return result;
  }
  wellbeingfrom(CustRecID: any, CustID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID, CustID: CustID },
    };
    const data = JSON.stringify({ CustRecID: CustRecID, CustID: CustID });
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiafeedback/getWellbeingData`,
      httpOptions,
    );
    return result;
  }
  ViewWellbeingfrom(FeedbackID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { FeedbackID: FeedbackID },
    };
    const data = JSON.stringify({ FeedbackID: FeedbackID });
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiafeedback/viewFeedback`,
      httpOptions,
    );
    return result;
  }
  ViewDemenitaRequest(Reqobj: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaassesment/viewactivitymediafiles`,
      Reqobj,
      httpOptions,
    );
    return result;
  }
  partnersData(Filter: any, cityID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { Filter: Filter, CityID: cityID },
    };
    // const data = JSON.stringify({ "CustRecID": CustRecID, "CustID": CustID })
    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/partnertasks/getSourceProfiles`,
      httpOptions,
    );
    return result;
  }
  partnersTaskCount() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    // const data = JSON.stringify({ "CustRecID": CustRecID, "CustID": CustID })
    // const body=JSON.stringify({"CustRecID":CustRecID,"CustID":CustID});
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/partnertasks/getTasksCount`,
      httpOptions,
    );
    return result;
  }
  assignVendor(RequestID: any, PartnerExecutiveID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ RequestID: RequestID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/assignSourceProfile`,
      { RequestID: RequestID, PartnerExecutiveID: PartnerExecutiveID },
      httpOptions,
    );
    return result;
  }
  cityApi() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({});
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/serviceareas/viewAllServiceAreas`,
      {},
      httpOptions,
    );
    return result;
  }
  getServicesList(CityID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/Partner/getServicesList`,
      { ServiceAreaID: CityID },
      httpOptions,
    );
    return result;
  }
  getPriceRangesBasedOnService(Filtertarrifobj: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/Partner/getPriceRangesBasedOnService`,
      Filtertarrifobj,
      httpOptions,
    );
    return result;
  }
  getPriceRangesBasedOnSubCategory(Filtertarrifobj: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/Partner/getPriceRangesBasedOnSubCategory`,
      Filtertarrifobj,
      httpOptions,
    );
    return result;
  }
  viewRequestDetailsOld(RequestID: any, CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/viewRequest`,
      { RequestID: RequestID, CustRecID: CustRecID },
      httpOptions,
    );
    return result;
    return result;
  }
  viewRequestDetails(RequestID: any, CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/viewRequestNew`,
      { RequestID: RequestID, CustRecID: CustRecID },
      httpOptions,
    );
    return result;
    return result;
  }
  vendorId() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/Partner/viewAllPartners?PartnerStatus=All&ServiceAreaID=All`,
      httpOptions,
    );
    return result;
  }
  CreateVendorProfile(vendorprofile: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    console.log(vendorprofile);
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/createprofile`,
      vendorprofile,
      httpOptions,
    );
    return result;
  }
  requestView(RequestID: any, CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/viewRequestNew`,
      { RequestID: RequestID, CustRecID: CustRecID },
      httpOptions,
    );
    return result;
  }
  employeList(EmployeeID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/partnertasks/partnerReportingEmployees?EmployeeID=` +
      EmployeeID,
      httpOptions,
    );
    return result;
  }
  IdVerification(IdNumber: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/partnertasks/getprofile?IdNumber=` + IdNumber,
      httpOptions,
    );
    return result;
  }
  removeUplodedProfile(RequestID: any, ProfileID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/removeUplodedProfile`,
      { RequestID: RequestID, ProfileID: ProfileID },
      httpOptions,
    );
    return result;
  }
  submitProfiles(RequestID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/submitProfiles`,
      { RequestID: RequestID },
      httpOptions,
    );
    return result;
  }
  CustomerDetailsData() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/activeCustomersDetails`,
      httpOptions,
    );
    return result;
  }
  SearchUserWithKey(Searchkey: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { Searchkey: Searchkey.data },
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/SearchUserWithKey`,
      httpOptions,
    );
    return result;
  }
  viewUser(CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/ViewUser`,
      httpOptions,
    );
    return result;
  }
  viewAllCategaryDetails(CustRecID: any, ServiceAreaID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/services/viewAllCategoriesDetails`,
      { CustRecID: CustRecID, ServiceAreaID: ServiceAreaID },
      httpOptions,
    );
    return result;
  }
  viewServiceDetails(CustRecID: any, categoryID: any, ServiceAreaID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/services/viewServiceDetails`,
      {
        CustRecID: CustRecID,
        ServiceID: categoryID,
        ServiceAreaID: ServiceAreaID,
      },
      httpOptions,
    );
    return result;
  }
  packageSubscription(CustRecID: any, categoryID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/subscriptionvalidation/validateservice`,
      { CustRecID: CustRecID, ServiceID: categoryID },
      httpOptions,
    );
    return result;
  }
  creteRequest(reqparams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/createRequest`,
      reqparams,
      httpOptions,
    );
    return result;
  }
  RequestDetails(RequestID: any, CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ RequestID: RequestID });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/viewRequestNew`,
      { RequestID: RequestID, CustRecID: CustRecID },
      httpOptions,
    );
    return result;
  }
  profileActed(
    RequestID: string,
    ProfileID: string,
    Status: string,
    Comments: string,
  ) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/CareCoOrdinators/approvePartnerProfile`,
      {
        RequestID: RequestID,
        ProfileID: ProfileID,
        Status: Status,
        Comments: Comments,
      },
      httpOptions,
    );
    return result;
  }
  updateAserRequest(RequestID: string, Status: string, Comments: string) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/CareCoOrdinators/updateASERSRequest`,
      { RequestID: RequestID, Status: Status, Comments: Comments },
      httpOptions,
    );
    return result;
  }
  updateVendorStatus(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    //  api/requests/updateVendorStatus
    // api/partnertasks/ConfirmIfJobStarted
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/ConfirmIfJobStarted`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  assignVendorForRequest(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/assignVendorForRequestNew`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  getListOfSubmittedProfiles(Type: any, StartDate: any, EndDate: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: {
        CityID: '',
        Type: Type,
        StartDate: StartDate,
        EndDate: EndDate,
      },
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/getListOfSubmittedProfiles`,
      httpOptions,
    );
    return result;
  }
  getVendors(
    SubSubCategoryID: any,
    ServiceAreaID: any,
    SubCategoryID: any,
    CategoryID: any,
  ) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/getVendorForRequest`,
      {
        SubSubCategoryID: SubSubCategoryID,
        ServiceAreaID: ServiceAreaID,
        SubCategoryID: SubCategoryID,
        CategoryID: CategoryID,
      },
      httpOptions,
    );
    return result;
  }
  CreateRequestConfiguration() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/Partner/CreateRequestConfiguration`,
      httpOptions,
    );
    return result;
  }
  GetRequestConfigurations() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/Partner/ViewAllRequestConfigurations`,
      httpOptions,
    );
    return result;
  }
  pmsVarification(CustRecID: String, RequestPrice: number) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/subscriptionvalidation/validatepms`,
      { CustRecID: CustRecID, RequestPrice: RequestPrice },
      httpOptions,
    );
    return result;
  }
  dataOfTasksConfiguration() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/configurations/getTasksForConfigurations`,
      httpOptions,
    );
    return result;
  }
  roles() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/roles/viewAllRoles`,
      httpOptions,
    );
    return result;
  }
  createAuthorization(TasksType: any, Roles: any = []) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/configurations/createAuthorizationMatrixForTasks`,
      { TasksType: TasksType, Roles: Roles },
      httpOptions,
    );
    return result;
  }
  AuthorizationsView() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/configurations/getAuthorizationMatricesForTasks`,
      httpOptions,
    );
    return result;
  }
  updateAuthorization(TasksType: any, Roles: any = []) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/configurations/updateAuthorizationMatrixForTasks`,
      { TasksType: TasksType, Roles: Roles },
      httpOptions,
    );
    return result;
  }
  UserTaskAssigned() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/userTask/getUserTasksAssigned`,
      httpOptions,
    );
    return result;
  }
  viewRequestData(RequestID: any, CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { RequestID: RequestID, CustRecID: CustRecID },
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/viewRequestDetails`,
      httpOptions,
    );
    return result;
  }
  updateRequestDetails(reqparams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    // const body = JSON.stringify({ "RequestID": RequestID });
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/CareCoOrdinators/completeRequestDetails`,
      reqparams,
      httpOptions,
    );
    return result;
  }
  getRolesModules() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/permissions/getAllRolesPrivileges`,
      httpOptions,
    );
    return result;
  }
  getChannelPartners() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/channelpartner/viewAllChannelPartners`,
      httpOptions,
    );
    return result;
  }
  createPermission(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ data });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/permissions/CreatePermissionv2`,
      data,
      httpOptions,
    );
    return result;
  }
  updatePermission(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    const body = JSON.stringify({ data });
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/permissions/updatePermissionv2`,
      data,
      httpOptions,
    );
    return result;
  }
  InformVendor(RequesttID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/isVendorInformed `,
      { RequestID: RequesttID },
      httpOptions,
    );
    return result;
  }
  ConfirmIfJobStarted(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/ConfirmIfJobStarted`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  AssignSupportExecutive(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/AssignSupportExecutive`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  AssignCareManager(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/AssignCaremanger`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  CheckOnCompletedJobs(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/CheckOnCompletedJobs`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  GetEmployees(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/employees/getAllEmployees`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  reqAuthorizationsView() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/configurations/getListofTaskTypesAndRolesforRequestConfig
  `,
      httpOptions,
    );
    return result;
  }
  reqcreateAuthorization(TasksType: any, Roles: any = []) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/configurations/createRequestConfiguration`,
      { TasksType: TasksType, Roles: Roles },
      httpOptions,
    );
    return result;
  }
  PackageSubsciptionsDetails() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/plans/viewCustomersPlans`,
      {},
      httpOptions,
    );
    return result;
  }
  viewCustomerPlan(CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/plans/viewCustomerPlan`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  FreezPackage(FreezDetails: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/PackageSub/updatePackageDetailsNew`,
      FreezDetails,
      httpOptions,
    );
    return result;
  }
  getLowerLevelPlanList(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/plans/getLowerLevelPlansList`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  downgradePlan(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/plans/downgradeplan`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  getDowngradingPlansPriceCalculationDetails(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/plans/getDowngradingPlansPriceCalculationDetails`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  createNewCustomer(requiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/createOfflineUser`,
      requiredParams,
      httpOptions,
    );
    return result;
  }
  employeesdetails() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/employees/getEmployees`,
      { Status: 'All' },
      httpOptions,
    );
    return result;
  }
  remaindertemplate() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/remainder/viewReminderMasterData`,
      httpOptions,
    );
    return result;
  }
  ongoingJobsData() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/userTask/GetrequeststoupdateInternalandexternalPrice`,
      httpOptions,
    );
    return result;
  }
  updateOngoingJobs(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/userTask/Updateassignjobtable`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  remaindersubmittemp(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remindertemplate/createReminderTemplate`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  remaindercreatetemp(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remindertemplate/getReminderTemplates`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  remainderlistremovebtn(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remindertemplate/removeReminderTemplates`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewUserDetails(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/viewuser`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  remainderUserMasterDetails() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/remainder/viewReminderMasterData`,
      httpOptions,
    );
    return result;
  }
  createRemainder(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remainder/createRemainderv2`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  ViewRemainder(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remainder/viewReminders`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  removeRemainder(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/remainder/removeReminder`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  submitBills(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/updateBillPaymentDetails`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  customerWatchDetails(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/GetCustomersForWatch`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  incommingWatchData(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/GetWatchData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  emergencyAlertStop(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/updateAlarmData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  watchAlarmData(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/GetAlaramDataForWatch`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  reconcilation(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/updateAndApproveVendorReconsillation`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  GetTarrifPriceforVendor(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/userTask/GetTarrifPriceforVendor`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  uploadVendorBill(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/partnertasks/uploadVendorBills`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  statelist(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/states/getStatesData`,
      httpOptions,
    );
    return result;
  }
  creatingstate(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/states/createState`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  activestatelist(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/states/getAllStates?Status=Active`,
      httpOptions,
    );
    return result;
  }
  removetablestate(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/states/updateState`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  creatingcity(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/serviceareas/createServiceArea
    `,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewallcitiestable(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/serviceareas/viewAllServiceAreas`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  updateviewallcitiestable(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/serviceareas/updateServiceArea`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  updateemergencyhealthplan(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/emergencyhealthplan/updateEmergencyHealthPlan`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  createemergencyplan(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/emergencyhealthplan/createEmergencyHealthPlanWeb`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  languages() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/fieldemployee/getRequiredConstants`,
      httpOptions,
    );
    return result;
  }
  chatViewRoles() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/cometchat/getRoles`,
      httpOptions,
    );
    return result;
  }
  createchatroles(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/cometchat/createRole`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  removechatrole(CustomerID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.delete<any>(
      `${this.HostURL}/api/cometchat/removeRole?role=` + CustomerID,
      httpOptions,
    );
    return result;
  }
  chatusers(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/cometchat/getusers?role=&status=&perPage1000=&page=3`,
      httpOptions,
    );
    return result;
  }
  removechatuser(CustomerID: any, param: any): Observable<any> {
    let Headers = this.getToken();
    // const httpOptions = {
    //   'headers': Headers,
    // }
    const httpOptions = {
      headers: Headers,
      // 'params':{"uid":CustomerID}
    };
    var body = { permanent: false };
    // var uri = "/api/cometchat/removeUser?uid=".concat(CustomerID)
    let result = this.httpclient.delete<any>(
      `${this.HostURL}/api/cometchat/removeUser?uid=` + CustomerID,
      httpOptions,
    );
    return result;
  }
  chatgrouplist(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/cometchat/getAllGroups`,
      httpOptions,
    );
    return result;
  }
  creatchatgroup(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/cometchat/createGroup`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewchatroles(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/roles/viewAllRoles`,
      httpOptions,
    );
    return result;
  }
  deletechatgroup(CustomerID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.delete<any>(
      `${this.HostURL}/api/cometchat/removeGroupById?guid=` + CustomerID,
      httpOptions,
    );
    return result;
  }
  gertchatgroupbyid(CustomerID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/cometchat/getGroupById?guid=` + CustomerID,
      httpOptions,
    );
    return result;
  }
  groupmembersbyid(CustomerID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/cometchat/getGroupMembers?guid=` + CustomerID,
      httpOptions,
    );
    return result;
  }
  addMemberstoChatGroup(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/cometchat/addGroupMember`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  deleteMemberInGroup(GroupID: any, Uid: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.delete<any>(
      `${this.HostURL}/api/cometchat/removeGroupMember?guid=` +
      GroupID +
      '&uid=' +
      Uid,
      httpOptions,
    );
    return result;
  }
  viewemergencyplan(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/emergencyhealthplan/viewEmergencyHealthPlans`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  dementiaAddAttachments(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaassesment/AddAttachments`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  dementiaAttachments(CustRecID: any, CustID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaassesment/ViewAttachments?CustRecID=` +
      CustRecID +
      '&CustID=' +
      CustID,
      httpOptions,
    );
    return result;
  }
  modifieduserdetails(CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/ViewUserModified`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  saveandupdatecaremanager(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/updateCareManagers`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  AddCustomerRequirements(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/AddAditionalInfo`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  HealthProfile(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/healthprofileschedule/createHealthProfileTaskSchedule`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  beneficiarydetails(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/createBeneficiaries`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  createEscalationCategory(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/escalationmaster/createEscalationCategory`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewAllEscalationMasters(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/escalationmaster/viewAllEscalationMasters`,
      httpOptions,
    );
    return result;
  }
  updateEscalationMasters(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/escalationmaster/updateEscalationMasters`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  createEscalation(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/escalations/createEscalation`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewEscalation(EscalationID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/escalations/viewEscalation?EscalationID=` +
      EscalationID,
      httpOptions,
    );
    return result;
  }
  viewAllEscalation(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/escalations/viewAllEscalations`,
      httpOptions,
    );
    return result;
  }
  escalationDashboardData(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/escalations/viewDashboardData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  updateEscalation(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/escalations/updateEscalation`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  allAsersCustomers(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getAllConfiguredUsers`,
      httpOptions,
    );
    return result;
  }
  customerdashboarddetails(customerID: any, deviceID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetCustomerDashBoardData?CustomerID=` +
      customerID +
      '&DeviceID=' +
      deviceID,
      httpOptions,
    );
    return result;
  }
  getAllDevices(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getAllDevices`,
      httpOptions,
    );
    return result;
  }
  watchConfiguration(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/ConfigureOrUpdateWatchForCustomer`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  assersupdatesettings(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/updateWatchData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  //    cocntactedlistupdate(reqParams:any){
  //   'headers': Headers,
  // }
  // let result = this.httpclient.get<any>(`${this.HostURL}/api/watchdata/GetWatchSettings?watchID=`+watchID, httpOptions)
  // return result;
  viewwatchsettings(watchID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetWatchSettings?watchID=` + watchID,
      httpOptions,
    );
    return result;
  }
  cocntactedlistupdate(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/fieldemployee/customerEmergencyRequestChangeStatus`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  dashboraddementia(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/dementiaDashboard/dashBoardCounts`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewdashboraddementia(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/dementiaDashboard/dashBoardData?Type=` + reqParams,
      httpOptions,
    );
    return result;
  }
  subscribe(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/StoreAuthData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewsixinonedashboard(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/sixinonedevice/GetLatestVitalsData?CustID=` +
      reqParams,
      httpOptions,
    );
    return result;
  }
  viewsixinonegraph(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/sixinonedevice/GetVitalDataBasedOnVitalType?Interval=` +
      reqParams.Interval +
      '&CustID=' +
      reqParams.CustID +
      '&vitalType=' +
      reqParams.Vitaltype +
      '&StartDate=' +
      reqParams.StartDate +
      '&EndDate=' +
      reqParams.EndDate,
      httpOptions,
    );
    return result;
  }
  getWatchAlarmRecords(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetAlarmDataHistory?watchID=` +
      reqParams.watchID +
      '&StartDate=' +
      reqParams.StartDate +
      '&EndDate=' +
      reqParams.EndDate,
      httpOptions,
    );
    return result;
  }
  asersMonthlyData(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/GetWatchDataMonthly`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  getAseresSleepData(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/GetSleepData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  UpdateEmergencyStatus(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/updateEmergencyRequestStatus`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  savecsatques() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/CreateQuestionnaire`,
      httpOptions,
    );
    return result;
  }
  ViewPartnerPayment(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/fincancedashboard/ViewPartnerHHCPayments?PartnerID=` +
      reqParams.PartnerID,
      httpOptions,
    );
    return result;
  }
  getactiverequestdetails(params: any) {
    let Headers = this.getToken();
    const requiredParamsObjs: any = {};
    for (let keys in params) {
      if (params[keys]) {
        requiredParamsObjs[keys] = params[keys];
      }
    }
    const httpOptions = {
      headers: Headers,
      params: requiredParamsObjs,
      //{ "CityID":params.CityID,"StartDate":params.StartDate,"EndDate":params.EndDate}
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/viewActiveRequests`,
      httpOptions,
    );
    return result;
  }
  getactivecustomers(params: any) {
    let Headers = this.getToken();
    const requiredParamsObj: any = {};
    for (let key in params) {
      if (params[key]) {
        requiredParamsObj[key] = params[key];
      }
    }
    console.log(requiredParamsObj, 'params after');
    const httpOptions = {
      headers: Headers,
      params: requiredParamsObj,
      //{ "CityID":params.CityID,"StartDate":params.StartDate,"EndDate":params.EndDate}
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/viewActivePlanCustomers`,
      httpOptions,
    );
    return result;
  }
  getmyfam(params: any) {
    let Headers = this.getToken();
    const requiredParamsObj: any = {};
    for (let key in params) {
      if (params[key]) {
        requiredParamsObj[key] = params[key];
      }
    }
    console.log(requiredParamsObj, 'params after');
    const httpOptions = {
      headers: Headers,
      params: requiredParamsObj,
      //{ "CityID":params.CityID,"StartDate":params.StartDate,"EndDate":params.EndDate}
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/viewActiveBeneficiary`,
      httpOptions,
    );
    return result;
  }
  additinalmemberstochat(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/additionalmembers/addadditionalmember`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  ApproveRollBacks(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/fincance/ApproveRollBackDetails`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  deletebills(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/cancelBills`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  aserscreatefeatures(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/ASERS/createFeatures`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  hhcDashBoardCounts() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/hhcdashboard/getHHCDashboardCounts`,
      httpOptions,
    );
    return result;
  }
  aserscreatedevices(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/ASERS/createDevices`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  hhcDashboardData(params: any) {
    let Headers = this.getToken();
    const requiredParamsObj: any = {};
    for (let key in params) {
      if (params[key]) {
        requiredParamsObj[key] = params[key];
      }
    }
    const httpOptions = {
      headers: Headers,
      params: requiredParamsObj,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/hhcdashboard/viewHHCDashbordData`,
      httpOptions,
    );
    return result;
  }
  DownloadhhcDashboardData(params: any) {
    // let Headers = this.getToken();
    const requiredParamsObj: any = {};
    for (let key in params) {
      if (params[key]) {
        requiredParamsObj[key] = params[key];
      }
    }
    const httpOptions = {
      // 'headers': Headers,
      params: requiredParamsObj,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/hhcdashboard/downloadRequests`,
      httpOptions,
    );
    return result;
  }
  allElectronicDevices() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getRequiredMasterData`,
      httpOptions,
    );
    return result;
  }
  aserscreatedevicesandfeatures(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/ASERS/createConfig`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  getAllFeatues(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/viewAllFeatures`,
      httpOptions,
    );
    return result;
  }
  getAllAsersDevices(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/viewAllDevices`,
      httpOptions,
    );
    return result;
  }
  getdevicesandfeaturesdetails(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getRequiredMasterData`,
      httpOptions,
    );
    return result;
  }
  updateChatGroupMember(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/CareCoOrdinators/updateManagerChatGroup`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  getasersmonitoringscreendata(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetScreenMonitoringData`,
      httpOptions,
    );
    return result;
  }
  // stepgetasersmonitoringscreendata(customerID: any): Observable<any> {
  //   let Headers = this.getToken();
  //   const httpOptions = {
  //     'headers': Headers,
  //     'params': {  'CustomerID': customerID, }
  //   }
  //   let result = this.httpclient.get<any>(`${this.HostURL}/api/watchdata/GetScreenMonitoringDataByID?CustomerID`, httpOptions)
  //   return result;
  // }
  stepgetasersmonitoringscreendata(
    customerID: any,
    recordID: any,
  ): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { CustomerID: customerID, RecordID: recordID },
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetScreenMonitoringDataByID`,
      {
        ...httpOptions,
      },
    );
    return result;
  }
  stepperformasersactions(emergencyType: string): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: { EmergencyType: emergencyType },
    };
    // Append the emergencyType to the URL
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetEmergencyActions`,
      {
        ...httpOptions,
      },
    );
    return result;
  }
  updatemonitoringsteps(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/updateMonitoringData`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  GetDeviceConfiguredDetails(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/ASERS/getConfiguredDevicesForUsers?CustomerID=` +
      reqParams.CustomerID,
      httpOptions,
    );
    return result;
  }
  EmergencyCalling(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/watchdata/CallFunctionality`,
      reqParams,
      httpOptions,
    );
    return result;
  }
  ViewInteractionStatus() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/ViewEscalationStatus`,
      httpOptions,
    );
    return result;
  }
  addCustomerInteraction(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/customerEscalations/UpdateCustomerEscalations`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  CustomerEscalationByStatus(Type: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/ViewAllEscalations?Type=` + Type,
      httpOptions,
    );
    return result;
  }

  escalationDataBasedOnRange(params: any) {
    let Headers = this.getToken();
    const requiredParamsObj: any = {};
    for (let key in params) {
      if (params[key]) {
        requiredParamsObj[key] = params[key];
      }
    }
    const httpOptions = {
      headers: Headers,
      params: requiredParamsObj,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/ViewAllEscalations`,
      httpOptions,
    );
    return result;
  }

  ViewEscalationDepartment() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/Departments`,
      httpOptions,
    );
    return result;
  }

  createCustomerEscalation(CreateEscalationParams: any): Observable<any> {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/customerEscalations/CreateCustomerEscalations`,
      CreateEscalationParams,
      httpOptions,
    );
    return result;
  }
  ViewEscalationTypes() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/customerEscalations/ViewEscalationTypes`,
      httpOptions,
    );
    return result;
  }

  EmergencyCount() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetAciveEmergencyMonitorCount `,
      httpOptions,
    );
    return result;
  }

  EmergencyStatusTrack(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/requests/getRequestAuditingData`,
      reqParams,
      httpOptions,
    );
    return result;
  }

  ViewCustomerComprehensiveData(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/comrehensivedashboard/viewCustomerdata`,
      httpOptions,
    );
    return result;
  }

  pmsdetailsatcomprehensive(CustRecID: string, PageSize: number) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/paymentmanagement/viewpaymenttransactionsforsupport/${CustRecID}/${PageSize}`,
      httpOptions,
    );
    return result;
  }
  viewTouchPointsdetails(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/comrehensivedashboard/createcustomerconfiguration`,
      reqParams,
      httpOptions,
    );
    return result;
  }

  viewTouchPointData(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/comrehensivedashboard/viewTouchPointData`,
      httpOptions,
    );
    return result;
  }

  addMoneyToVirtualAccount(params: {
    PaymentMode: string;
    Amount: number;
    CustRecID: string;
    EmergencyAmount: number;
  }): { [key: string]: any } {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/paymentmanagement/createPaymentManagementCreditPayment`,
      params,
      httpOptions,
    );
    return result;
  }

  ComprehensivecustomersData(CustRecID: any, Type: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID, Type: Type },
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/comrehensivedashboard/ComprehensivecustomersData`,
      httpOptions,
    );
    return result;
  }
  getReportstype() {
    // api/reporttype_master/viewReportTypesDetails

    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/reporttype_master/viewReportTypesDetails`,
      httpOptions,
    );
    return result;
  }

  uploadhealthrecords(requiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/electronichealthrecords/uploadhealthrecords`,
      requiredParams,
      httpOptions,
    );
    return result;
  }

  viewHealthRecords() {
    // api/electronichealthrecords/viewhealthrecords

    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/electronichealthrecords/viewhealthrecords`,
      {},
      httpOptions,
    );
    return result;
  }
  searchHealthRecords(reqiredParams: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/electronichealthrecords/viewhealthrecords`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  viewUsers() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/users/viewuser`,
      {},
      httpOptions,
    );
    return result;
  }
  salesTeam(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post<any>(
      `${this.HostURL}/api/employees/getAllEmployees`,
      {},
      httpOptions,
    );
    return result;
  }
  viewCustomerConfigData(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/comrehensivedashboard/viewCustomerConfigData`,
      httpOptions,
    );
    return result;
  }
  viewEmpCustomerExpConfigData(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/comrehensivedashboard/viewEmpCustomerExpConfigData`,
      httpOptions,
    );
    return result;
  }
  UpdateCustomerConfigData(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/users/ViewUserModified`,
      CustRecID,
      httpOptions,
    );
    return result;
  }

  updateEmpCustomerExpConfigStatus(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/comrehensivedashboard/updateEmpCustomerExpConfigStatus`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  closeInteractionCustomerConfigData(ExpID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/comrehensivedashboard/CloseInteraction`,
      ExpID,
      httpOptions,
    );
    return result;
  }
  updateTouchPointData(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/comrehensivedashboard/updateStatus`,
      data,
      httpOptions,
    );
    return result;
  }

  emrgencyHealthData(RequestID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { RequestID: RequestID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/watchdata/GetCustomerEmergencyDetails`,
      httpOptions,
    );
    return result;
  }

  viewPropertyType() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/healthprofileschedule/ViewPropertyTypes`,
      httpOptions,
    );
    return result;
  }
  viewLiftSizes() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/healthprofileschedule/ViewLiftSizeTypes`,
      httpOptions,
    );
    return result;
  }
  lifeStyleDiseases() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/healthprofileschedule/lifestyleDiseases`,
      httpOptions,
    );
    return result;
  }
  paramOBj: any;
  viewVisistsData(obj: any) {
    let Headers = this.getToken();

    if (obj.StartDate == undefined && obj.EndDate == undefined) {
      this.paramOBj = {
        CustRecID: obj.CustRecID,
        Type: obj.type,
      };
    } else {
      this.paramOBj = {
        CustRecID: obj.CustRecID,
        Type: obj.type,
        StartDate: obj.StartDate,
        EndDate: obj.EndDate,
      };
    }

    const httpOptions = {
      headers: Headers,
      params: this.paramOBj,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/comrehensivedashboard/ComprehensivecustomersData`,
      httpOptions,
    );
    return result;
  }

  // Conflict start Here

  emergencyStatusUpdate(statusUpdate: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/watchdata/UpdateEmergencyRequestStatus`,
      statusUpdate,
      httpOptions,
    );
    return result;
  }
  viewHexaProductDetails(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hexaplan/viewHexaCategorieDetails`,
      CustRecID,
      httpOptions,
    );
    return result;
  }

  ambulanceType() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/AmbulanceType/viewAllAmbulances`,
      httpOptions,
    );
    return result;
  }

  individualEmployeeDetails(empId: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/watchdata/GetEmployeeDetails?EmployeeID=` + empId,
      httpOptions,
    );
    return result;
  }

  kaleraCallId(empId: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/kaleyra/viewKaleyraResponseByID?CallID=` + empId,
      httpOptions,
    );
    return result;
  }

  closedEmergencyList(paramsObj: {
    startDate?: string;
    endDate?: string;
    careManager?: string;
    supportExecutive?: string;
    city?: string;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: paramsObj,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/CareCoOrdinators/closedemergencyrequests`,
      httpOptions,
    );
    return result;
  }
  viewHexadetailProducts(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hexaplan/viewHexaServiceDetails`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  addPriceDetails(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hexaplan/GetPriceDetails`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  placeOrder(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hexaplan/placeOrder`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  orderDetails(RequestID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/hexaplan/vieworder/` + RequestID,
      httpOptions,
    );
    return result;
  }
  hexaOrderStatusTrack(RequestID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/hexaplan/trackorder/` + RequestID,
      httpOptions,
    );
    return result;
  }
  updateOrder(CustRecID: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hexaplan/updateorderstatus`,
      CustRecID,
      httpOptions,
    );
    return result;
  }
  approvePartnerInvoicePayment(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/fincancedashboard/approvepartnerinvoicepayment`,
      data,
      httpOptions,
    );
    return result;
  }
  viewHHCPartnerInvoices(PartnerID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { PartnerID: PartnerID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/fincancedashboard/ViewGeneratedInvoices`,
      httpOptions,
    );
    return result;
  }
  makePaymentInvoices(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/partnerapp/makevendorpayment`,
      data,
      httpOptions,
    );
    return result;
  }

  viewAllAmbulances() {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/AmbulanceType/viewAllAmbulances`,
      httpOptions,
    );
    return result;
  }

  onApproveDiscountPrice(params: {
    RequestID: string;
    Status: string;
    Reason: string;
  }) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put<any>(
      `${this.HostURL}/api/partnerappadmin/approveDiscountRecords`,
      params,
      httpOptions,
    );
    return result;
  }

  Vendorprofiles(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/CareCoOrdinators/activeVendors`,
      data,
      httpOptions,
    );
    return result;
  }

  caremanagmentreplacment(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/careManagerPlacement`,
      data,
      httpOptions,
    );
    return result;
  }

  submitVendorProfiles(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/CareCoOrdinators/submitvendor`,
      data,
      httpOptions,
    );
    return result;
  }
  UserSearch(name: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { key: name },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/userv2/searchUser`,
      httpOptions,
    );
    return result;
  }

  UserdetailsBysearch(CustRecID: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: CustRecID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/userv2/viewUser`,
      httpOptions,
    );
    return result;
  }

  serviceAvailabilityForPlan(obj: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
      params: { CustRecID: obj.CustRecID, ServiceID: obj.ServiceID },
    };
    let result = this.httpclient.get(
      `${this.HostURL}/api/validationv2/validateService`,
      httpOptions,
    );
    return result;
  }

  selectedServiceDetails(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/services/viewServiceDetails`,
      data,
      httpOptions,
    );
    return result;
  }

  getTariffdetails(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/Partner/getPriceRangesBasedOnSubCategory`,
      data,
      httpOptions,
    );
    return result;
  }

  createRequestV2(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/createrequest`,
      data,
      httpOptions,
    );
    return result;
  }

  shortlistprofilelist(RequestID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/requestv2/viewProfileListRequest?RequestID=` +
      RequestID,
      httpOptions,
    );
    return result;
  }
  AcceptedProfiles(RequestID: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.get<any>(
      `${this.HostURL}/api/requestv2/AcceptedPartner?RequestID=` + RequestID,
      httpOptions,
    );
    return result;
  }

  PartnerTarrif(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/partnerTarrifDetails`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }
  AssignJob(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/assignVendor`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  saveandapproveprofile(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/profileAcccept`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  creatLead(data: any) {
    let Headers = this.getToken();

    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/hhcv2/createLeads`,
      data,
      httpOptions,
    );
    return result;
  }

  updateLead(reqParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/hhcv2/updateLeads`,
      reqParams,
      httpOptions,
    );
    return result;
  }

  Updatepaylater(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.post(
      `${this.HostURL}/api/requestv2/UpdatePayLaterRequest`,
      data,
      httpOptions,
    );
    return result;
  }

  changePriceV2(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/requestv2/reqPartnerPriceChange`,
      data,
      httpOptions,
    );
    return result;
  }
  approveandrejectconsentform(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/requestv2/approveRecheckRequest`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  extendOrDropStaff(reqiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/requestv2/extendORCloseJob`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  approveOrRejectPartnerPrice(reqiredParams: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };
    let result = this.httpclient.put(
      `${this.HostURL}/api/requestv2/approveorRejectpartnerprice`,
      reqiredParams,
      httpOptions,
    );
    return result;
  }

  supportdashboardcount() {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    };

    let result = this.httpclient.get<any>(
      `${this.HostURL}/redesign/supportdashboard/getsupportdashboardcount`,
      httpOptions,
    );
    return result;
  }
  viewActiveCustomer(params: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: params,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/redesign/supportdashboard/getactivecustomers`,
      httpOptions,
    );
  }
  viewPendingMemberOnboarding(params: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: params,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/redesign/supportdashboard/pendingmemberonboardings`,
      httpOptions,
    );
  }
  viewPendingCalls(params: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: params,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/redesign/supportdashboard/pendingcalls`,
      httpOptions,
    );
  }
  viewPendingRequests(params: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
      params: params,
    };
    return this.httpclient.get<any>(
      `${this.HostURL}/redesign/supportdashboard/pendingrequests`,
      httpOptions,
    );
  }
  saveandrejectprofile(reqiredParams: any): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/requestv2/profileReject`, reqiredParams, httpOptions)
    return result;
  }





  addingNewStaff(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/partnerStaffv2/createPartnerStaff`, data, httpOptions)
    return result;
  }

  checkinStatusUpdate(data: any) {
    let Headers = this.getToken();
    const httpOptions = {
      headers: Headers,
    }
    let result = this.httpclient.post(`${this.HostURL}/api/emplyeescheckin/createEmployeeCheckInsOuts`, data, httpOptions)
    return result;
  }


  serviceForAddStaff(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/requestv2/viewServiceCategories`, httpOptions)
    return result;
  }


  ReligionsList(): Observable<any> {
    let Headers = this.getToken();
    const httpOptions = {
      'headers': Headers,
    }
    let result = this.httpclient.get<any>(`${this.HostURL}/api/Partner/getRequiredConstants`, httpOptions)
    return result;
  }
}
