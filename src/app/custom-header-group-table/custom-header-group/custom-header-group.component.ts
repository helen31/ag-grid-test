import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-header-group',
  templateUrl: './custom-header-group.component.html',
  styleUrls: ['./custom-header-group.component.scss']
})
export class CustomHeaderGroupComponent implements OnInit {
  params: any;
  private expandState: string;

  constructor() { }

  ngOnInit() {
  }

  agInit(params): void {
    this.params = params;

    this.params.columnGroup.addEventListener('expandedChanged', this.syncExpandButtons.bind(this));
    this.syncExpandButtons();
  }

  syncExpandButtons() {
    if (this.params.columnGroup.getOriginalColumnGroup().isExpanded()) {
      this.expandState = 'expanded';
    } else {
      this.expandState = 'collapsed';
    }
  }

  expandOrCollapse() {
    const currentState = this.params.columnGroup.getOriginalColumnGroup().isExpanded();
    this.params.setExpanded(!currentState);
  }
}
