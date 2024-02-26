import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {News} from "../../models/news.models";
import {NgIf} from "@angular/common";
import {Store} from "@ngxs/store";
import {UpdateLocalNews} from "../../state/news.actions";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  public newsForm!: FormGroup;
  public imageBase64 = '';
  public formSubmitted = false;

  @Output() modalIsClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store
  ) {}

  private resetForm(): void {
    this.newsForm.reset();
    this.imageBase64 = '';
  }

  public ngOnInit(): void {
    this.newsForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      titleImageUrl: new FormControl(null, Validators.required)
    })
  }

  public onSubmit(): void {
    if (!this.newsForm.valid) {
      return
    }

    let storedData: News[] = [];
    const storedDataString = localStorage.getItem('newsData');

    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
    }

    storedData.push(this.getUploadedNewsData());

    localStorage.setItem('newsData', JSON.stringify(storedData));
    this.formSubmitted = true;
  }

  public onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imageBase64 = reader.result as string;
        this.cd.markForCheck();
      }

      reader.readAsDataURL(inputElement.files[0]);
    }
  }

  public closeModal(): void {
    this.resetForm();
    this.modalIsClosed.emit();
  }

  public removeImage(): void {
    this.imageBase64 = '';
    this.newsForm.controls['image'].reset();
  }

  public onSuccessHandle(): void {
    this.store.dispatch(new UpdateLocalNews(this.getUploadedNewsData()));
    this.closeModal();
  }

  private getUploadedNewsData(): News {
    return {
      ...this.newsForm.getRawValue(),
      titleImageUrl: this.imageBase64,
      publishedDate: new Date(),
      customUpload: true,
    }
  }
}
