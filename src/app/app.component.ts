import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsListComponent } from "./components/news-list/news-list.component";
import { NewsHttpService } from "./services/news-http.service";
import { HttpClientModule } from "@angular/common/http";
import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { ModalComponent } from "./components/modal/modal.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NewsListComponent,
    NgOptimizedImage,
    AsyncPipe,
    RouterLink,
    ModalComponent,
    NgIf,
    HeaderComponent
  ],
  providers: [NewsHttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public isModalOpen = false;
  constructor() {
  }

  onModalOpenEvent(): void {
    this.isModalOpen = true;
  }

  public onModalClosedEvent(): void {
    this.isModalOpen = false;
  }
}
