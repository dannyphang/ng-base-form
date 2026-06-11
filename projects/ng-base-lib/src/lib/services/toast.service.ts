import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { MessageModel } from './components.service';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastListSubject = new BehaviorSubject<MessageModel[]>([]);
    toastList$ = this.toastListSubject.asObservable();

    // FIX: separate stream just for removal requests
    private removeSubject = new Subject<string>();
    remove$ = this.removeSubject.asObservable();

    private toasts: MessageModel[] = [];

    constructor(
        private messageService: MessageService,
        private translateService: TranslateService,
    ) { }

    addSingle(toastConfig: MessageModel) {
        if (!toastConfig.key) {
            toastConfig.key = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        }

        switch (toastConfig.severity) {
            case 'success':
            case undefined:
                toastConfig.severity = 'success';
                toastConfig.icon = 'pi pi-check';
                break;
            case 'error':
                toastConfig.icon = 'pi pi-times-circle';
                break;
            case 'info':
                toastConfig.icon = 'pi pi-info-circle';
                break;
            case 'warn':
                toastConfig.icon = 'pi pi-exclamation-triangle';
                break;
        }

        const messageData = toastConfig.messageData || [];

        this.toasts.push({
            severity: toastConfig.severity ?? 'success',
            message:
                typeof toastConfig.message === 'string'
                    ? this.translateService.instant(
                        toastConfig.message,
                        this.loadMessageData(messageData).reduce((acc, cur) => {
                            acc[cur.label] = this.translateService.instant(cur.value);
                            return acc;
                        }, {} as Record<string, string>)
                    ) || toastConfig.message
                    : '',
            key: toastConfig.key,
            sticky: toastConfig.sticky || toastConfig.isLoading,
            icon: toastConfig.isLoading ? 'pi pi-spin pi-spinner' : toastConfig.icon,
            isLoading: toastConfig.isLoading,
        });
        this.toastListSubject.next([...this.toasts]);

        // FIX: emit on remove$ instead of calling clear() directly
        // so the component can play the leave animation first
        if (!toastConfig.sticky && !toastConfig.isLoading) {
            setTimeout(() => this.removeSubject.next(toastConfig.key!), 3000);
        }
    }

    private loadMessageData(data: any[]) {
        return data.map((i) => ({
            label: this.translateService.instant(i.key),
            value: i.value,
        }));
    }

    addMultiple(toastConfig: MessageModel[]) {
        this.messageService.addAll(
            toastConfig.map((i) => {
                switch (i.severity) {
                    case 'success':
                    case undefined:
                        i.severity = 'success';
                        i.icon = 'pi pi-check';
                        break;
                    case 'error':
                        i.icon = 'pi pi-times-circle';
                        break;
                    case 'info':
                        i.icon = 'pi pi-info-circle';
                        break;
                }
                return {
                    severity: i.severity,
                    detail: this.translateService.instant(i.message),
                    key: 'tr',
                    sticky: i.isLoading,
                    icon: i.isLoading ? 'pi pi-spin pi-spinner' : undefined,
                    isLoading: i.isLoading,
                };
            }),
        );
    }

    clear(key?: string) {
        if (key) {
            this.toasts = this.toasts.filter(t => t.key !== key);
            this.removeSubject.next(key);  // FIX: route through remove$ so animation plays
        } else {
            // Clear all — emit remove$ for every tracked toast
            const keys = this.toasts.map(t => t.key!);
            this.toasts = [];
            keys.forEach(k => this.removeSubject.next(k));
        }
        this.toastListSubject.next([...this.toasts]);
    }
}