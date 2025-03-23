import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly STORAGE_KEY = 'travelerData';

  save(data: any): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  load(): any | null {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  clear(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
