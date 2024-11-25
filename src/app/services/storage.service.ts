import { Injectable } from '@angular/core';
// import { ClonerService } from 'src/app/core/services/cloner.service';

@Injectable({
  providedIn: 'root',
})

/*將公共功能封裝在這*/
export class StorageService {
  constructor() {}
  //對應search.component.ts的
  //key跟value型別要定義好，由其value要對應search.component.ts的this.history
  set(key: string, value: any[]): void {
    //將 value 轉換為 JSON 字串，然後存入 localStorage
    //控制台可以看到存入的值
    localStorage.setItem(key, JSON.stringify(value));
  }
  //當網頁刷新，我們想要從 localStorage 中獲取值時（目的要在頁面上顯示上次保留在localStorage的值），我們可以使用 get 方法
  get(key: string): any {
    const item = localStorage.getItem(key);
    //將其value從 JSON 字串解析為 JavaScript 物件並返回
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
