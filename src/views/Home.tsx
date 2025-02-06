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

  columns: Array<ColumnDescriptor<UserEntity>> = [
    { title: 'User ID', render: this.renderFunc },
    { title: 'Location', render: this.renderLocation },
    { title: 'Devices', render: this.renderDevices },
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

  private onRowClick(item: UserEntity) {
    this.selectedUser = item;
  }

  private closeModal() {
    this.selectedUser = null;
  }

  render() {
    return (
      <div class="home-container">
        <div class="header">
          <h2>User List</h2>
        </div>
        <Table
          columns={this.columns}
          items={this.users}
          on={{ 'row-click': this.onRowClick }}
        />
        {this.selectedUser && (
          <UserModal
            selectedUser={this.selectedUser}
            on={{ close: this.closeModal }} 
          />
        )}
      </div>
    );
  }
}
