import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//雙向綁定一定要記得引入FormsModule
import { FormsModule } from '@angular/forms';
//引入服務
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  constructor(public storage: StorageService) {}

  ngOnInit(): void {
    console.log('頁面刷新會觸發這個生命週期');
    //利用key:searchList來獲取searchList歷史紀錄
    const todoStorage: any[] = this.storage.get('todoStorage');
    if (todoStorage) {
      this.todoList = todoStorage;
    }
  }

  public keyword: string = '';
  public todoList: any[] = [];

  doAdd(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      //假設 this.keyword 不是空字串，並且 this.todoList 陣列中不包含 this.keyword，則將 this.keyword 加入 this.todoList 陣列中，並在html中顯示
      if (!this.todoListHasKeyword(this.todoList, this.keyword)) {
        this.todoList.push({
          title: this.keyword,
          status: 0, // 0: 預設代辦, 1: 已完成
        });
        //將待辦事項存入本地存儲:名字為'todoList' ，this.todoList是一個陣列
        this.storage.set('todoStorage', this.todoList);

        this.keyword = '';
      } else {
        alert('已存在相同事項');
      }
      this.keyword = ''; //清空搜尋框
    }
  }
  public delete(key: string): void {
    // alert(key);
    //this.history.indexOf(key)：找到 key 在 this.history 陣列中的索引位置。
    //刪除歷史紀錄：從 this.history 陣列中刪除從索引位置 index 開始的 1 個項目。
    this.todoList.splice(this.todoList.indexOf(key), 1);
    //刪除動作也要保存到本地
    this.storage.set('todoStorage', this.todoList);
  }

  /*this.todoList 陣列中是否已經包含 this.keyword，但這樣的檢查方式只適用於 this.keyword 是一個簡單的字串，而不是一個物件*/
  /*你可以使用 Array.prototype.some 方法來解決這個問題，因為 some 方法會在找到匹配項目時立即返回 true，並停止迭代*/
  public todoListHasKeyword(
    todoList: { title: string }[],
    keyword: string
  ): boolean {
    //todoList.some(...)：some 方法會對陣列中的每個元素執行一次提供的函數，如果找到這樣的元素，some 方法將立即返回 true，否則返回 false。
    //這裡檢查 todoList 陣列中是否有任何一個元素的 title 屬性等於 keyword。
    return todoList.some((value: { title: string }) => value.title === keyword);
  }
  //切換待辦事項的狀態也要觸發本地儲存
  public checkboxChange() {
    this.storage.set('todoStorage', this.todoList);
  }
}
