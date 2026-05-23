import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MessageModel } from '../../services/components.service';
import { ToastService } from '../../services/toast.service';
import { ComponentImports } from '../component-import.module';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [ComponentImports],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {
  toastList: MessageModel[] = [];
  enteredToasts: Record<string, boolean> = {};
  closingToasts: Record<string, boolean> = {};

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.toastService.toastList$.subscribe((list) => {
      const currentKeys = new Set(this.toastList.map(t => t.key));
      const closingKeys = new Set(Object.keys(this.closingToasts));

      list.forEach((toast) => {
        if (!currentKeys.has(toast.key) && !closingKeys.has(toast.key!)) {
          this.toastList.push(toast);
          if (toast.key) {
            this.enteredToasts[toast.key] = false;
          }
        }
      });

      this.cdr.detectChanges();

      this.toastList.forEach((toast) => {
        if (toast.key && !this.enteredToasts[toast.key]) {
          setTimeout(() => {
            this.enteredToasts[toast.key!] = true;
            this.cdr.detectChanges();
          }, 16);
        }
      });
    });

    // FIX: auto-remove requests from the service go through
    // removeToast() so the leave animation always plays
    this.toastService.remove$.subscribe((key) => {
      this.removeToast(key);
    });
  }

  removeToast(key: string) {
    // Guard: already closing, don't double-trigger
    if (this.closingToasts[key]) return;

    this.closingToasts[key] = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.toastList = this.toastList.filter(t => t.key !== key);
      delete this.closingToasts[key];
      delete this.enteredToasts[key];
      this.toastService.clear(key);
      this.cdr.detectChanges();
    }, 300);
  }

  trackByKey(_: number, toast: MessageModel): string {
    return toast.key ?? '';
  }

  isClosing(key: string): boolean {
    return !!this.closingToasts[key];
  }

  hasEntered(key: string): boolean {
    return !!this.enteredToasts[key];
  }
}