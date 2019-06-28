import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import * as XLSX from 'xlsx';
import { BillService } from '../_service/Bills/bill.service';
import { AlertifyService } from '../_service/alertify.service';
import { Bill } from '../_models/Bill';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { formatDate } from '@angular/common';
// import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
type AOA = any[][];


// Muon chay duoc report voi xuat ra excel thi phai chay 2 lenh sau
// npm install xlsx --save
// npm install chart.js --save
@Component({
  selector: 'app-revenue_report',
  templateUrl: './revenue_report.component.html',
  styleUrls: ['./revenue_report.component.css']
})
export class Revenue_reportComponent implements OnInit {

  @ViewChild('chart')
  public refChart: ElementRef;

  public chartData: any;
  chart: any;
  ctx: any;
  myChart: any;
  monthLabels: any;
  monthData: any;
  yearLabels: any;
  yearData: any;
  dateLabels: any;
  dateData: any;
  data: AOA = [ [1, 2], [3, 4] ];
  fileName = '';
  count: number;
  isExportable = false;

  // model: NgbDateStruct;

  bills: Bill[] = [];
  bill: Bill = JSON.parse(localStorage.getItem('bill'));


  today = new Date();
  jstoday = '';

  pagination: Pagination;


  public constructor(
    private billService: BillService,
    private alertify: AlertifyService,
    // private calendar: NgbCalendar
  ) {
    this.chartData = {};
    // TODO:
    // get all bills = > filter by 6 nearest months => implement get bill by month number
    // filter by 6 nearest days
    // filter by 6 nearest years
    // this is temp data:
    // this.monthLabels = [ '4', '5', '6', '7', '8', '9'];
    // this.monthLabels = [month - 5, month - 4, month - 3, month - 2, month - 1, month];
    const firstMonth = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    const secondMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
    const thirdMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 2, this.today.getDate());
    const forthMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 3, this.today.getDate());
    const fifthMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 4, this.today.getDate());
    const sixthMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 5, this.today.getDate());

// tslint:disable-next-line: max-line-length
    this.monthLabels = [sixthMonth.getMonth() + 1, fifthMonth.getMonth() + 1, forthMonth.getMonth() + 1, thirdMonth.getMonth() + 1, secondMonth.getMonth() + 1, firstMonth.getMonth() + 1];

    // this.monthData = [12, 19, 3, 5, 2, 3];
    this.monthData = [];
    // const month =  this.today.getMonth();
    // this.monthLabels = [month - 5, month - 4, month - 3, month - 2, month - 1, month];
    const year = this.today.getFullYear();

    this.yearLabels = [ year - 5, year - 4, year - 3, year - 2, year - 1, year];
    this.yearData = [];

    // const date = this.today.getDate();
    // this.dateLabels = [ '4', '5', '6', '7', '8', '9'];
    const firstday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    const secondday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
    const thirdday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 2);
    const forthday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3);
    const fifthday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 4);
    const sixthday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 5);
// tslint:disable-next-line: max-line-length
    this.dateLabels = [sixthday.getDate(), fifthday.getDate(), forthday.getDate(), thirdday.getDate(), secondday.getDate(), firstday.getDate()];
    this.dateData = [];

    this.count = 0;


    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+07');
}

  public ngOnInit() {
    // this.loadBills(0,0,0);
    // userParams.month = this.today.getMonth() + 1;
    // userParams.day = 0;
    // userParams.year = this.today.getFullYear();


    this.sortByMonth();
    this.sortByDate();
    this.sortByYear();
    this.isExportable = false;


    // userParams.year = 2016;
    // this.loadBills();

}
sortByMonth() {
  const month = this.today.getMonth() + 1;
  let userParams: any = {};
  userParams.month = month;
  userParams.day = 0;
  userParams.year = this.today.getFullYear();
  this.monthData.length = 6;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[5] = result;
  });
  userParams.month -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[4] = result;
  });
  userParams.month -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[3] = result;
  });
  userParams.month -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[2] = result;
  });
  userParams.month -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[1] = result;
  });
  userParams.month -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.monthData[0] = result;
  });


  this.count = 1;
  this.chartData = {
    labels: this.monthLabels,
    datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: this.monthData,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]

};
  this.drawChart();
}
sortByYear() {
  const year = this.today.getFullYear();
  let userParams: any = {};
  userParams.year = year;
  userParams.day = 0;
  userParams.month = 0;
  console.log(userParams)
  this.yearData.length = 6;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[5] = result;
    console.log(result);
  });
  userParams.year -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[4] = result;
  });
  userParams.year -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[3] = result;
  });
  userParams.year -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[2] = result;
  });
  userParams.year -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[1] = result;
  });
  userParams.year -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.yearData[0] = result;
  });

  console.log(this.yearData);
  this.count = 2;
  this.chartData = {
    labels: this.yearLabels,
    datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: this.yearData,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};
  this.drawChart();
}
sortByDate() {
  let userParams: any = {};
  const day = this.today.getDate();
  const month = this.today.getMonth() + 1;
  userParams.month = month;
  userParams.day = day;
  userParams.year = this.today.getFullYear();
  this.dateData.length = 6;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[5] = result;
  });
  userParams.day -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[4] = result;
  });
  userParams.day -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[3] = result;
  });
  userParams.day -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[2] = result;
  });
  userParams.day -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[1] = result;
  });
  userParams.day -= 1;
  this.billService.getTotal(userParams).subscribe(result => {
    this.dateData[0] = result;
  });
  this.count = 3;
  this.chartData = {
    labels: this.dateLabels,
    datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: this.dateData,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};
  this.drawChart();
}
report() {

  switch (this.count) {
    case 1:
      {
        this.fileName = 'BaoCaoDoanhThuTheoThang.xlsx';
        this.monthData.unshift('Doanh Thu');
        this.monthLabels.unshift('Tháng');
        this.data = [this.monthLabels, this.monthData];
        this.exportToExcel();

        this.monthData.shift();
        this.monthLabels.shift();
        break;
      }
    case 2:
      {
        this.fileName = 'BaoCaoDoanhThuTheoNam.xlsx';
        this.yearData.unshift('Doanh Thu');
        this.yearLabels.unshift('Năm');
        this.data = [this.yearLabels, this.yearData];
        this.exportToExcel();
        this.yearData.shift();
        this.yearLabels.shift();

        break;
      }
    case 3:
      {
        this.fileName = 'BaoCaoDoanhThuTheoNgay.xlsx';
        this.dateData.unshift('Doanh Thu');
        this.dateLabels.unshift('Ngày');
        this.data = [this.dateLabels, this.dateData];
        this.exportToExcel();

        this.dateData.shift();
        this.dateLabels.shift();
        break;
      }
    default:
    {
      break;
    }
  }




}
drawChart() {
  this.isExportable = true;
  this.chart = this.refChart.nativeElement;
  this.ctx = this.chart.getContext('2d');
  this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          events: ['click']
      }
  });
  this.chartData = [];
}
exportToExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'DoanhThu');

  /* save to file */
  XLSX.writeFile(wb, this.fileName);
}
}

