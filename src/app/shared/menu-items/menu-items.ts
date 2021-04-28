import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUUSER = [
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'owndurable', name: 'ครุภัณฑ์ที่เป็นเจ้าของ', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' }
];

const MENUADMIN = [
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
  { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
  { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' }
]

const MENUDIRECTOR = [
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
  { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' }
]

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUADMIN;
  }
  getMenuUser(): Menu[] {
    return MENUUSER;
  }
  getMenuDirector(): Menu[] {
    return MENUDIRECTOR;
  }
}
