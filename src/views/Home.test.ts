/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, Wrapper } from '@vue/test-utils';
import Home from './Home';
import { Table } from '../components/Table';
import { UserEntity } from '../models/UsersEntity';

jest.mock('./UserModal.vue', () => ({
  name: 'UserModal',
  render: () => null
}));

describe('Home Component', () => {
  let wrapper: Wrapper<Home>;
  const mockUsers = [
    {
      id: 'usr_1',
      location: 'Sofia',
      devices: 2,
      isDeveloper: true,
      sessions: [{}, {}],
      created: Date.now(),
      events: 3,
      bucket: 1,
      channels: {
        push: false,
        email: true,
        webhook: true,
        appInbox: true
      },
      attributes: {
        email: 'usr_1@example.com'
      }
    },
    {
      id: 'usr_2',
      location: 'San Francisco',
      devices: 1,
      isDeveloper: false,
      sessions: [{}],
      created: Date.now(),
      events: 6,
      bucket: 2,
      channels: {
        push: true,
        email: false,
        webhook: true,
        appInbox: true
      },
      attributes: {
        email: 'usr_2@example.com'
      }
    }
  ];

  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    
    wrapper = shallowMount(Home, {
      stubs: {
        UserModal: true // Stub the UserModal component
      }
    });
    (wrapper.vm as any).users = mockUsers;
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  describe('Initial Rendering', () => {
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.home-container').exists()).toBe(true);
    });

    it('renders the Table component with correct props', () => {
      const table = wrapper.findComponent(Table);
      expect(table.exists()).toBe(true);
      expect(table.props('items')).toEqual(mockUsers);
      expect(table.props('columns')).toHaveLength(4);
    });

    it('renders create user button', () => {
      const button = wrapper.find('.create-user-btn');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('+ Create User');
    });
  });

  describe('User Management', () => {
    it('loads users from localStorage on creation', () => {
      const storedUsers = JSON.stringify(mockUsers);
      Storage.prototype.getItem = jest.fn().mockReturnValue(storedUsers);
      
      const wrapper = shallowMount(Home, {
        stubs: {
          UserModal: true
        }
      });
      expect(localStorage.getItem).toHaveBeenCalledWith('users');
      expect((wrapper.vm as any).users).toEqual(mockUsers);
    });

    it('deletes a user correctly', () => {
      const userIdToDelete = 'usr_1';
      (wrapper.vm as any).deleteUser(userIdToDelete);
      
      expect((wrapper.vm as any).users).toHaveLength(1);
      expect((wrapper.vm as any).users.find((u: UserEntity) => u.id === userIdToDelete)).toBeUndefined();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('creates a new user correctly', () => {
      const newUser: UserEntity = {
        id: 'usr_3',
        location: 'Amsterdam',
        devices: 3,
        isDeveloper: true,
        sessions: [],
        created: Date.now(),
        events: 0,
        bucket: 3,
        channels: {
          push: true,
          email: true,
          webhook: false,
          appInbox: true
        },
        attributes: {
          email: 'usr_3@example.com'
        }
      };

      (wrapper.vm as any).handleCreateUser(newUser);
      expect((wrapper.vm as any).users).toHaveLength(3);
      expect((wrapper.vm as any).users).toContainEqual(newUser);
    });
  });

  describe('Sorting Functionality', () => {
    it('sorts users by ID correctly', () => {
      (wrapper.vm as any).sortColumn('id');
      expect((wrapper.vm as any).sortKey).toBe('id');
      expect((wrapper.vm as any).sortOrder).toBe('asc');
      
      (wrapper.vm as any).sortColumn('id');
      expect((wrapper.vm as any).sortOrder).toBe('desc');
    });

    it('sorts users by location correctly', () => {
      (wrapper.vm as any).sortColumn('location');
      const sortedUsers = (wrapper.vm as any).sortedUsers;
      expect(sortedUsers[0].location).toBe('Amsterdam');
      expect(sortedUsers[1].location).toBe('San Francisco');
    });

    it('sorts users by devices correctly', () => {
      (wrapper.vm as any).sortColumn('devices');
      const  sortedUsers = (wrapper.vm as any).sortedUsers;
      expect(sortedUsers[0].devices).toBeLessThanOrEqual(sortedUsers[1].devices);
    });
  });

  describe('Modal Interactions', () => {
    it('opens user modal on row click', () => {
      (wrapper.vm as any).onRowClick(mockUsers[0]);
      expect((wrapper.vm as any).selectedUser).toEqual(mockUsers[0]);
      expect((wrapper.vm as any).isCreatingUser).toBe(false);
    });

    it('opens create user modal', () => {
      (wrapper.vm as any).openCreateUserModal();
      expect((wrapper.vm as any).isCreatingUser).toBe(true);
      expect((wrapper.vm as any).selectedUser).toBeNull();
    });

    it('closes modal correctly', () => {
      (wrapper.vm as any).selectedUser = mockUsers[0];
      (wrapper.vm as any).isCreatingUser = true;
      
      (wrapper.vm as any).closeModal();
      expect((wrapper.vm as any).selectedUser).toBeNull();
      expect((wrapper.vm as any).isCreatingUser).toBe(false);
    });
  });

  describe('Column Rendering', () => {
    it('renders user ID correctly', () => {
      const renderedNode = (wrapper.vm as any).$options.methods.renderFunc.call(wrapper.vm as any, mockUsers[0]);
      expect(renderedNode.tag).toBe('span');
      expect(renderedNode.children[0].text).toBe(mockUsers[0].id);
    });

    it('renders location correctly', () => {
      const renderedNode = (wrapper.vm as any).$options.methods.renderLocation.call(wrapper.vm as any,mockUsers[0]);
      expect(renderedNode.tag).toBe('span');
      expect(renderedNode.children[0].text).toBe(mockUsers[0].location);
    });

    it('renders devices correctly', () => {
      const renderedNode = (wrapper.vm as any).$options.methods.renderDevices.call(wrapper.vm as any,mockUsers[0]);
      expect(renderedNode.tag).toBe('span');

      expect(renderedNode.children[0].text).toBe(String(mockUsers[0].devices));
    });

    it('renders actions with delete button', () => {
      const renderedNode = (wrapper.vm as any).renderActions(mockUsers[0]);
      expect(renderedNode.tag).toBe('button');
      expect(renderedNode.data.class).toBe('delete-btn');
    });
  });
});