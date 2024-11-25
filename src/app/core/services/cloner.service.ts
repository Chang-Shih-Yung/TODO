import { Injectable } from '@angular/core';
import clone from 'clone';

@Injectable({
  providedIn: 'root',
})
export class ClonerService {
  constructor() {}
  deepClone<T>(value: T): T {
    return clone<T>(value);
  }
}
