import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-table-ex',
  templateUrl: './table-ex.component.html',
  styleUrls: ['./table-ex.component.scss']
})
export class TableExComponent implements OnInit {
  column = [
    {headerName: 'ID', field: 'id_corp', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'Назва', field: 'corp_name', sortable: true, filter: true },
    {headerName: 'ID Моріон', field: 'id_morion', sortable: true, filter: true},
    {headerName: 'Назва Моріон', field: 'morion_name', sortable: true, filter: true}
  ];
  row = [];
  @ViewChild('agGrid') agGrid: AgGridNg2;
  localeText = {
    // for number filter and text filter
    filterOoo: 'фільтр...',
    applyFilter: 'застосовувати фільтр...',
    equals: 'дорівнює',
    notEquals: 'не дорівнює',
    notEqual: 'не рівний',

    // for text filter
    contains: 'містить в собі',
    notContains: 'немістить',
    startsWith: 'починається з',
    endsWith: 'закінчується з',

    and: 'і',
    or: 'або',
    noRowsToShow: 'Немає рядків для показу'
  };

  constructor() {
    this.fetchData((response) => {
      this.row = response;
    });
  }

  ngOnInit() {
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.id_corp + '   ' + node.corp_name).join(',  ');
    alert(`Вибрані рядки: ${selectedDataStringPresentation}`);
  }

  fetchData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/corp-list.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
