import { Routes } from '@angular/router';
import { NewsListComponent } from "./components/news-list/news-list.component";
import { NewsItemComponent } from "./components/news-item/news-item.component";

export const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'news/:category/:id', component: NewsItemComponent },
];
