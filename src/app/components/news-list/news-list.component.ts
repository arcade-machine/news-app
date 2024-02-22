import {Component, Input, OnInit} from '@angular/core';
import { NewsItemComponent } from "../news-item/news-item.component";
import { News } from "../../models/news.models";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    NewsItemComponent,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  @Input() newsList: News[] | null = [];
}
