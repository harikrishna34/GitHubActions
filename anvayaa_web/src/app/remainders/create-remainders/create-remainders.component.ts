import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-remainders',
  templateUrl: './create-remainders.component.html',
  styleUrls: ['./create-remainders.component.css']
})
export class CreateRemaindersComponent implements OnInit {

  CustRecID: any
  userdata: any
  remainderData: any = []
  frequencyList: any = []
  frequencyCategory: any
  reminderFrequencyDetails: any = []
  frquencyTab: boolean = false
  templetTab: boolean = false
  templets: any = []
  templetInput: any
  templetMessageArray: any = []
  tempMessage: any
  templetAttributes: any = []
  tempAttributTabe: boolean = false
  benficiaryDetails: any = []
  benificiaryNams: any
  frequencyKey: any
  weeklyTab: boolean = false
  frequencyObj: any
  timesArray: any = []
  public SubmitRemainder: UntypedFormGroup
  frequencyID: any
  PlanExpiryDate: any
  usersms: boolean = false
  userEmail: boolean = false
  maxdate = new Date();
  Person: any = ['Kin', 'Beneficiaries']
  SmsType: any = ['SMS', 'Email']
  reciverSelection: any
  recivertypearray: any = []
  isfrmChecked: any;
  benficiaryObj: any
  finalrecivers: any
  selectedSponser: any = {}
  reciversDetailsArray: any = []
  sponcerModeArry: any = []
  sponcerMsgModeFinalArray: any = []
  benficiaryMessageMode: any = []
  reciverFinalArray: any = []
  allUsersArray: any = []
  sponser: any
  BenficiaryObj: any
  messageModearray: any = []
  yearlydate:boolean=false
  public RemainderSchedules!: UntypedFormGroup
  Monthly: boolean = false
  weekCheck: boolean
  WeekDaysArray: any = []
  textMessage: any
  monthlyDatesArray: any = []
  datesChecked: any
  Message: any
  finalMessage: any
  selfAttributes: any = []
  emailCheck: any
  DuplicateMsg: any
  templetattributesArray: any = []
  EmailMsg:any
  submitRemainder = false
  msgTypeValidation:boolean=false
  templetInputErr:boolean = false
  startdate:any
  weekdayserr:boolean = false
  monthlyDatesErr:boolean=false
  frequencyName:any
  reciver:any=[]
  notemplet:boolean = false
  formTab:boolean = false
  txtStartDate:any
  txtEndDate:any
  section:boolean = false
  dateRange:boolean=false
  midDate:string
  startEnd:any
  txtDate:any
  dateFormate:any = 'dd-MM-yyyy'
  reminderform:any
  constructor(private formBuilder: UntypedFormBuilder, private userservice: UsersService, private route: Router, private spinner: NgxSpinnerService, private Router: Router, private activatedRoute: ActivatedRoute, private UsersService: UsersService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.CustRecID = this.activatedRoute.snapshot.queryParamMap.get("CustRecID");
    this.userDetails()
    this.userRemainderConfigurationData()
     //Remainder Form
      console.log("hshdhs",this.maxdate)
    this.SubmitRemainder = this.formBuilder.group({
      CustRecID: ['',[Validators.required]],
      CategoryAliasName: ['',[Validators.required]],
      CategoryID: ['',[Validators.required]],
      CategoryName: ['',[Validators.required]],
      Frequency: ['',[Validators.required]],
      FrequencyID: ['',[Validators.required]],
      PlanExpiryDate: ['',[Validators.required]],
      StartDate: ['',[Validators.required]],
      EndDate: ['',[Validators.required]],
      ReceiversDetails: this.formBuilder.array([]),
      Receivers:[''],
      ServiceName:[''],
      RemainderSchedules: this.formBuilder.group({
        "DaysOfWeek": ['',[Validators.required]],
        "DatesOfMonth": ['',[Validators.required]],
        "Date": ['',[Validators.required]],
        "Time": ['',[Validators.required]],
        "SMSMessage": ['',[Validators.required]],
        "EmailMessage": ['',[Validators.required]]
      })

    })
  }


