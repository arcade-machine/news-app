import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NewsFormData} from "../../models/news.models";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public formData: NewsFormData = {
    title: '',
    text: '',
    image: null
  };
  public onSubmit(): void {
    let storedData: NewsFormData[] = [];
    const storedDataString = localStorage.getItem('newsData');

    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
      storedData.push(this.formData);
    }

    localStorage.setItem('newsData', JSON.stringify(storedData));
    this.formData = {
      title: '',
      text: '',
      image: null
    };
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.formData.image = inputElement.files[0];
    }
  }
}
