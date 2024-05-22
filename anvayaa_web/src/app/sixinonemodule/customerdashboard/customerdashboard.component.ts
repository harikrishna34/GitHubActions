import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsersService } from '../../users.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid } from "ng-apexcharts";
// import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis,
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {
  @ViewChild('customclose') customclose: any;
  @ViewChild('custombpclose') custombpclose: any;
  @ViewChild('customtempclose') customtempclose: any;
  @ViewChild('customoxyclose') customoxyclose: any;
  @ViewChild('customgluclose') customgluclose: any;
  @ViewChild('customecgclose') customecgclose:any;
  @ViewChild('Benclose') Benclose: any;



  Type: any
  viewsixinonedb: any
  viewsixinonegraph: any
  HeartRate: boolean = false
  BloodPressure: boolean = false
  Glucose: boolean = false
  Temperature: boolean = false
  Oxygen: boolean = false
  Ecgdata: boolean = false
  xaxisdata = []
  heartrateSeriesArray: any = []
  serisData = []
  heartrateGraphXaxsisAraay: any = []
  bpXaxisArray: any = []
  bpseriesarray: any = []
  bpseriesarray2: any = []
  bpseries = []
  bpseries2 = []
  bpxaxis = []
  spo2seris = []
  spo2Xaxis = []
  spo2Series: any = []
  spo2GraphXaxisArray: any = []
  tempratureseries = []
  tempratureXaxis = []
  tempratureSeriesArray: any = []
  tempratureGraphXaxsisAraay: any = []
  Glucoseseries = []
  GlucoseXaxis = []
  GlucoseSeriesArray: any = []
  GlucoseGraphXaxsisAraay: any = []
  heartList: any = []
  bpList: any = []
  glucoseList: any = []
  tempList: any = []
  oxyList: any = []
  EcgList: any = []
  CustRecID: any
  RecordID:any
  beneficiariesArray:any = []


  constructor(private userservice: UsersService, private datePipe: DatePipe, private route: Router, private snap: ActivatedRoute, private spinner: NgxSpinnerService, private formBuilder: UntypedFormBuilder) { }
  public CustomHeartrateform!: UntypedFormGroup
  public Custombpform!: UntypedFormGroup
  public Customoxygenform!: UntypedFormGroup
  public Customtemperatureform!: UntypedFormGroup
  public Customglucoseform!: UntypedFormGroup
  public Customecgform!: UntypedFormGroup
 public beneficiarysixinone:UntypedFormGroup

  customerObj: any
  intervaltype: any
  gluhourtoggle = true;
  gludaytoggle = true;
  gluweektoggle = true;
  glumonthtoggle = true;

  ecghourtoggle = true;
  ecgdaytoggle = true;
  ecgweektoggle = true;
  ecgmonthtoggle = true;

    hrhourtoggle = true;
  hrdaytoggle = true;
  hrweektoggle = true;
  hrmonthtoggle = true;

  bphourtoggle = true;
  bpdaytoggle = true;
  bpweektoggle = true;
  bpmonthtoggle = true;

   temphourtoggle = true;
  tempdaytoggle = true;
  tempweektoggle = true;
  tempmonthtoggle = true;                 
  
   oxyhourtoggle = true;
  oxydaytoggle = true;
  oxyweektoggle = true;
  oxymonthtoggle = true;
  
  // pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  
  beneficiaries:any=[]
  ngOnInit(): void {
    // console.log("pdf",this.pdfSource)
    this.Type = this.snap.snapshot.queryParamMap.get("CustID")
    this.CustRecID = this.snap.snapshot.queryParamMap.get("CustRecID")
    this.sixinonedashboard()
    // this.viewgraph()
    this.submitCustomHeartrateformbuilder()
    this.submitCustombpformbuilder()
    this.submitCustomoxygenformbuilder()
    this.submitCustomtemperatureformbuilder()
    this.submitCustomglucoseformbuilder()
    this.submitCustomecgformbuilder()
    this.submitbeneficairyforsixinone()
    this.spinner.show();
    this.userservice.viewUserDetails({ CustRecID: this.CustRecID }).subscribe((response) => {
      if (response.code == "S001") {
       this.beneficiariesArray = response.data.customer.Beneficiaries
        console.log('ccccc', response.data.customer.Beneficiaries)
        for (let i of response.data.customer.Beneficiaries) {
          if (i.CustID == this.Type) {
            this.customerObj = i
            console.log("customer details", this.customerObj)
          }
        }
        this.spinner.hide();

      } else {
        this.spinner.hide();
        alert(response.data)
      }
    }, (error) => {
      this.spinner.hide();
      alert(error.error.data)
    })

    this.beneficiarysixinone.patchValue({beneficiaries : this.Type})
  }
  submitCustomHeartrateformbuilder() {
    this.CustomHeartrateform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitCustomecgformbuilder() {
    this.Customecgform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitCustombpformbuilder() {
    this.Custombpform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitCustomoxygenformbuilder() {
    this.Customoxygenform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitCustomtemperatureformbuilder() {
    this.Customtemperatureform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitCustomglucoseformbuilder() {
    this.Customglucoseform = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    })
  }
  submitbeneficairyforsixinone() {
    this.beneficiarysixinone = this.formBuilder.group({
      beneficiaries: ['', [Validators.required]],
   
    })
  }

   beneficiaryselect(event:any){
    console.log(event.target.value)
    this.Type = event.target.value
    console.log(this.beneficiariesArray)
    this.userservice.viewsixinonedashboard(this.beneficiarysixinone.value.beneficiaries).subscribe((response) => {

      if (response.code == 'S001') {
        console.log("ssss", response.data)
        this.viewsixinonedb = response.data
        if(this.EcgList.length>0){
          this.EcgList =[]
        }
        if(this.heartList.length>0){
          this.heartList =[]
        }
        if(this.tempList.length>0){
          this.tempList =[]
        }
        if(this.bpList.length>0){
          this.bpList =[]
        }
        if(this.oxyList.length>0){
          this.oxyList =[]
        }
        if(this.glucoseList.length>0){
          this.glucoseList =[]
        }

        // alert("Successful")
      } else {
        alert(response.data)
      }

    }, (error) => {
      alert(error.error.data)
    })



    
        for (let i of this.beneficiariesArray) {
          if (i.CustID == this.beneficiarysixinone.value.beneficiaries) {
            this.customerObj = i
            console.log("customer details", this.customerObj)
          }
        }
  }
  sixinonedashboard() {
    this.spinner.hide();

    this.userservice.viewsixinonedashboard(this.Type).subscribe((response) => {

      if (response.code == 'S001') {
        console.log("ssss", response.data)
        this.viewsixinonedb = response.data
        console.log(this.viewsixinonedb)
         

        // alert("Successful")
      } else {
        alert(response.data)
      }

    }, (error) => {
      alert(error.error.data)
    })
  }

  viewsixinonedashboards(vitaltype: any) {
    this.viewgraph(vitaltype,"Month")
    if (vitaltype == 'HeartRate') {
      this.HeartRate = true;
      this.BloodPressure = false;
      this.Glucose = false;
      this.Temperature = false;
      this.Oxygen = false;
      this.Ecgdata = false;

    }
    if (vitaltype == 'BloodPressure') {
      this.BloodPressure = true;
      this.HeartRate = false;
      this.Glucose = false;
      this.Temperature = false;
      this.Oxygen = false;
      this.Ecgdata = false;

    }
    if (vitaltype == 'Glucose') {
      this.Glucose = true;
      this.HeartRate = false;
      this.BloodPressure = false;
      this.Temperature = false;
      this.Oxygen = false;
      this.Ecgdata = false;

    }
    if (vitaltype == 'Temperature') {
      this.Temperature = true;
      this.HeartRate = false;
      this.Glucose = false;
      this.BloodPressure = false;
      this.Oxygen = false;
      this.Ecgdata = false;

    }
    if (vitaltype == 'Oxygen') {
      this.Oxygen = true;
      this.HeartRate = false;
      this.Glucose = false;
      this.Temperature = false;
      this.BloodPressure = false;
      this.Ecgdata = false;

    }
    if (vitaltype == 'Ecgdata') {
      this.Ecgdata = true;
      this.Oxygen = false;
      this.HeartRate = false;
      this.Glucose = false;
      this.Temperature = false;
      this.BloodPressure = false;
    }
  }






  viewgraph(vitaltype: any, interval: any,) {
    console.log('xxxx', vitaltype)
    var type = vitaltype
    this.intervaltype = interval


    let sixinOneVitalObj: any = {
      Vitaltype: vitaltype,
      Interval: interval,
      CustID: this.Type,


    }
    if (type == 'HeartRate') {
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.CustomHeartrateform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.CustomHeartrateform.value.EndDate, 'dd-MM-yyyy')
    } else if (type == 'Oxygen') {
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.Customoxygenform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.Customoxygenform.value.EndDate, 'dd-MM-yyyy')
    } else if (type == 'Glucose') {
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.Customglucoseform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.Customglucoseform.value.EndDate, 'dd-MM-yyyy')
    } else if (type == 'Temperature') {
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.Customtemperatureform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.Customtemperatureform.value.EndDate, 'dd-MM-yyyy')
    } else if (type == 'BloodPressure') {
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.Custombpform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.Custombpform.value.EndDate, 'dd-MM-yyyy')
    }else{
      sixinOneVitalObj.StartDate = this.datePipe.transform(this.Customecgform.value.StartDate, 'dd-MM-yyyy');
      sixinOneVitalObj.EndDate = this.datePipe.transform(this.Customecgform.value.EndDate, 'dd-MM-yyyy')  
    }
    console.log("zzzzzzz", sixinOneVitalObj)

    this.customclose.nativeElement.click();
    this.custombpclose.nativeElement.click();
    this.customtempclose.nativeElement.click();
    this.customoxyclose.nativeElement.click();
    this.customgluclose.nativeElement.click();
    this.customecgclose.nativeElement.click();
        console.log("Ecg",sixinOneVitalObj)
    this.userservice.viewsixinonegraph(sixinOneVitalObj).subscribe((response) => {

      if (response.code == 'S001') {
        console.log("kkkkkkk", sixinOneVitalObj.Interval)

        console.log("ssss", response.data)
        if (this.heartrateSeriesArray.length > 0 && this.heartrateGraphXaxsisAraay.length > 0) {
          this.heartrateSeriesArray = []
          this.heartrateGraphXaxsisAraay = []
          this.heartList = []
        }

        if (this.bpseriesarray.length > 0 && this.bpseriesarray2.length > 0 && this.bpXaxisArray.length > 0) {
          this.bpseriesarray = []
          this.bpseriesarray2 = []
          this.bpXaxisArray = []
          this.bpList = []

        }
        if (this.spo2Series.length > 0 && this.spo2GraphXaxisArray.length > 0) {
          this.spo2Series = []
          this.spo2GraphXaxisArray = []
          this.oxyList = []


        }
        if (this.tempratureSeriesArray.length > 0 && this.tempratureGraphXaxsisAraay.length > 0) {
          this.tempratureSeriesArray = []
          this.tempratureGraphXaxsisAraay = []
          this.tempList = []

        }
        if (this.GlucoseSeriesArray.length > 0 && this.GlucoseGraphXaxsisAraay.length > 0) {
          this.GlucoseSeriesArray = []
          this.GlucoseGraphXaxsisAraay = []
          this.glucoseList = []

        }
         if(this.EcgList.length > 0){
          this.EcgList = []
          console.log('ecgpdflist',this.EcgList)
        }

        this.viewsixinonegraph = response.data
        this.viewsixinonegraph.filter((data: any) => {
          if (vitaltype == 'HeartRate') {
            this.HeartRate = true;
            this.BloodPressure = false;
            this.Glucose = false;
            this.Temperature = false;
            this.Oxygen = false;
            this.Ecgdata = false;
            this.heartrateSeriesArray.push(parseInt(data.vital.vitalData.HeartRate))
          console.log("HEART",this.heartrateSeriesArray)

            this.heartrateGraphXaxsisAraay.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            this.heartList.push({ "HeartRate": data.vital.vitalData.HeartRate, "CreatedDate": data.CreatedDate })
            this.serisData = this.heartrateSeriesArray
            console.log("HEART@",this.serisData)
            this.xaxisdata = this.heartrateGraphXaxsisAraay
          }
          if (vitaltype == 'BloodPressure') {
            this.BloodPressure = true;
            this.HeartRate = false;
            this.Glucose = false;
            this.Temperature = false;
            this.Oxygen = false;
            this.Ecgdata = false;
            this.bpseriesarray.push(parseInt(data.vital.vitalData.SystolicPressure))
            this.bpseriesarray2.push(parseInt(data.vital.vitalData.DiastolicPressure))
            this.bpXaxisArray.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            this.bpList.push({ "SystolicPressure": data.vital.vitalData.SystolicPressure, "DiastolicPressure": data.vital.vitalData.DiastolicPressure, "CreatedDate": data.CreatedDate })

            this.bpseries = this.bpseriesarray
            this.bpseries2 = this.bpseriesarray2
            this.bpxaxis = this.bpXaxisArray

          }
          if (vitaltype == 'Glucose') {
            this.Glucose = true;
            this.HeartRate = false;
            this.BloodPressure = false;
            this.Temperature = false;
            this.Ecgdata = false;
            this.Oxygen = false;
            this.GlucoseSeriesArray.push(parseInt(data.vital.vitalData.Glucose))
            this.GlucoseGraphXaxsisAraay.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            this.glucoseList.push({ "Glucose": data.vital.vitalData.Glucose, "CreatedDate": data.CreatedDate })
            this.Glucoseseries = this.GlucoseSeriesArray
            this.GlucoseXaxis = this.GlucoseGraphXaxsisAraay

          }
          if (vitaltype == 'Temperature') {
            this.Temperature = true;
            this.HeartRate = false;
            this.Glucose = false;
            this.BloodPressure = false;
            this.Oxygen = false;
            this.Ecgdata = false;
            this.tempratureSeriesArray.push(parseInt(data.vital.vitalData.Temperature))
            this.tempratureGraphXaxsisAraay.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            this.tempList.push({ "Temperature": data.vital.vitalData.Temperature, "CreatedDate": data.CreatedDate })

            this.tempratureseries = this.tempratureSeriesArray
            this.tempratureXaxis = this.tempratureGraphXaxsisAraay
          }
          if (vitaltype == 'Oxygen') {
            this.Oxygen = true;
            this.HeartRate = false;
            this.Glucose = false;
            this.Temperature = false;
            this.BloodPressure = false;
            this.Ecgdata = false;
            this.spo2Series.push(parseInt(data.vital.vitalData.Oxygen))
            this.spo2GraphXaxisArray.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            this.oxyList.push({ "Oxygen": data.vital.vitalData.Oxygen, "CreatedDate": data.CreatedDate })
            this.spo2seris = this.spo2Series
            this.spo2Xaxis = this.spo2GraphXaxisArray
          }
          if (vitaltype == 'Ecgdata') {
            this.Oxygen = false;
            this.HeartRate = false;
            this.Glucose = false;
            this.Temperature = false;
            this.BloodPressure = false;
            this.Ecgdata = true;
            // this.EcgSeries.push(parseInt(data.vital.vitalData.Ecgdata))
            // this.EcgGraphXaxisArray.push(this.datePipe.transform(data.CreatedDate * 1000, 'dd-MM-yyyy'))
            console.log('ecg links',this.EcgList)
            this.EcgList.push({ "RRMax": data.vital.vitalData.RRMax, "RRMin": data.vital.vitalData.RRMin, "BR": data.vital.vitalData.BR, "AvgHR": data.vital.vitalData.AvgHR, "HRV": data.vital.vitalData.HRV, "Mood": data.vital.vitalData.Mood,
            "PDFFile": data.vital.vitalData.PDFFile, "CreatedDate": data.CreatedDate })


            // this.Ecgseris = this.EcgSeries
            // this.EcgXaxis = this.EcgGraphXaxisArray
          }



        })



        // alert("Successful")
      } else {
        alert(response.data)
      }

    }, (error) => {
      alert(error.error.data)
    })
    // this.submitCustomHeartrateformbuilder()
  }
  gluhourBtnColor() {
    this.gluhourtoggle = true;
    this.gludaytoggle = false;
    this.gluweektoggle = false;
    this.glumonthtoggle = false;
  }
  gludayBtnColor() {
    this.gluhourtoggle = false;
    this.gludaytoggle = true;
    this.gluweektoggle = false;
    this.glumonthtoggle = false;


  } gluweekBtnColor() {

    this.gluhourtoggle = false;
    this.gludaytoggle = false;
    this.gluweektoggle = true;
    this.glumonthtoggle = false;

  } glumonthBtnColor() {
    this.gluhourtoggle = false;
    this.gludaytoggle = false;
    this.gluweektoggle = false;
    this.glumonthtoggle = true;
  }
  ecghourBtnColor(){
    this.ecghourtoggle = true;
  this.ecgdaytoggle = false;
  this.ecgweektoggle = false;
  this.ecgmonthtoggle = false;
  }
  ecgdayBtnColor(){
    this.ecghourtoggle = false;
  this.ecgdaytoggle = true;
  this.ecgweektoggle = false;
  this.ecgmonthtoggle = false;
  }
  ecgweekBtnColor(){
    this.ecghourtoggle = false;
  this.ecgdaytoggle = false;
  this.ecgweektoggle = true;
  this.ecgmonthtoggle = false;
  }
  ecgmonthBtnColor(){
    this.ecghourtoggle = false;
  this.ecgdaytoggle = false;
  this.ecgweektoggle = false;
  this.ecgmonthtoggle = true;
  }

  hrhourBtnColor(){
    this.  hrhourtoggle = true;
   this. hrdaytoggle = false;
    this.hrweektoggle = false;
    this.hrmonthtoggle = false;
  }
  hrdayBtnColor(){
    this.hrhourtoggle = false;
   this.hrdaytoggle = true;
    this.hrweektoggle = false;
    this.hrmonthtoggle = false;
  }
  hrweekBtnColor(){
    this.hrhourtoggle = false;
    this.hrdaytoggle = false;
    this.hrweektoggle = true;
    this.hrmonthtoggle = false;
  }
  hrmonthBtnColor(){
    this.hrhourtoggle = false;
    this.hrdaytoggle = false;
    this.hrweektoggle = false;
    this.hrmonthtoggle = true;
  }

  bphourBtnColor(){
    this.bphourtoggle = true;
   this. bpdaytoggle = false;
    this.bpweektoggle = false;
    this.bpmonthtoggle = false;
  }
  bpdayBtnColor(){
    this.bphourtoggle = false;
   this.bpdaytoggle = true;
    this.bpweektoggle = false;
    this.bpmonthtoggle = false;
  }
  bpweekBtnColor(){
    this.bphourtoggle = false;
    this.bpdaytoggle = false;
    this.bpweektoggle = true;
    this.bpmonthtoggle = false;
  }
  bpmonthBtnColor(){
    this.bphourtoggle = false;
    this.bpdaytoggle = false;
    this.bpweektoggle = false;
    this.bpmonthtoggle = true;
  }

  oxyhourBtnColor(){
    this.oxyhourtoggle = true;
    this.oxydaytoggle = false;
    this.oxyweektoggle = false;
    this.oxymonthtoggle = false;
  }
  oxydayBtnColor(){
    this.oxyhourtoggle = false;
    this.oxydaytoggle = true;
    this.oxyweektoggle = false;
    this.oxymonthtoggle = false;
  }
  oxyweekBtnColor(){
    this.oxyhourtoggle = false;
    this.oxydaytoggle = false;
    this.oxyweektoggle = true;
    this.oxymonthtoggle = false;
  }
  oxymonthBtnColor(){
    this.oxyhourtoggle = false;
    this.oxydaytoggle = false;
    this.oxyweektoggle = false;
    this.oxymonthtoggle = true;
  }
  temphourBtnColor(){
    this.temphourtoggle = true;
    this.tempdaytoggle = false;
    this.tempweektoggle = false;
    this.tempmonthtoggle = false;
  }
  tempdayBtnColor(){
    this.temphourtoggle = false;
    this.tempdaytoggle = true;
    this.tempweektoggle = false;
    this.tempmonthtoggle = false;
  }
  tempweekBtnColor(){
    this.temphourtoggle = false;
    this.tempdaytoggle = false;
    this.tempweektoggle = true;
    this.tempmonthtoggle = false;
  }
  tempmonthBtnColor(){
    this.temphourtoggle = false;
    this.tempdaytoggle = false;
    this.tempweektoggle = false;
    this.tempmonthtoggle = true;
  }
  openlink(PDFFile:any){
    console.log('szszszsz',PDFFile)
    // console.log('pdf1',this.EcgList)
    // console.log('pdf2',this.EcgList.PDFFile)

    // window.open("https://s3-us-west-2.amazonaws.com/secureoneanvayaa/Customers/AKCBT0000000097/d0d6bb80-29e4-11ee-b80c-83a421181c03.pdf");
    window.open( PDFFile.PDFFile,"_blank");
    // console.log('pdfdata',this.EcgList.PDFFile)

  }

}
