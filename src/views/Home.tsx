/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Component, Vue } from 'vue-property-decorator';
import './Home.scss';
import { generateSampleData, UserEntity } from '../models/UsersEntity';
import { ColumnDescriptor, Table } from '../components/Table';
import { VNode } from 'vue';
import UserModal from './UserModal.vue';


@Component({
  name: "Home",
  components: {
    UserModal,
  }
})
export default class Home extends Vue {
  users: Array<UserEntity> = generateSampleData();
  selectedUser: UserEntity | null = null;
  isCreatingUser = false;
  sortKey: keyof UserEntity | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  created() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = generateSampleData();
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  get sortedUsers() {
    if (!this.sortKey) return this.users;
    return [...this.users].sort((a, b) => {
      const valA = a[this.sortKey!];
      const valB = b[this.sortKey!];
      if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  columns: Array<ColumnDescriptor<UserEntity>> = [
    { title: 'User ID', render: this.renderFunc, sortable: true, key: 'id' },
    { title: 'Location', render: this.renderLocation, sortable: true, key: 'location' },
    { title: 'Devices', render: this.renderDevices, sortable: true, key: 'devices' },
    { title: 'Actions', render: this.renderActions } 
  ];

  private renderFunc(item: UserEntity): VNode {
    return <span>{item.id}</span>;
  }

  private renderLocation(item: UserEntity): VNode {
    return <span>{item.location}</span>;
  }

  private renderDevices(item: UserEntity): VNode {
    return <span>{item.devices}</span>;
  }

  private renderActions(item: UserEntity): VNode {
    return (
      <button onClick={() => this.deleteUser(item.id)} class="delete-btn">Delete</button>
    );
  }

  private onRowClick(item: UserEntity) {
    this.selectedUser = item;
    this.isCreatingUser = false;
  }

  private openCreateUserModal() {
    this.isCreatingUser = true;
    this.selectedUser = null;
  }

  private closeModal() {
    this.selectedUser = null;
    this.isCreatingUser = false;
  }

  private sortColumn(key: keyof UserEntity) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc';
    }
  }

  private handleCreateUser(newUser: UserEntity) {
    this.users.push(newUser);
    this.closeModal();
  }

  private deleteUser(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.$emit('user-updated'); 
  }

  render() {
    return (
      <div class="home-container">
        <div class="header">
          <h2>User List</h2>
          <button class="create-user-btn" onClick={this.openCreateUserModal}>+ Create User</button>
          {/* <button class="stats-btn" onClick={() => this.$router.push('/stats')}>View User Stats</button> 
          <button class="stats-btn" onClick={() => this.$router.push('/device-stats')}>
            View Device Stats
          </button> */}
        </div>
        <div class="content-container">
          <div class={`table-container ${this.selectedUser || this.isCreatingUser ? 'with-details' : ''}`}>
            <Table
              columns={this.columns}
              items={this.sortedUsers}
              on={{ 'row-click': this.onRowClick, 'sort': this.sortColumn }}
            />
          </div>
          {(this.selectedUser || this.isCreatingUser) && (
            <UserModal
              selectedUser={this.selectedUser}
              isCreatingUser={this.isCreatingUser}
              users={this.users}
              on={{
                close: this.closeModal,
                'create-user': this.handleCreateUser,
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
