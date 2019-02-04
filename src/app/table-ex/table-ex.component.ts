import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-table-ex',
  templateUrl: './table-ex.component.html',
  styleUrls: ['./table-ex.component.scss']
})
export class TableExComponent implements OnInit {
  column = [
    {headerName: 'ID', field: 'id_corp', sortable: true, filter: true, checkboxSelection: true, resizable: true},
    {headerName: 'Назва', field: 'corp_name', sortable: true, filter: true, resizable: true,  editable: true },
    {headerName: 'ID Моріон', field: 'id_morion', sortable: true, filter: true, resizable: true},
    {headerName: 'Назва Моріон', field: 'morion_name', sortable: true, filter: true, resizable: true}
  ];
  colList = this.createCheckedColumnList();
  row = [];
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChildren('myEntityCheckbox') private myEntityCheckboxes: QueryList<ElementRef>;
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

  ngOnInit() {}

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.id_corp + '   ' + node.corp_name).join(',  ');
    if (selectedData.length === 0) {
      alert('Виберіть рядок');
      return;
    }
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

  toggle(col) {
    const elemRefArr = this.myEntityCheckboxes.toArray();
    const arrObj = elemRefArr.filter((el) => col['field'] === el.nativeElement['name']);
    col['isChecked'] = arrObj[0].nativeElement['checked'];

    this.setColDefData(col);
  }

  setColDefData(col) {
    if (col['isChecked'] === false) {
      const arrAfterDeleting = this.column.filter((el) => col['field'] !== el['field']);
      this.column = arrAfterDeleting;
    } else {
      const newArr = [];
      const arrAfterAddition = this.colList.filter((el) => el['field'] === col['field']);

      this.column.map((el) => {
        newArr.push(Object.assign({}, el));
      });
      delete arrAfterAddition[0]['isChecked'];
      delete arrAfterAddition[0]['id'];
      newArr.push(arrAfterAddition[0]);
      this.column = newArr;
    }
  }

  createCheckedColumnList(): Object[] {
    const newArr = [];
    for (let i = 0; i < this.column.length; i++) {
      const newObj = Object.assign({}, this.column[i]);
      newArr.push(newObj);
      newArr[i]['id'] = i;
      newArr[i]['isChecked'] = true;
    }
    return newArr;
  }
}
