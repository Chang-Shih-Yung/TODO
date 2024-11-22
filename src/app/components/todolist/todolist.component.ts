import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//雙向綁定一定要記得引入FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  public keyword: string = '';
  public todoList: any[] = [];

  doAdd(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.todoList.indexOf(this.keyword) == -1) {
        this.todoList.push({
          title: this.keyword,
          status: 0, // 0: 預設代辦, 1: 已完成
        });
      } else return;

      this.keyword = ''; //清空搜尋框
    }
  }
  public delete(key: string): void {
    // alert(key);
    //this.history.indexOf(key)：找到 key 在 this.history 陣列中的索引位置。
    //刪除歷史紀錄：從 this.history 陣列中刪除從索引位置 index 開始的 1 個項目。
    this.todoList.splice(this.todoList.indexOf(key), 1);
  }
}
