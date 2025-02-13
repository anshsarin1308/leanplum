/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { UserEntity } from '../../models/UsersEntity';
import './UserModal.scss'

@Component
export default class UserSidePanel extends Vue {
  @Prop({ required: false }) readonly selectedUser!: UserEntity | null;
  @Prop({ required: true }) readonly isCreatingUser!: boolean;
  @Prop({ required: true }) readonly users!: UserEntity[];

  newUser: UserEntity = new UserEntity();
  emailExists = false;

  closeModal() {
    this.$emit('close');
  }

  formatDate(date: number): string {
    return new Date(date).toLocaleDateString();
  }

  submitForm() {
    if (this.users.some(user => user.attributes.email === this.newUser.attributes.email)) {
      this.emailExists = true;
      return;
    }
    this.emailExists = false;
    this.$emit('create-user', { ...this.newUser });
    this.closeModal();
  }

  render() {
    if (!this.selectedUser && !this.isCreatingUser) return null;

    return (
      <div class="side-panel">
        <button class="close-btn" onClick={this.closeModal}>✖</button>
        <br />
        <h3>{this.isCreatingUser ? 'Create New User' : 'User Details'}</h3>
        
        {!this.isCreatingUser && this.selectedUser ? (
          <div class="user-info">
            <p><span class="label">Location:</span> {this.selectedUser.location}</p>
            <p><span class="label">Devices:</span> {this.selectedUser.devices}</p>
            <p><span class="label">Developer:</span> {this.selectedUser.isDeveloper ? 'Yes' : 'No'}</p>
            <p><span class="label">Sessions:</span> {this.selectedUser.sessions.length}</p>
            <p><span class="label">Created:</span> {this.formatDate(this.selectedUser.created)}</p>
            <p><span class="label">Events:</span> {this.selectedUser.events}</p>
            <p><span class="label">Bucket:</span> {this.selectedUser.bucket}</p>
            <p>
              <span class="label">Channels:</span>
              Push: {this.selectedUser.channels.push ? 'Yes' : 'No'},
              Email: {this.selectedUser.channels.email ? 'Yes' : 'No'},
              Webhook: {this.selectedUser.channels.webhook ? 'Yes' : 'No'},
              App Inbox: {this.selectedUser.channels.appInbox ? 'Yes' : 'No'}
            </p>
            <p><span class="label">Email:</span> {this.selectedUser.attributes.email}</p>
          </div>
        ) : (
          <form class="user-form" onSubmit={(e: any) => { e.preventDefault(); this.submitForm(); }}>
            <label for="name">Name:</label>
            <input id="name" type="text" v-model={this.newUser.id} required />

            <label for="email">Email:</label>
            <input id="email" type="email" v-model={this.newUser.attributes.email} required />
            {this.emailExists && <p class="error">Email already exists!</p>}

            <label for="location">Location:</label>
            <input id="location" type="text" v-model={this.newUser.location} required />

            <label for="devices">Devices:</label>
            <input id="devices" type="number" v-model={this.newUser.devices} required />

            <button type="submit" >Create User</button>
          </form>
        )}
      </div>
    );
  }
}
