import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStoragService {
  setItem<T>(key: string, value: T, hours: number): void {
    const now = new Date().getTime();

    const item = {
      value: value,
      expired: now + hours * 60 * 60 * 1000,
    };
    const data = JSON.stringify(item);
    localStorage.setItem(key, data);
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (!data) return null;

    const item = JSON.parse(data);
    const now = new Date().getTime();

    if (now > item.expired) {
      localStorage.removeItem(key);
      return null;
    }

    return data ? (JSON.parse(data).value as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
