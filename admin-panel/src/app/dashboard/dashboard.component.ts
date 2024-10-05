import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../data.service'; 

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexDataLabels
} from "ng-apexcharts";
import { DashboardService } from '../core/services/dashboard.service';


interface ChartOptions {
  series: ApexAxisChartSeries; // Ensure this matches the correct type
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  
  // chartOptions: ChartOptions = {
  //   series: [
  //     {
  //       name: "Sample Series",
  //       data: [10, 20, 10, 40] // Example data
  //     }
  //   ],
  //   chart: {
  //     type: 'line', // Specify the chart type
  //     height: 350
  //   },
  //   xaxis: {
  //     categories: ['Jan', 'Feb', 'Mar', 'Apr']
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   title: {
  //     text: "Sample Chart"
  //   }
  // };

  public chartOptions: Partial<ChartOptions> | any;
  userCount: number = 0;
  bannerCount: number = 0;
  productCount: number = 0;
  
  constructor( private dataService: DataService, private dashboardService: DashboardService ){}

  ngOnInit() :void{
    this.dataService.getData().subscribe(data =>{
      this.setupChart(data);
    });

    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboard().subscribe(
      (response) => {
        this.userCount = response.data.userCount;
        this.bannerCount = response.data.bannerCount;
        this.productCount = response.data.productCount;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  setupChart(data:any): void{
    const categories = data.map((item:any) => item.category);
    const values = data.map((item:any) =>item.value);

    this.chartOptions = {
      series:[{
        name: "Monthly Calculations",
        data:values
      }],
      chart:{
        type: 'bar',
        height:350,
        width:600
      },
      xaxis:{
        categories:categories
      },
      title: {
        text: "Sample Chart of Monthly Calculations"
      },
    }
  }


}
