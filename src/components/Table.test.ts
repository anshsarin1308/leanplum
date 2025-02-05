import { shallowMount } from '@vue/test-utils'
import { Table } from './Table'

describe(Table, () => {
  it('renders all rows', () => {
    const render = jest.fn();
    shallowMount(Table, {
      propsData: {
          columns: [{ title: 'foo', render }],
          items: [{}, {}]
      }
    })

    expect(render).toHaveBeenCalledTimes(2)
  })
})
