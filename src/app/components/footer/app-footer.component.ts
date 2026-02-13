import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
