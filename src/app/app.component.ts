import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [StorageService],
})
export class AppComponent {
  title = 'todo';
}
