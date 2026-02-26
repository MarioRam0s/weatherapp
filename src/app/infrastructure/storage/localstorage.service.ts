import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStoragService {
  setItem<T>(key: string, value: T): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
