import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Header e Footer
import { HeaderComponent } from './components/header/app-header.component';
import { FooterComponent } from './components/footer/app-footer.component';

// Seções
import { HeroComponent } from './components/sections/hero/app-hero.component';
import { AboutComponent } from './components/sections/about/app-about.component';
import { ProjectsComponent } from './components/sections/projects/app-projects.component';
import { ContactComponent } from './components/sections/contact/app-contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
