<template>
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
  </style>
  