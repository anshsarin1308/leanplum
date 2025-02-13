/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount } from '@vue/test-utils';
import DeviceStats from './DeviceStats';

jest.mock('highcharts', () => ({
  chart: jest.fn()
}));

describe('DeviceStats.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(DeviceStats, {
      stubs: {
        highcharts: true, 
      },
    });
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays table view by default', () => {
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('highcharts-stub').exists()).toBe(false);
  });

  it('toggles between table and chart view', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('table').exists()).toBe(false);
    expect(wrapper.find('highcharts-stub').exists()).toBe(true);

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('highcharts-stub').exists()).toBe(false);
  });

  it('navigates back to home when button is clicked', async () => {
    const pushMock = jest.fn();
    wrapper.vm.$router = { push: pushMock };
    await wrapper.findAll('button').at(1).trigger('click');
    expect(pushMock).toHaveBeenCalledWith('/home');
  });
});
