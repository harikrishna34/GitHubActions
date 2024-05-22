import { Component ,ElementRef,OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-requests-dashboard',
  templateUrl: './requests-dashboard.component.html',
  styleUrls: ['./requests-dashboard.component.css']
})
export class RequestsDashboardComponent implements OnInit {
  items:any=[
    {
      title: "Pending Request",
      value:"15"
    },
    {
      title: "Approved Request",
      value:"30"
    },
    {
      title: "Closed Request",
      value:"150"
    },
    {
      title: "Pending ",
      value:"15"
    },
    {
      title: "Approved ",
      value:"320"
    },
    {
      title: "Closed ",
      value:"950"
    },
    {
      title: "Pending  && Request",
      value:"175"
    },
    {
      title: "Approved && Request",
      value:"300"
    },
    {
      title: "Closed && Request",
      value:"120"
    }
  ];



  ngOnInit(): void {


  }
  activeTab = 'tab1'; // Initial active tab
  @ViewChildren('tabElement') tabElements: QueryList<ElementRef>;

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.updateTabClasses();
  }

  updateTabClasses() {
    if (this.tabElements) {
      this.tabElements.forEach(tabElement => {
        const tabId = tabElement.nativeElement.id;
        if (tabId === this.activeTab) {
          tabElement.nativeElement.classList.add('active');
        } else {
          tabElement.nativeElement.classList.remove('active');
        }
      });
    }
  }
}
