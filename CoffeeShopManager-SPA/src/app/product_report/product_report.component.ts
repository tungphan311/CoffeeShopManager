import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import * as XLSX from 'xlsx';
import { BillService } from '../_service/Bills/bill.service';
import { Bill } from '../_models/Bill';
import { BillDetail } from '../_models/BillDetail';
import { formatDate } from '@angular/common';
import { PaginatedResult } from '../_models/Pagination';
import { ProductService } from '../_service/Products/product.service';
import { ProductDetailService } from '../_service/ProductDetails/product-detail.service';
import { ProductDetail } from '../_models/ProductDetail';
import { Products } from '../_models/Products';

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
  billDetailResult: number[]=[];
  billDetailLabel: string[]=[];
  billDetail: BillDetail[] = [];
  public constructor(
    private billService: BillService,
    private productService: ProductService,
    private detailService: ProductDetailService,
  ) {
    this.chartData = {};
    this.labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    this.dataChart = [12, 19, 3, 5, 2, 3];
}

  public ngOnInit() {
  this.chartData = {
      labels: this.billDetailLabel,
      datasets: [{
          label: '',
          data: this.billDetailResult,
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
}

getData(chart: Chart) {
    let today = new Date();
    let jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+07');

    let userParams: any = {};
    // userParams.month = today.getMonth() + 1;
    userParams.month = 0;
    // userParams.day = today.getDate();
    userParams.day = 0;
    userParams.year = today.getFullYear();

    let bills: Bill[] = [];
    let billDetails: BillDetail[] =[];


    this.billService.getBills(userParams).subscribe((res: PaginatedResult<Bill[]>) => {
        this.bill = res.result;
        this.bill.forEach(element => {
            this.billService.getBillDetail(element.id).subscribe(result => {
                result.forEach(element => {
                    billDetails.push(element);
                    for (let i = 0; i < billDetails.length; i++) {
                        for (let k = i + 1; k < billDetails.length; k++)
                        {
                            if (billDetails[i].productDetailId === billDetails[k].productDetailId) {
                                billDetails[i].amount += billDetails[k].amount;
                                billDetails.splice(k, 1);
                                this.billDetailResult.push(billDetails[i].amount);

                                billDetails.forEach(bill => {
                                    this.detailService.getProductDetailById(bill.productDetailId).subscribe((detail: ProductDetail) =>{
                                        this.productService.getProduct(detail.productId).subscribe((product: Products) =>{
                                            this.billDetailLabel.push(product.name);
                                        })
                                    })
                                })
                                // tslint:disable-next-line: only-arrow-functions
                                this.billDetailResult.sort(function(a, b){return b - a});
                             }
                        }
                     }
                });
                console.log(this.billDetailResult);
                console.log(this.billDetailLabel);
                this.billDetailLabel.slice(0,4);
                chart.update();
            })
        });
    })
}
exportToExcel()
{
    this.billDetailLabel.length = 5;
    this.billDetailLabel.unshift('Sản phẩm');
    // this.billDetailResult.unshift('Doanh Thu');
    this.data = [this.billDetailLabel, this.billDetailResult];
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

  this.getData(myChart);
}

}
