import { Component, OnInit, EventEmitter, DoCheck } from '@angular/core';
import { first } from 'rxjs';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {
  taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]' );
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.setLocalStorage
  }

  setEmitTaskList(event:  string) {
    this.taskList.push({task: event, checked: false});
  }

  deleteItemTaskList(event: number){
    this.taskList.splice(event, 1)
  }

  deleteAllTaskList(){
    const confirm = window.confirm("voce deseja deletar realmente?")
    if(confirm){
      this.taskList = [];
    }
  }

  validationInput(event: string, index: number) {
    if(!event.length){
      const confirm = window.confirm("task está vazia, deseja deletar?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  setLocalStorage() {
    if(this.taskList){
      this.taskList.sort( (first,last) => Number(first.checked) - Number(last.checked) )
      localStorage.setItem("list", JSON.stringify(this.taskList));
      }
  }
}
