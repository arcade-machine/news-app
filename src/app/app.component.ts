import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NewsListComponent } from "./components/news-list/news-list.component";
import { NewsHttpService } from "./services/news-http.service";
import { HttpClientModule } from "@angular/common/http";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {News, NewsModel} from "./models/news.models";
import {map, Observable} from "rxjs";
import {ModalComponent} from "./components/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NewsListComponent, NgOptimizedImage, AsyncPipe, RouterLink, ModalComponent, NgIf],
  providers: [NewsHttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isModalOpen = true;
  constructor() {
  }

  public addNews(): void {
    console.log('kappa');
  }
}
