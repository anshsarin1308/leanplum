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
      <tr key={index} onClick={() => this.$emit('row-click', item)}>
        {this.columns.map((column, columnIndex) => (
          <td key={columnIndex}>{column.render(item)}</td>
        ))}
      </tr>
    );
  }
}
