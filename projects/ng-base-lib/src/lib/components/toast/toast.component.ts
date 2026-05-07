import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageModel } from '../../services/components.service';
import { ToastService } from '../../services/toast.service';
import { ComponentImports } from '../component-import.module';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [ComponentImports]
})
export class ToastComponent implements OnInit, AfterViewInit {
  toastList: MessageModel[] = [];
  enteredToasts = new Set<string>();
  closingToasts = new Set<string>();

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toastList$.subscribe((list) => {
      this.toastList = list;

      // Mark new toasts as entered to trigger entrance animation
      list.forEach((toast) => {
        if (!this.enteredToasts.has(toast.key)) {
          setTimeout(() => this.enteredToasts.add(toast.key), 10);
        }
      });
    });
  }

  ngAfterViewInit() {
    // Optional: ensure initial animations apply smoothly
    setTimeout(() => {
      this.toastList.forEach((t) => this.enteredToasts.add(t.key));
    });
  }

  removeToast(key: string) {
    this.closingToasts.add(key);

    setTimeout(() => {
      this.toastService.clear(key);
      this.closingToasts.delete(key);
      this.enteredToasts.delete(key);
    }, 300); // Match animation duration
  }

  isClosing(key: string): boolean {
    return this.closingToasts.has(key);
  }

  hasEntered(key: string): boolean {
    return this.enteredToasts.has(key);
  }
}
