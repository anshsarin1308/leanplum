import { Component, Vue } from 'vue-property-decorator';
import { Options } from 'highcharts';
import {  SeriesColumnOptions } from 'highcharts';
import { UserEntity } from '../models/UsersEntity';
import './DeviceStats.scss';

@Component({
  name: "DeviceStats"
})
export default class DeviceStats extends Vue {
  private isChartView = false;
  private deviceStats: Record<string, number> = {};

  created() {
    this.loadDeviceStats();
  }

  get chartOptions(): Options {
    const seriesData: SeriesColumnOptions = {
      name: 'Devices',
      type: 'column',
      data: Object.values(this.deviceStats),
      color: '#2ecc71'
    };

    return {
      chart: {
        type: 'column',
        backgroundColor: '#f8f9fa'
      },
      title: {
        text: 'Device Distribution by Location'
      },
      xAxis: {
        categories: Object.keys(this.deviceStats),
        title: {
          text: 'Locations'
        },
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Number of Devices'
        },
        min: 0
      },
      plotOptions: {
        column: {
          borderRadius: 5,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.key}</span><br>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b> devices<br/>'
      },
      series: [seriesData]
    };
  }

  private loadDeviceStats() {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      this.deviceStats = { 'No Data': 0 };
      return;
    }

    const users: Array<UserEntity> = JSON.parse(storedUsers) || [];
    this.deviceStats = users.reduce((acc, user) => {
      acc[user.location] = (acc[user.location] || 0) + user.devices;
      return acc;
    }, {} as Record<string, number>);
  }

  private toggleView() {
    this.isChartView = !this.isChartView;
  }

  render() {
    return (
      <div class="device-stats">
        <h2>Device Statistics</h2>

        <button onClick={this.toggleView}>
          {this.isChartView ? "Show Table" : "Show Chart"}
        </button>

        {!this.isChartView && (
          <table cellspacing="1" border="1">
            <thead>
              <tr>
                <th>Location</th>
                <th>Total Devices</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.deviceStats).map(([location, count]) => (
                <tr key={location}>
                  <td>{location}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {this.isChartView && (
          <highcharts
            options={this.chartOptions}
          ></highcharts>
        )}

        <button onClick={() => this.$router.push('/home')}>
          Back to Home
        </button>
      </div>
    );
  }
}