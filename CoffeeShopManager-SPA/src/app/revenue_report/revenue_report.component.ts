import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import * as XLSX from 'xlsx';

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
  weekLabels: any;
  weekData: any;
  dateLabels: any;
  dateData: any;
  data: AOA = [ [1, 2], [3, 4] ];
  fileName = 'SheetJS.xlsx';
  count: number;
  isExportable = false;

  public constructor() {
    this.chartData = {};
    // TODO:
    // get all bills = > filter by 6 nearest months => implement get bill by month number
    // filter by 6 nearest days
    // filter by 6 nearest weeks
    // this is temp data:
    this.monthLabels = ['Tháng', '4', '5', '6', '7', '8', '9'];
    this.monthData = [12, 19, 3, 5, 2, 3];
    this.weekLabels = ['Tuần', '4', '5', '6', '7', '8', '9'];
    this.weekData = [12, 19, 3, 5, 2, 3];
    this.dateLabels = ['Ngày', '4', '5', '6', '7', '8', '9'];
    this.dateData = [12, 19, 3, 5, 2, 3];
    this.count = 0;
}

  public ngOnInit() {

}

sortByMonth() {
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
sortByWeek() {
  this.count = 2;
  this.chartData = {
    labels: this.weekLabels,
    datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: this.weekData,
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

  switch (this.count)
  {
    case 1:
      {
        this.fileName = 'BaoCaoDoanhThuTheoThang.xlsx';
        this.monthData.unshift("Doanh Thu");
        this.data = [this.monthLabels, this.monthData];
        this.exportToExcel();
        break;
      }
    case 2:
      {
        this.fileName = 'BaoCaoDoanhThuTheoTuan.xlsx';
        this.weekData.unshift("Doanh Thu");
        this.data = [this.weekLabels, this.weekData];
        this.exportToExcel();
        break;
      }
    case 3:
      {
        this.fileName = 'BaoCaoDoanhThuTheoNgay.xlsx';
        this.dateData.unshift("Doanh Thu");
        this.data = [this.dateLabels, this.dateData];
        this.exportToExcel();
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

