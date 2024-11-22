import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//雙向綁定一定要記得引入FormsModule
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public keyword: string = '';
  public history: any[] = [];
  public doSearch(): void {
    //在 JavaScript 和 TypeScript 中，Array.prototype.indexOf 方法會返回指定元素在陣列中的第一個索引位置。如果元素不存在於陣列中，則會返回 -1。所以這裡可以避免重複存入歷史紀錄
    if (this.history.indexOf(this.keyword) == -1) {
      this.history.push(this.keyword);
    } else if (this.keyword === '') return;
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
  }
}