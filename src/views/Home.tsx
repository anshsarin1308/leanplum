

// import { Component, Vue } from 'vue-property-decorator';

// import './Home.scss';
// import { generateSampleData, UserEntity } from '../models/UsersEntity';
// import { ColumnDescriptor, Table } from '../components/Table';
// import { VNode } from 'vue';

// @Component({name: "Home"})
// export default class Home extends Vue {
//   users: Array<UserEntity> = generateSampleData();

//   columns: Array<ColumnDescriptor<UserEntity>> = [
//         {
//           title: 'User ID',
//           render: this.renderFunc,
//         },
//         {
//           title: 'Location',
//           render:this.renderLocation
//         },
//         {
//           title: 'Devices',
//           render:this.renderDevices
//         },
//       ];

//       private renderFunc (item: UserEntity): VNode {
//         return <span>{item.id}</span>
//       }

//       private renderLocation (item: UserEntity): VNode {
//         return <span>{item.location}</span>
//       }

//       private renderDevices (item: UserEntity): VNode {
//         return <span>{item.devices}</span>
//       }


    

  

//   render() {
//         return (
//           <div>
//             <div class="header">
//               <h2>User List</h2>
//             </div>
//             <Table
//       columns={this.columns}
//       items={this.users}
//     />
         
    
//             </div>
//   )}

    
// }


import { Component, Vue } from 'vue-property-decorator';
import './Home.scss';
import { generateSampleData, UserEntity } from '../models/UsersEntity';
import { ColumnDescriptor, Table } from '../components/Table';
import { VNode } from 'vue';

@Component({ name: 'Home' })
export default class Home extends Vue {
  users: Array<UserEntity> = generateSampleData();
  selectedUser: UserEntity | null = null;  // State to store selected user

  columns: Array<ColumnDescriptor<UserEntity>> = [
    {
      title: 'User ID',
      render: this.renderFunc,
    },
    {
      title: 'Location',
      render: this.renderLocation,
    },
    {
      title: 'Devices',
      render: this.renderDevices,
    },
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

  // Handle row selection
  private selectUser(user: UserEntity): void {
    console.log("Selected user:", user);
    
    this.selectedUser = user;
  }

  render() {
    return (
      <div>
        <div class="header">
          <h2>User List</h2>
        </div>

        <Table
          columns={this.columns}
          items={this.users}
          onRowClick={this.selectUser} // Pass the selectUser method as a prop
        />

        {/* Side Panel for Selected User */}
        {this.selectedUser && (
          <div class="side-panel">
            <h3>User Details</h3>
            <p>
              <strong>ID:</strong> {this.selectedUser.id}
            </p>
            <p>
              <strong>Location:</strong> {this.selectedUser.location}
            </p>
            <p>
              <strong>Devices:</strong> {this.selectedUser.devices}
            </p>
            <p>
              <strong>Sessions:</strong> {this.selectedUser.sessions.length}
            </p>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(this.selectedUser.created).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    );
  }
}

