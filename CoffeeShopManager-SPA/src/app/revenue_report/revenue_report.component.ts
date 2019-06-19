import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-revenue_report',
  templateUrl: './revenue_report.component.html',
  styleUrls: ['./revenue_report.component.css']
})
export class Revenue_reportComponent implements OnInit {

  @ViewChild("chart")
  public refChart: ElementRef;

  public chartData: any;

  public constructor() {
    this.chartData = {};
}

  public ngOnInit() {
  this.chartData = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: 'Doanh thu (triệu đồng)',
          data: [12, 19, 3, 5, 2, 3],
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

public ngAfterViewInit() {
  let chart = this.refChart.nativeElement;
  let ctx = chart.getContext("2d");
  let myChart = new Chart(ctx, {
      type: 'bar',
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

sortByMonth() {
  console.log('month')
}
sortByWeek() {
  console.log('week')
}
sortByDate() {
  console.log('date')
}
}

