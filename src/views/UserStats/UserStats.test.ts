/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount } from '@vue/test-utils';
import UserStats from './UserStats';

const mockUsers = JSON.stringify([
  { location: 'Amsterdam' },
  { location: 'Amsterdam' },
  { location: 'Sofia' }
]);

describe('UserStats.vue', () => {
  let wrapper: any;
  
  beforeEach(() => {
    localStorage.setItem('users', mockUsers);
    wrapper = shallowMount(UserStats, {
        stubs: {
          highcharts: true, 
        },
      });
      });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('User Statistics');
  });

  it('loads user statistics from local storage', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.userStats).toEqual({ 'Amsterdam': 2, 'Sofia': 1 });
  });

  it('toggles between table and chart view', async () => {
    expect(wrapper.find('table').exists()).toBe(true); 
    expect(wrapper.find('highcharts-stub').exists()).toBe(false); 

    await wrapper.find('button').trigger('click'); 

    expect(wrapper.find('table').exists()).toBe(false); 
    expect(wrapper.find('highcharts-stub').exists()).toBe(true); 
  });

  it('navigates back to home when button is clicked', async () => {
    const mockRouterPush = jest.fn();
    wrapper.vm.$router = { push: mockRouterPush };
    
    await wrapper.findAll('button').at(1).trigger('click');
    
    expect(mockRouterPush).toHaveBeenCalledWith('/home');
  });
});
