/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface ColumnDescriptor<T> {
  title: string;
  render: (data: T) => VNode | null;
  sortable?: boolean; 
  key?: keyof T; 
}

@Component({ name: 'Table' })
export class Table<T> extends Vue {
  @Prop({ required: true })
  readonly columns!: Array<ColumnDescriptor<T>>;

  @Prop({ required: true })
  readonly items!: Array<T>;

  @Prop({ required: false })
  readonly sortKey!: keyof T | null;

  @Prop({ required: false })
  readonly sortOrder!: 'asc' | 'desc';

  private handleSort(key: keyof T) {
    if (this.columns.some(col => col.sortable && col.key === key)) {
      this.$emit('sort', key);
    }
  }

  render() {
    return (
      <table cellspacing="1" border="1">
        <thead>
          <tr>
            {this.columns.map((column, index) => (
              <th key={index} onClick={() => this.handleSort(column.key!)}>
                {column.title}
                {column.sortable && this.sortKey === column.key ? (
                  this.sortOrder === 'asc' ? ' 🔼' : ' 🔽'
                ) : null}
              </th>
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
      <tr key={index} onClick={() => this.$emit('row-click', item)}>
        {this.columns.map((column, columnIndex) => (
          <td key={columnIndex}>{column.render(item)}</td>
        ))}
      </tr>
    );
  }
}

