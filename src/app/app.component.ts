import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'TodoList';
  form = new FormGroup({
    taskName: new FormControl('', Validators.required),
    taskStatus: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataService) {}

  get containerStyle(): object {
    return {
      'flex-direction':
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? 'row'
          : 'column',
      'align-items':
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? 'center'
          : '',
      width:
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? '100%'
          : '70%',
      height:
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? '180px'
          : '',
      padding:
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? '0px 30px 0px 30px'
          : '',
      'box-shadow':
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? '0px 4px 50px 0px #0000001A'
          : '',
    };
  }

  get customStyle(): object {
    return {
      width:
        this.currentTaskArray.length > 0 || this.completeTaskArray.length > 0
          ? '70%'
          : '100%',
    };
  }
  public currentTaskArray: any[] = [];
  public completeTaskArray: any[] = [];
  public taskArray: any[] = [];

  //get
  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        console.log('getrequest successful:', response);
        this.currentTaskArray = response.filter((task: any) =>
          task.taskStatus.includes('მიმდინარე')
        );
        this.completeTaskArray = response.filter((task: any) =>
          task.taskStatus.includes('დასრულებული')
        );
        this.taskArray = response;
      },
      error: (error) => {
        console.error('get request failed:', error);
      },
    });
  }

  //post
  sendData(): void {
    const data = this.form.value;
    if (this.form.valid) {
      this.dataService.postData(data).subscribe({
        next: (response) => {
          console.log('POST request successful:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('POST request failed:', error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  get name() {
    return this.form.get('taskName');
  }
  get status() {
    return this.form.get('taskStatus');
  }
  get customInputClass(): object {
    return {
      border:
        this.name?.status === 'INVALID' && this.name.touched
          ? '1px solid red'
          : '',
    };
  }
  get customSelectClass(): object {
    return {
      border:
        this.status?.status === 'INVALID' && this.status.touched
          ? '1px solid red'
          : '',
    };
  }
  //delete
  deleteTask(Id: number): void {
    this.dataService.deleteData(Id).subscribe({
      next: (response) => {
        console.log('deleterequest successful:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('delete request failed:', error);
      },
    });
  }

  //edit
  public filteredArray: any[] = [];
  public edited = false;
  buttonColor: { [taskId: string]: string } = {};

  editTask(id: number): void {
    this.filteredArray = this.taskArray.filter((task) => task.id === id);
    this.edited = !this.edited;
    this.edited
      ? (this.buttonColor[id] = '#FFDF8C')
      : (this.buttonColor[id] = '#383E59');
  }

  changeColor(taskId: number): any {
    return this.buttonColor[taskId] || '#383E59';
  }

  public inputNameValue: string = '';

  updateTask(Id: number): void {
    const taskData = {
      ...this.form.value,
      id: Id,
    };
    console.log(taskData);
    if (this.form.valid) {
      this.dataService.updateData(Id, taskData).subscribe({
        next: (response) => {
          console.log('put request successful:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('put request failed:', error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  statusValue = 'აირჩიეთ დავალების სტატუსი';
  get taskStatusValue() {
    return this.form.get('taskStatus')?.value;
  }
  get taskStatusName() {
    return this.form.get('taskStatus')?.value;
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.statusValue = option;
    this.form.patchValue({ taskStatus: option });
    !this.isDropdownOpen;
  }
}
