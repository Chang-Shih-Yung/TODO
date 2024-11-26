import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
//雙向綁定一定要記得引入FormsModule
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//引入服務
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  //官方storage初始化用法
  constructor(public storage: StorageService) {}

  //官方EventEmitter初始化用法
  @Output() messageEvent = new EventEmitter<string>();
  // 觸發事件並傳遞資料
  sendMessage() {
    this.messageEvent.emit('Hello,我是子組件');
  }

  //將發法掛載到生命週期觸發
  ngOnInit(): void {
    console.log('頁面刷新會觸發這個生命週期');
    //利用key:searchList來獲取searchList歷史紀錄
    const searchList: any[] = this.storage.get('searchList');
    if (searchList) {
      this.history = searchList;
    }
  }

  public keyword: string = '';
  public history: any[] = [];
  public doSearch(): void {
    //在 JavaScript 和 TypeScript 中，Array.prototype.indexOf 方法會返回指定元素在陣列中的第一個索引位置。如果元素不存在於陣列中，則會返回 -1。所以這裡可以避免重複存入歷史紀錄
    if (this.history.indexOf(this.keyword) == -1) {
      this.history.push(this.keyword);

      ////將歷史紀錄存入本地存儲:名字為'searchList' ，this.history是一個陣列////
      //點擊搜尋：觸發本地存儲
      this.storage.set('searchList', this.history);
    }
    if (this.keyword === '') {
      alert('請輸入搜尋關鍵字');
      return;
    }
    //將搜尋關鍵字存入歷史紀錄，假設關鍵字不存在於歷史紀錄中
    this.keyword = ''; //清空搜尋框
    console.log(this.keyword);
  }
  //刪除歷史記錄
  public deleteHistory(key: string): void {
    // alert(key);
    //this.history.indexOf(key)：找到 key 在 this.history 陣列中的索引位置。
    //刪除歷史紀錄：從 this.history 陣列中刪除從索引位置 index 開始的 1 個項目。
    this.history.splice(this.history.indexOf(key), 1);

    this.storage.set('searchList', this.history);
  }
}
