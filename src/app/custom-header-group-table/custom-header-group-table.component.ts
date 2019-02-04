import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomHeaderGroupComponent} from './custom-header-group/custom-header-group.component';
import { AgGridNg2 } from 'ag-grid-angular';

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
        field: 'id_corp'
      },
      {
        headerName: 'Назва',
        field: 'corp_name',
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
        field: 'id_morion'
      },
      {
        headerName: 'Назва Моріон',
        field: 'morion_name'
      }
    ]
  }];
  @ViewChild('agGrid') agGrid: AgGridNg2;

  constructor() {
    this.frameworkComponents = { customHeaderGroupComponent: CustomHeaderGroupComponent };
    this.defaultColDef = {
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

  getSelectedRows_1(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.id_corp + '   ' + node.corp_name).join(',  ');
    if (selectedData.length === 0) {
      alert('Виберіть рядок');
      return;
    }
    alert(`Вибрані рядки: ${selectedDataStringPresentation}`);
  }
}
