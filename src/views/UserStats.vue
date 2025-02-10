<template>
    <div class="user-stats">
      <h2>User Statistics</h2>
  
      <!-- Toggle Button -->
      <button @click="isChartView = !isChartView">
        {{ isChartView ? "Show Table" : "Show Chart" }}
      </button>
  
      <!-- Table View -->
      <div v-if="!isChartView">
        <table cellspacing="1" border="1">
          <thead>
            <tr>
              <th>Location</th>
              <th>Total Unique Users</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(count, location) in userStats" :key="location">
              <td>{{ location }}</td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Chart View -->
      <highcharts v-if="isChartView" :options="chartOptions"></highcharts>
  
      <button @click="$router.push('/home')">Back to Home</button>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import Highcharts from "highcharts";
  import HighchartsVue from "highcharts-vue";
  import { UserEntity } from "../models/UsersEntity";
  
  Vue.use(HighchartsVue);
  
  export default Vue.extend({
    data() {
      return {
        isChartView: false, 
        userStats: {} as Record<string, number>, 
      };
    },
    computed: {
      // Generate chart options dynamically
      chartOptions(): Highcharts.Options {
        return {
          chart: { type: "line" },
          title: { text: "User Distribution by Location" },
          xAxis: { categories: Object.keys(this.userStats) },
          yAxis: { title: { text: "Number of Users" } },
          series: [
            {
              name: "Users",
              data: Object.values(this.userStats),
              type: "line",
            },
          ],
        };
      },
    },
    created() {
      this.loadUserStats();
    },
    watch: {
      // Watch for changes in localStorage to update user stats dynamically
      userStats: {
        handler() {
          localStorage.setItem("userStats", JSON.stringify(this.userStats));
        },
        deep: true,
      },
    },
    methods: {
      loadUserStats() {
        const storedUsers = localStorage.getItem("users");
        if (!storedUsers) {
          this.userStats = { "No Data": 0 }; // Prevent empty state
          return;
        }
  
        const users: Array<UserEntity> = JSON.parse(storedUsers) || [];
        this.userStats = users.reduce((acc, user) => {
          acc[user.location] = (acc[user.location] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      },
    },
  });
  </script>
  
  <style scoped>
  .user-stats {
    padding: 20px;
    text-align: center;
  }
  table {
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: red;
  }
  </style>
  



  <!-- old code for refernce  -->
  <!-- <template>
    <div class="user-stats">
      <h2>User Statistics</h2>
      <table cellspacing="1" border="1">
        <thead>
          <tr>
            <th>Location</th>
            <th>Total Unique Users</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, location) in userStats" :key="location">
            <td>{{ location }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="$router.push('/home')">Back to Home</button>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { UserEntity } from "../models/UsersEntity";
  
  export default Vue.extend({
    data() {
      return {
        userStats: {} as Record<string, number>,
      };
    },
    created() {
      this.updateUserStats();
      window.addEventListener('storage', this.updateUserStats); 
    },
    destroyed() {
      window.removeEventListener('storage', this.updateUserStats);
    },
    methods: {
      updateUserStats() {
        const storedUsers = localStorage.getItem('users');
        const users: Array<UserEntity> = storedUsers ? JSON.parse(storedUsers) : [];
        this.userStats = users.reduce((acc, user) => {
          acc[user.location] = (acc[user.location] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      }
    }
  });
  </script>
  
  <style scoped>
  .user-stats {
    padding: 20px;
    text-align: center;
  }
  table {
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: red;
  }
  </style> -->
  