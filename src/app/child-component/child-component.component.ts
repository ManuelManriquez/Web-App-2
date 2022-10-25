import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  @Input()  infoChildComponent!: any;

  @Output('eventClose') closeFunc = new EventEmitter<any>(); 
  @Output('eventSearch') searchFunc = new EventEmitter<any>(); 


  // @Input() firstTableComponent = {name: "", status:"", imgUrl:""}
  // @Input() firstSecondComponent = {title: "", text:"", imgUrl:""}
  
  executeEventClose(component:any){
    this.closeFunc.emit(component);
  }

  executeEventSearch(searchQuery:any, component:any){
    component.BaseTable = component.table;
    component.table = []

    for (const x of component.BaseTable) {      
      let name = x.name.toLowerCase();
      let status = x.status.toLowerCase();
      let query = searchQuery.toLowerCase();
      let killedBy;
      if (typeof(x.killedBy) !== 'undefined') {
        killedBy = x.killedBy.toLowerCase();
      }else{
        killedBy = "";
      }
      if (name.includes(query) || status.includes(query) || killedBy.includes(query)) {
       component.table.push(x) 
      }
    }

    this.searchFunc.emit({searchQuery, component});
  }

  constructor() { }

  ngOnInit(): void {
    if (typeof(this.infoChildComponent.BaseTable) != 'undefined') {
      this.infoChildComponent.table = this.infoChildComponent.BaseTable
    }
  }

}
