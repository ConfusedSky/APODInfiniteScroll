import { Component, OnInit, ViewChild } from '@angular/core';
import { ApodService } from '../apod.service';
import { ApodData } from "../shared/ApodData";
import { Observable, forkJoin, BehaviorSubject } from "rxjs";
import { throttleTime, mergeMap, scan, map } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
 
@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss']
})
export class UnlimitedPhotoCollageComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  list$: Observable<ApodData[]>;
  batch = 5;
  offset = new BehaviorSubject(null);

  constructor(private apod: ApodService) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => { 
        return [...acc, ...batch];
      }, [])
    );

    this.list$ = batchMap.pipe(map(v => Object.values(v)));
  }

  getBatch(offset) {
    var base;
    if(offset) base = new Date(offset);
    console.log(base);
    var requests = [];
    for(var i = 0; i < this.batch; i++){
      requests.push(this.apod.getDay(i, base));
    }

    return forkJoin(requests);
  }

  prevOffset = undefined;

  nextBatch(e, offset) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}/${total}`);
    if(end === total && this.prevOffset !== offset)
    {
      this.prevOffset = offset;
      console.log(`Updated with ${offset}`);
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

  ngOnInit() {
  }
}
