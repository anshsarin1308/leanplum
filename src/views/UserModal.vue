<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✖</button>
      <h3>User Details</h3>
      <div class="user-info">
        <p><span class="label">ID:</span> {{ selectedUser.id }}</p>
        <p><span class="label">Location:</span> {{ selectedUser.location }}</p>
        <p><span class="label">Devices:</span> {{ selectedUser.devices }}</p>
      </div>
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
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 100%;
  max-width: 350px;
  height: 100%;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px 0 0 8px;
  overflow-y: auto;
}

h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.user-info p {
  font-size: 16px;
  margin: 10px 0;
  padding: 8px;
  background: #f6f9fb;
  border-radius: 4px;
}

.label {
  font-weight: bold;
  color: #555;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: red;
}
</style>
