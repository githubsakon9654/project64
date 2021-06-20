import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

export interface FoodNode {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: FoodNode[];
}

const TREE_ADMIN: FoodNode[] = [
  {
    state: '', name: 'จัดการข้อมูลพื้นฐาน', type: '', icon: 'account_box',
    children: [
      { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
      { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
      { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
      { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
      { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
    ]
  },
  {
    state: '', name: 'จัดการพัสดุ', type: '', icon: 'account_box',
    children: [
      { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
      { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
    ]
  },
  {
    state: '', name: 'ดูแลครุภัณฑ์', type: '', icon: 'account_box',
    children: [
      { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
      { state: 'owndurable', name: 'ครุภัณฑ์ที่เป็นเจ้าของ', type: 'link', icon: 'view_list' },
      { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
    ]
  },
  {
    state: '', name: 'สั่งซื้อ', type: '', icon: 'account_box',
    children: [
      { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' },
    ]
  }
];

const TREE_USER: FoodNode[] = [
  {
    state: '', name: 'จัดการข้อมูลพื้นฐาน', type: 'link', icon: 'account_box',
    children: [
      { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
      { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
      { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
      { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
    ]
  },
  {
    state: '', name: 'จัดการพัสดุ', type: 'link', icon: 'account_box',
    children: [
      { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
      { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
    ]
  },
  {
    state: '', name: 'ดูแลครุภัณฑ์', type: 'link', icon: 'account_box',
    children: [
      { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
      { state: 'owndurable', name: 'ครุภัณฑ์ที่เป็นเจ้าของ', type: 'link', icon: 'view_list' },
      { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
    ]
  }
];
const TREE_DIRE: FoodNode[] = [
  {
    state: '', name: 'จัดการข้อมูลพื้นฐาน', type: 'link', icon: 'account_box',
    children: [
      { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
      { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
      { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
      { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
      { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
    ]
  },
  {
    state: '', name: 'จัดการพัสดุ', type: 'link', icon: 'account_box',
    children: [
      { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
    ]
  },
  {
    state: '', name: 'ดูแลครุภัณฑ์', type: 'link', icon: 'account_box',
    children: [
      { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
    ]
  },
  {
    state: '', name: 'สั่งซื้อ', type: 'link', icon: 'account_box',
    children: [
      { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' },
    ]
  }
];

const MENUUSER = [
  { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'owndurable', name: 'ครุภัณฑ์ที่เป็นเจ้าของ', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
  { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
];

const MENUADMIN = [
  { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'owndurable', name: 'ครุภัณฑ์ที่เป็นเจ้าของ', type: 'link', icon: 'view_list' },
  { state: 'return', type: 'link', name: 'คืนครุภัณฑ์', icon: 'view_list' },
  { state: 'from', type: 'link', name: 'แบบสำรวจ', icon: 'view_list' },
  { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
  { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' },
  { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
]

const MENUDIRECTOR = [
  { state: 'profile', name: 'ข้อมูลผู้ใช้', type: 'link', icon: 'account_box' },
  { state: 'supplie', name: 'รายการพัสดุ', type: 'link', icon: 'view_list' },
  { state: 'durable', name: 'รายการครุภัณฑ์', type: 'link', icon: 'view_list' },
  { state: 'reveal', type: 'link', name: 'เบิกพัสดุ', icon: 'wysiwyg' },
  { state: 'bor-durable', type: 'link', name: 'ยืมครุภัณฑ์', icon: 'wysiwyg' },
  { state: 'userlist', type: 'link', name: 'สมาชิก', icon: 'view_headline' },
  { state: 'buy', type: 'link', name: 'แบบสั่งซื้อ', icon: 'view_list' },
  { state: 'report', type: 'link', name: 'ออกรายงาน', icon: 'view_list' },
]

@Injectable()
export class MenuItems {
  getTreeUser(): FoodNode[] {
    return TREE_USER;
  }
  getMenuDirector(): FoodNode[] {
    return TREE_DIRE;
  }
  getTree(): FoodNode[] {
    return TREE_ADMIN;
  }
}
