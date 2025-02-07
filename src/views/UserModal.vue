<template>
  <div class="side-panel" v-if="selectedUser">
    <button class="close-btn" @click="closeModal">✖</button>
    <h3>User Details</h3>
    <div class="user-info">
      <p><span class="label">Location:</span> {{ selectedUser.location }}</p>
      <p><span class="label">Devices:</span> {{ selectedUser.devices }}</p>
      <p><span class="label">Developer:</span> {{ selectedUser.isDeveloper ? 'Yes' : 'No' }}</p>
      <p><span class="label">Sessions:</span> {{ selectedUser.sessions.length }}</p>
      <p><span class="label">Created:</span> {{ new Date(selectedUser.created).toLocaleDateString() }}</p>
      <p><span class="label">Events:</span> {{ selectedUser.events }}</p>
      <p><span class="label">Bucket:</span> {{ selectedUser.bucket }}</p>
      <p><span class="label">Channels:</span> 
        Push: {{ selectedUser.channels.push ? 'Yes' : 'No' }},
        Email: {{ selectedUser.channels.email ? 'Yes' : 'No' }},
        Webhook: {{ selectedUser.channels.webhook ? 'Yes' : 'No' }},
        App Inbox: {{ selectedUser.channels.appInbox ? 'Yes' : 'No' }}
      </p>
      <p><span class="label">Email:</span> {{ selectedUser.attributes.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedUser: Object,
  },
  methods: {
    closeModal() {
      this.$emit('close'); 
    }
  }
};
</script>

<style scoped>
.side-panel {
  width: 300px;
  height: 100%;
  top: 15%;
  background: white;
  padding: 16px;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #e1e4e5;
}

.close-btn {
  position: absolute;
  top: 16px;
  left: 16px;
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
  font-size: 16px;
  margin-bottom: 15px;
}

.user-info p {
  font-size: 14px;
  margin: 10px 0;
  padding: 8px;
  background: #f6f9fb;
  border-radius: 4px;
}

.label {
  font-weight: bold;
  color: #555;
}
</style>
