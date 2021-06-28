import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  alarms = []
  constructor() { }

  ngOnInit(): void {
  }
  deleteAlarm(id){
this.alarms.splice(id, 1)
  }
  addAlarm(){
    this.alarms.push({id: this.alarms.length + 1})
  }

}
