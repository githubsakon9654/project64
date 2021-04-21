import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' }
];

const MENUUSER = [
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
  { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
  { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' }
]

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUUSER;
  }
}

export class MenuUser {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
