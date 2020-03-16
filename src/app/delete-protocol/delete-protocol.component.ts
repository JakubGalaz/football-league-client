import { Component, OnInit } from '@angular/core';
import {Protocol} from "../Protocol";
import {ProtocolServiceService} from "../protocol-service.service";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-delete-protocol',
  templateUrl: './delete-protocol.component.html',
  styleUrls: ['./delete-protocol.component.css']
})
export class DeleteProtocolComponent implements OnInit {
allProtocols: Protocol[];
protocol: Protocol;
sortedData: Protocol[];

  constructor(private protocolService: ProtocolServiceService) { }

  ngOnInit(): void {
    this.getProtocols();


  }

  getProtocols(){
    this.protocolService.getProtocols().subscribe( protocol =>
    {
      this.allProtocols = protocol;
      this.sortedData = this.allProtocols.slice();
    });
  }

  deleteProtocolById(id: string){
    this.protocolService.deleteProtocolById(id).subscribe( protocol => {
        this.protocol = protocol;
      });
  }

  sortData(sort: Sort) {
    const data = this.allProtocols.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'host':
          return compare(a.host, b.host, isAsc);
        case 'guest':
          return compare(a.guest, b.guest, isAsc);
        case 'refree':
          return compare(a.refree, b.refree, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

