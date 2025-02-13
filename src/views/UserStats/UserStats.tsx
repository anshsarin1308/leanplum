/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import { UserEntity } from "../../models/UsersEntity";
import './UserStats.scss'

Vue.use(HighchartsVue);

@Component
export default class UserStats extends Vue {
  isChartView = false;
  userStats: Record<string, number> = {};

  get chartOptions(): Highcharts.Options {
    return {
      chart: {
        type: "line"
      },
      title: {
        text: "User Distribution by Location"
      },
      xAxis: {
        categories: Object.keys(this.userStats)
      },
      yAxis: {
        title: {
          text: "Number of Users"
        }
      },
      series: [
        {
          name: "Users",
          type: "line",
          data: Object.values(this.userStats)
        }
      ]
    };
  }

  created() {
    this.loadUserStats();
  }

  watch = {
    userStats: {
      handler(newVal: Record<string, number>) {
        localStorage.setItem("userStats", JSON.stringify(newVal));
      },
      deep: true
    }
  };

  loadUserStats() {
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      this.userStats = { "No Data": 0 };
      return;
    }
    const users: Array<UserEntity> = JSON.parse(storedUsers) || [];
    this.userStats = users.reduce((acc, user) => {
      acc[user.location] = (acc[user.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  render(h: CreateElement) {
    return (
      <div class="user-stats">
        <h2>User Statistics</h2>
        <button onClick={() => (this.isChartView = !this.isChartView)}>
          {this.isChartView ? "Show Table" : "Show Chart"}
        </button>

        {!this.isChartView ? (
          <table cellspacing="1" border="1">
            <thead>
              <tr>
                <th>Location</th>
                <th>Total Unique Users</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.userStats).map(([location, count]) => (
                <tr key={location}>
                  <td>{location}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <highcharts options={this.chartOptions}></highcharts>
        )}

        <button onClick={() => this.$router.push("/home")}>Back to Home</button>
      </div>
    );
  }
}