  //API for user record Details
  userDetails() {
    this.userservice.viewUserDetails({ "CustRecID": this.CustRecID }).subscribe((details) => {
     
      if (details.code == 'S001') {
        this.userdata = details.data.customer
        console.log("data",this.userdata)
        this.sponser = {
          "ContactNumber": this.userdata.MobileNumber,
          "EmailID": this.userdata.EmailID,
          "ID": this.userdata.CustRecID,
          "Name": this.userdata.Name,
          "ReceiverRole": "Kin"
        }
        this.allUsersArray.push(this.sponser)
        this.benficiaryDetails = this.userdata.Beneficiaries
        for (let i of this.benficiaryDetails) {
          this.BenficiaryObj = {
            "ContactNumber": i.MobileNumber,
            "EmailID": i.EmailID,
            "ID": i.CustID,
            "Name": i.Name,
            "MessageMode": this.messageModearray,
            "ReceiverRole": "Beneficiaries"
          }
          this.allUsersArray.push(this.BenficiaryObj)
        }
       
        this.PlanExpiryDate = this.datePipe.transform(this.userdata.PackageDetails.PackageExpiryDate*1000,'dd-MM-yyyy')
                  

  

      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  // templets and configuration Data incoming api
  userRemainderConfigurationData() {
    this.userservice.remainderUserMasterDetails().subscribe((details) => {
      
      if (details.code == 'S001') {
        this.remainderData = details.data
      
      } else {
        alert(details.data)
      }
    }, (error) => {
      alert(error.error.data)
    })
  }

  //setting frequency list function 
  frequency(data: any) {
    this.frquencyTab = true
    this.templetTab = true
    this.frequencyCategory = data.target.value
    if(this.frequencyCategory != " "){
      this.formTab = true
    }else{
      this.formTab = false
      this.templetTab = false
      this.notemplet = false
      this.frquencyTab=false
    }
    if(this.frequencyCategory != 'Aniversary/Birthdays'){
      this.dateRange = true

    }else{
      this.dateRange = false
    }
    this.frequencyList = this.remainderData.filter((value: any) => { return value.AliasName == this.frequencyCategory })
    this.reminderFrequencyDetails = this.frequencyList[0].FrequencyDetails
    console.log("templets log",this.frequencyList[0].Templates)
    this.templets = this.frequencyList[0].Templates.filter((obj:any)=>{
       if(obj.Status!='InActive'){
        return obj
       }
    })
   
    if (this.templets == '') {
      this.templetTab = false
      this.notemplet = true
      this.formTab = false
    }else{
      this.notemplet = false
      this.formTab = true
      
    }
    if (data != 'Prescription/Medicine') {
      this.weeklyTab = false
    }
  }
// template functionality showing templete functionality 
  inputMessage(data: any) {
    this.templetInput = data.target.value
    this.tempAttributTabe = true
    this.templetMessageArray = this.templets.filter((msg: any) => { return msg.TemplateName == this.templetInput })
    this.tempMessage = this.templetMessageArray[0].Message
    this.Message = this.templetMessageArray[0].Message
    this.templetAttributes = this.templetMessageArray[0].TemplateAttributes
    for (let i = 0; i < this.templetAttributes.length; i++) {
      var Obj = {
        'attribute': '',
        'attributeValue': ''
      }

      Obj.attribute = this.templetAttributes[i]
      this.templetattributesArray.push(Obj)

    }
  }

  // functionality on frequency setting 
  frequencyType(data: any) {
    this.frequencyKey = data.target.value
    this.frequencyObj = this.reminderFrequencyDetails.filter((item: any) => { return item.AliasName == this.frequencyKey })
    this.frequencyID = this.frequencyObj[0].FrequencyID
    this.frequencyName = this.frequencyObj[0].Name
    if (this.frequencyKey == 'Weekly') {
      this.weeklyTab = true
    } else {
      this.weeklyTab = false
    }

    if(this.frequencyKey == 'Once'){
      this.startEnd = false
      this.yearlydate = true
      this.startdate = this.maxdate
    }else{
      this.startEnd = true
      this.yearlydate = false
    }
    if (this.frequencyKey == 'Monthly') {
      this.Monthly = true
    } else {
      this.Monthly = false
    }
    if (this.frequencyKey == 'Yearly' ||this.frequencyKey == 'Once' ) {
      this.yearlydate = true
      this.dateRange=false
    } else {
      this.yearlydate = false
      this.dateRange=true

    }
    
  }


  navTemp(){
    this.Router.navigate(['Dashboard/settings/templatecreation'])
  }
// week days selection pushing to array 
  weekDays(event: any, weekCheck: boolean) {

    if (weekCheck) {
      this.WeekDaysArray.push(event.target.value)
    } else {
      let index = this.WeekDaysArray.indexOf(event.target.value)
      this.WeekDaysArray.splice(index, 1)
    }
  }

  // function for email as msg 
  emailMessage(emailCheck: boolean) {
    if(emailCheck){
    this.EmailMsg =this.Message
    }
  }




// manuplation of string 
  messagText(event: any,attr: any) {
    this.Message = this.tempMessage;
    this.Message = this.Message.replace(/[{}]/g,' ');

    for (let j = 0; j < this.templetattributesArray.length; j++) {
      if (this.templetattributesArray[j].attribute == attr) {
        this.templetattributesArray[j].attributeValue = event.target.value
        this.Message = this.Message.replace(attr,event.target.value)
      } else {
        if (this.templetattributesArray[j].attributeValue.length > 0) {
          this.Message = this.Message.replace(this.templetattributesArray[j].attribute,this.templetattributesArray[j].attributeValue)
        }
      }
    }
  }
 
  // monthly dates function
  monthlydate(date: any, checked: boolean) {
    if (checked) {
      this.monthlyDatesArray.push(date.target.value)
    } else {
      let indexValue = this.monthlyDatesArray.indexOf(date.target.value);
      this.monthlyDatesArray.splice(indexValue, 1);
    }
  }


  // email and sms function 
  messageMode(event: any, data: any, isChecked: boolean) {
 
    if (isChecked) {

      this.reciver.push(data.ReceiverRole)
      this.recivertypearray = [...new Set(this.reciver)]; 
      if (this.finalrecivers == undefined) {
        this.finalrecivers = []
        this.messageModearray = []
        this.messageModearray.push(event.target.value)
        data.MessageMode = this.messageModearray;
        this.finalrecivers.push(data)
        // first object is pushing here 
      } else {
        var found = false;
        var foundobj = this.finalrecivers.filter((id: any) => {
          found = false;
          if (id.ID == data.ID) {
            id.MessageMode.push(event.target.value)                // finding duplicate object in the array
            found = true
            return id;
          }
        })
        if (foundobj == false) {
          this.messageModearray = []
          this.messageModearray.push(event.target.value)
          data.MessageMode = this.messageModearray;
          this.finalrecivers.push(data)
        }
      }

    } else {
      let value = this.messageModearray.indexOf(event.target.value)
      this.messageModearray.splice(value, 1)
      if (this.messageModearray.length == 0) {
        let index = this.finalrecivers.indexOf(data);
        this.finalrecivers.splice(index, 1);
      }
      let index = this.recivertypearray.indexOf(data.ReceiverRole);
      this.recivertypearray.splice(index, 1);
    }

  }

  mindate(event:any){

     this.midDate = event.target.value 

  }
  endate(event:any){

     this.startdate = event.target.value

  }
  createremainder() {

    
    this.submitRemainder = true
    if(this.messageModearray == ''){
        this.msgTypeValidation  = true
    }else{
      this.msgTypeValidation  = false
    }
    if(this.monthlyDatesArray == '' && this.Monthly == true){
      this.monthlyDatesErr =true
    }else{
      this.monthlyDatesErr =false
    }
    if(this.tempMessage == this.Message && this.templetTab == true){
        this.templetInputErr = true
    }else{
      this.templetInputErr = false
    }
    
     if(this.WeekDaysArray == '' && this.weeklyTab == true){
          this.weekdayserr = true
     }else{
          this.weekdayserr = false
           
     }
      
      if(this.frequencyKey == 'Once'){
        if( this.finalrecivers.length> 0 && this.recivertypearray.length> 0){
        this.txtDate = this.datePipe.transform(this.SubmitRemainder.value.RemainderSchedules.Date,'dd-MM-yyyy')
         
          this.SubmitRemainder.value.RemainderSchedules.Date = this.txtDate
          this.SubmitRemainder.value.CustRecID = this.CustRecID
          this.SubmitRemainder.value.ReceiversDetails = this.finalrecivers
          this.SubmitRemainder.value.Receivers = this.recivertypearray
          delete this.SubmitRemainder.value.StartDate
          delete this.SubmitRemainder.value.EndDate 
        }
      }else{
     
        if( this.finalrecivers.length> 0 && this.recivertypearray.length> 0){
        var stdate = this.SubmitRemainder.value.StartDate
        var endate = this.SubmitRemainder.value.EndDate
        this.txtDate = this.datePipe.transform(this.SubmitRemainder.value.RemainderSchedules.Date,'dd-MM-yyyy')
        this.txtStartDate = this.datePipe.transform(stdate,'dd-MM-yyyy')
        this.txtEndDate = this.datePipe.transform(endate,'dd-MM-yyyy')
        this.SubmitRemainder.value.ReceiversDetails = this.finalrecivers
        this.SubmitRemainder.value.Receivers = this.recivertypearray
        this.SubmitRemainder.value.StartDate = this.txtStartDate
        this.SubmitRemainder.value.EndDate = this.txtEndDate
        this.SubmitRemainder.value.RemainderSchedules.Date = this.txtDate
        }
      }
       
       
    if(this.emailCheck){
      this.SubmitRemainder.value.RemainderSchedules.EmailMessage = this.Message
    }
     if(this.SubmitRemainder.value.RemainderSchedules.Time != ""){
      
      this.SubmitRemainder.value.CustRecID = this.CustRecID
      this.SubmitRemainder.value.CategoryID = this.frequencyList[0].CategoryID
      this.SubmitRemainder.value.CategoryName = this.frequencyList[0].Name
      this.SubmitRemainder.value.FrequencyID = this.frequencyID
      this.SubmitRemainder.value.Frequency = this.frequencyName
      this.SubmitRemainder.value.PlanExpiryDate = this.PlanExpiryDate
      this.SubmitRemainder.value.RemainderSchedules.DaysOfWeek = this.WeekDaysArray
      this.SubmitRemainder.value.RemainderSchedules.DatesOfMonth = this.monthlyDatesArray
      this.SubmitRemainder.value.RemainderSchedules.SMSMessage = this.Message
      this.SubmitRemainder.value.ServiceName = this.frequencyList[0].AliasName



      this.userservice.createRemainder(this.SubmitRemainder.value).subscribe((details) => {
        if (details.code == 'S001') {
          alert(details.data)
          this.route.navigate(["/Dashboard/Customerslist"]);
        } else{
              alert(details.data)
            }   
      }, (error) => {
        alert(error.error.data)
       
      })
     }
    
  }


  remainders(){
    this.route.navigate(["/Dashboard/remainders/viewRemainders"],{ queryParams: {CustRecID :this.CustRecID} })
  }
}
