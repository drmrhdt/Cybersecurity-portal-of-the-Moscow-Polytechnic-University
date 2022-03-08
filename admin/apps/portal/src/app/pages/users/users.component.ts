import { Component, OnInit } from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  blocked: { from: Date | null | string; to: Date | null | string } | null;
  roles: string[];
}

@Component({
  selector: 'portal-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      blocked: {
        from: 'Tue Mar 08 2022 17:30:38 GMT+0300 (Moscow Standard Time)',
        to: 'Tue Mar 08 2022 17:30:38 GMT+0300 (Moscow Standard Time)',
      },
      roles: ['User'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      blocked: null,
      roles: ['User, Moderator'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      blocked: null,
      roles: ['User, Admin'],
    },
  ];
  isChangeRoleModalVisible = false;
  isBlockModalVisible = false;
  selectedUser: any;

  checkRoles = [
    { label: 'Пользователь', value: 'User', checked: false },
    { label: 'Модератор', value: 'Moderator', checked: false },
    { label: 'Администратор', value: 'Admin', checked: false },
  ];

  date = null;

  constructor() {}

  ngOnInit(): void {}

  log(value: object[]): void {
    console.log(value);
  }

  showChangeRoleModal(data: any): void {
    this.isChangeRoleModalVisible = true;
    this.selectedUser = data;

    this.selectedUser.roles.forEach((role: any) => {
      this.checkRoles.forEach((checkboxRole: any, i: number) => {
        if (checkboxRole.value === role) {
          checkboxRole[i].checked = true;
        }
      });
    });
  }

  showBlockModal(data: any): void {
    this.isBlockModalVisible = true;
    this.selectedUser = data;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isChangeRoleModalVisible = false;
    this.isBlockModalVisible = false;
    this.selectedUser = null;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isChangeRoleModalVisible = false;
    this.isBlockModalVisible = false;
    this.selectedUser = null;
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    // console.log('week: ', result.map(getISOWeek));
  }
}
