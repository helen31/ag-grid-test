import { Component, OnInit } from '@angular/core';
import {CustomHeaderGroupComponent} from './custom-header-group/custom-header-group.component';

@Component({
  selector: 'app-custom-header-group-table',
  templateUrl: './custom-header-group-table.component.html',
  styleUrls: ['./custom-header-group-table.component.scss']
})
export class CustomHeaderGroupTableComponent implements OnInit {
  row = [];
  defaultColDef;
  frameworkComponents;
  columnDefs = [{
    headerName: 'Дані',
    headerGroupComponent: 'customHeaderGroupComponent',
    children: [
      {
        headerName: 'ID',
        field: 'id_corp',
        width: 150
      },
      {
        headerName: 'Назва',
        field: 'corp_name',
        width: 150,
        sortable: true,
        filter: true,
        checkboxSelection: true
      }
    ]
  }, {
    headerName: 'Дані Моріон',
    headerGroupComponent: 'customHeaderGroupComponent',
    children: [
      {
        headerName: 'ID Моріон',
        field: 'id_morion',
        width: 150
      },
      {
        headerName: 'Назва Моріон',
        field: 'morion_name',
        width: 150
      }
    ]
  }];

  constructor() {
    this.frameworkComponents = { customHeaderGroupComponent: CustomHeaderGroupComponent };
    this.defaultColDef = {
      width: 100,
      resizable: true
    };
  }

  ngOnInit() {
    this.fetchData((response) => {
      this.row = response;
    });
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
