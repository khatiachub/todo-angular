import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoList';
  public open=false
  addTask(){
    this.open=true;
    console.log('fjfjfjfj');
    
  }
}
