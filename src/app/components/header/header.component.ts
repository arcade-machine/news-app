import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() modalIsOpen: EventEmitter<void> = new EventEmitter<void>();
  public addNews(): void {
    this.modalIsOpen.emit();
  }
}
