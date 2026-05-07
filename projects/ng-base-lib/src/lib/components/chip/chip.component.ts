import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentImports } from '../component-import.module';
import { AttachmentDto } from '../../services/components.service';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  imports: [ComponentImports]
})
export class ChipComponent {
  @Input() label: string = '';
  @Input() removable: boolean = true;
  @Input() file: File;
  @Input() attachment: AttachmentDto;
  @Input() isFile: boolean = false;
  @Input() downloadable: boolean = true;
  @Output() remove = new EventEmitter();

  isShowDIalog: boolean = false;
  safeGoogleDocsUrl: any;

  constructor(
    public sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachment'] && changes['attachment'].currentValue) {

    }
  }

  onRemove() {
    if (this.isFile) {
      this.remove.emit(this.file);
    }
    else {
      this.remove.emit(this.attachment);
    }
  }

  previewFileClick() {
    if (this.downloadable && this.attachment?.url) {
      const link = document.createElement('a');
      if (this.attachment) {
        link.href = this.attachment.url;
        link.download = this.attachment.fileName || 'download'; // optional: custom filename
        link.target = '_blank'; // optional: opens in new tab
        link.click();
      }
    } else {
      // TODO

      // this.toastService.addSingle({
      //   message: 'MESSAGE.FILE_NOT_READABLE_OR_PREVIEW',
      //   severity: 'error',
      //   key: 'filePreviewError'
      // })
    }
  }
}
