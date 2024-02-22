import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsListComponent } from "./components/news-list/news-list.component";
import { NewsHttpService } from "./services/news-http.service";
import { HttpClientModule } from "@angular/common/http";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {News, NewsModel} from "./models/news.models";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NewsListComponent, NgOptimizedImage, AsyncPipe],
  providers: [NewsHttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public $news: Observable<News[]> | undefined ;
  constructor(private newsHttpService: NewsHttpService) {
  }
  ngOnInit(): void {
    this.$news = this.newsHttpService.getNews().pipe(map((response) => response.news));
  }
}
