<template>
  <div class="side-panel" v-if="selectedUser || isCreatingUser">
    <button class="close-btn" @click="closeModal">✖</button>

    <h3 v-if="!isCreatingUser">User Details</h3>
    <h3 v-else>Create New User</h3>

    <!-- Display User Details -->
    <div v-if="selectedUser && !isCreatingUser" class="user-info">
      <p><span class="label">Location:</span> {{ selectedUser.location }}</p>
      <p><span class="label">Devices:</span> {{ selectedUser.devices }}</p>
      <p><span class="label">Developer:</span> {{ selectedUser.isDeveloper ? 'Yes' : 'No' }}</p>
      <p><span class="label">Sessions:</span> {{ selectedUser.sessions.length }}</p>
      <p><span class="label">Created:</span> {{ formatDate(selectedUser.created) }}</p>
      <p><span class="label">Events:</span> {{ selectedUser.events }}</p>
      <p><span class="label">Bucket:</span> {{ selectedUser.bucket }}</p>
      <p>
        <span class="label">Channels:</span>
        Push: {{ selectedUser.channels.push ? 'Yes' : 'No' }},
        Email: {{ selectedUser.channels.email ? 'Yes' : 'No' }},
        Webhook: {{ selectedUser.channels.webhook ? 'Yes' : 'No' }},
        App Inbox: {{ selectedUser.channels.appInbox ? 'Yes' : 'No' }}
      </p>
      <p><span class="label">Email:</span> {{ selectedUser.attributes.email }}</p>
    </div>

    <!-- Create New User Form -->
    <form v-if="isCreatingUser" class="user-form" @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input id="name" type="text" v-model="newUser.id" required />

      <label for="email">Email:</label>
      <input id="email" type="email" v-model="newUser.attributes.email" required />
      <p v-if="emailExists" class="error">Email already exists!</p>

      <label for="location">Location:</label>
      <input id="location" type="text" v-model="newUser.location" required />

      <label for="devices">Devices:</label>
      <input id="devices" type="number" v-model="newUser.devices" required />

      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserEntity } from "../models/UsersEntity";

export default Vue.extend({
  props: {
    selectedUser: Object as () => UserEntity | null,
    isCreatingUser: Boolean,
    users: Array as () => UserEntity[],
  },
  data() {
    return {
      newUser: new UserEntity(),
      emailExists: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    formatDate(date: number): string {
      return new Date(date).toLocaleDateString();
    },
    submitForm() {
      if (this.users.some((user) => user.attributes.email === this.newUser.attributes.email)) {
        this.emailExists = true;
        return;
      }
      this.emailExists = false;

      this.$emit("create-user", { ...this.newUser });
      this.closeModal();
    },
  },
});
</script>

<style scoped>
/* .side-panel {
  position: fixed;
  top: 15%;
  right: 0;
  width: 320px;
  height: 100%;
  background: white;
  padding: 20px;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  border-left: 1px solid #e1e4e5;
} */

.side-panel {
  position: fixed;
  top: 25%;
  right: 0;
  width: 200px;
  height: 100%;
  background: white;
  padding: 20px;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  border-left: 1px solid #e1e4e5;
}


.close-btn {
  position: absolute;
  top: 15px;
  right: 150px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: red;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.user-info p {
  font-size: 14px;
  margin: 8px 0;
  padding: 6px;
  background: #f6f9fb;
  border-radius: 4px;
}

.label {
  font-weight: bold;
  color: #555;
}

.user-form label {
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  display: block;
}

.user-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
}

button:hover {
color: red;}

.error {
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
}
</style> 