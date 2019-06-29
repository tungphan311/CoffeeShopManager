import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import * as XLSX from 'xlsx';
import { BillService } from '../_service/Bills/bill.service';
import { Bill } from '../_models/Bill';
import { BillDetail } from '../_models/BillDetail';
import { formatDate } from '@angular/common';
import { PaginatedResult } from '../_models/Pagination';

type AOA = any[][];
@Component({
  selector: 'app-product_report',
  templateUrl: './product_report.component.html',
  styleUrls: ['./product_report.component.css']
})
export class Product_reportComponent implements OnInit {

  @ViewChild('chart')
  public refChart: ElementRef;

  public chartData: any;

  data: AOA = [ [1, 2], [3, 4] ];
  fileName = 'BaoCaoSanPhamBanChay.xlsx';
  labels: any;
  dataChart: any;
  bill: Bill[] = [];
  billDetail: BillDetail[] = [];
  public constructor(
    private billService: BillService,
  ) {
    this.chartData = {};
    this.labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    this.dataChart = [12, 19, 3, 5, 2, 3];
}

  public ngOnInit() {
  this.chartData = {
      labels: this.labels,
      datasets: [{
          label: '',
          data: this.dataChart,
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
  this.getData();
}

getData() {
    let today = new Date();
    let jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+07');

    let userParams: any = {};
    // userParams.month = today.getMonth() + 1;
    userParams.month = 0;
    // userParams.day = today.getDate();
    userParams.day = 0;
    userParams.year = today.getFullYear();

    let bills: Bill[] = [];

    this.billService.getBills(userParams).subscribe((res: PaginatedResult<Bill[]>) => {
        this.bill = res.result;
        this.bill.forEach(element => {
            this.billService.getBillDetail(element.id).subscribe(result => {
                console.log(result);
            })
        });
    })
}
exportToExcel()
{
    this.labels.unshift("Sản phẩm");
    this.dataChart.unshift("Doanh Thu")
    this.data = [this.labels, this.dataChart];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DoanhThu');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.labels.shift();
    this.dataChart.shift();
    this.data = [this.labels, this.dataChart];
}


public ngAfterViewInit() {
  let chart = this.refChart.nativeElement;
  let ctx = chart.getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'pie',
      data: this.chartData,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

}
