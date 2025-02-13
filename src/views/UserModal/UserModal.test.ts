/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import UserModal from './UserModal';
import { UserEntity } from '../../models/UsersEntity';

describe('UserModal.vue', () => {
  let wrapper: any;
  let mockUsers: UserEntity[];

  beforeEach(() => {
    mockUsers = [
      new UserEntity(),
      {
        id: 'usr_1',
        isDeveloper: true,
        devices: 3,
        sessions: [{}],
        location: 'NY',
        created: Date.now(),
        events: 10,
        bucket: 5,
        channels: { push: true, email: false, webhook: true, appInbox: true },
        attributes: { email: 'test@example.com' },
      },
    ];

    wrapper = shallowMount(UserModal, {
      propsData: {
        selectedUser: null,
        isCreatingUser: false,
        users: mockUsers,
      },
    });
  });

  it('renders correctly when viewing an existing user', async () => {
    wrapper.setProps({ selectedUser: mockUsers[1], isCreatingUser: false });

    await Vue.nextTick(); 

    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('User Details');
    expect(wrapper.text()).toContain('Location: NY');
  });

  it('renders correctly when creating a new user', async () => {
    wrapper.setProps({ isCreatingUser: true, selectedUser: null });

    await Vue.nextTick();

    expect(wrapper.find('h3').text()).toBe('Create New User');
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('displays email error message when duplicate email is entered', async () => {
    wrapper.setProps({ isCreatingUser: true });

    await Vue.nextTick();

    const emailInput = wrapper.find('input#email');
    await emailInput.setValue('test@example.com'); 
    await wrapper.find('form').trigger('submit.prevent');

    await Vue.nextTick();

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Email already exists!');
  });

  it('emits "create-user" event with new user data when form is submitted', async () => {
    wrapper.setProps({ isCreatingUser: true });

    await Vue.nextTick();

    await wrapper.find('input#name').setValue('usr_2');
    await wrapper.find('input#email').setValue('newuser@example.com');
    await wrapper.find('input#location').setValue('LA');
    await wrapper.find('input#devices').setValue('2');

    await wrapper.find('form').trigger('submit.prevent');
    await Vue.nextTick();

    expect(wrapper.emitted('create-user')).toBeTruthy();
    expect(wrapper.emitted('create-user')[0][0]).toMatchObject({
      id: 'usr_2',
      attributes: { email: 'newuser@example.com' },
      location: 'LA',
      devices: '2',
    });
  });

  
});
