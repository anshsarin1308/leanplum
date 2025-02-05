// import { VNode } from 'vue';
// import { Component, Prop, Vue } from 'vue-property-decorator';

// export interface ColumnDescriptor<T> {
//   title: string;
//   render: (data: T) => VNode | null;
// }

// @Component({name:"Table"})
// export class Table extends Vue {

//   @Prop({ required: true })
//   readonly columns!: Array<ColumnDescriptor<unknown>>;

//   @Prop({ required: true })
//   readonly items!: Array<any>; // eslint-disable-line

//   render() {
//     return (
//       <table cellspacing="1" border="1">
//           <thead>
//               <tr>
//                   {this.columns.map((c) =>
//                     (<th>{c.title}</th>)
//                   )}
//               </tr>
//           </thead>
//           <tbody>
//               {this.items.map((item) => this.renderRow(item))}
//           </tbody>
//       </table>
//     );
//   }

//   private renderRow(item: unknown) {
//     return (
//       <tr>
//           {this.columns.map((c) => (
//             <td>
//               {c.render(item)}
//             </td>
//           ))}
//       </tr>
//     );
//   }
// } 

import { tr } from 'date-fns/locale';
import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface ColumnDescriptor<T> {
  title: string;
  render: (data: T) => VNode | null;
}

@Component({ name: 'Table' })
export class Table<T> extends Vue {
  @Prop({ required: true })
  readonly columns!: Array<ColumnDescriptor<T>>;

  @Prop({ required: true })
  readonly items!: Array<T>;

  @Prop({ default:null } )
  readonly onRowClick!: (item: T) => void 

  

  render() {
    return (
      <table cellspacing="1" border="1">
        <thead>
          <tr>
            {this.columns.map((c, index) => (
              <th key={index}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.items.map((item, index) => this.renderRow(item, index))}
        </tbody>
      </table>
    );
  }

  private renderRow(item: T, index: number) {
    return (
       <tr key={index}>
        {this.columns.map((column, columnIndex) => (
          <td key={columnIndex} onClick={()=>{this.onRowClick(item)}}>{column.render(item)} </td>
        ))}
      </tr>
    );
  }
}



