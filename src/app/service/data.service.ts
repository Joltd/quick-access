import {Injectable} from "@angular/core";
import {Entry} from "../model/entry";
import {Observable, of} from "rxjs";

@Injectable()
export class DataService {

  list(): Observable<Entry[]> {
    return of([
      this.build(1, 'Test 1', 'test-1'),
      this.build(2, 'Test 2', 'test-2'),
      this.build(3, 'Test 3', 'test-3'),
      this.build(4, 'Test 4', 'test-4'),
      this.build(5, 'Test 5', 'test-5'),
    ])
  }

  byId(id: number): Observable<Entry> {
    return of(this.build(1, 'Test-1', 'test-1'))
  }

  favorite(): Observable<Entry> {
    // list()
    // if no favorite then select first
    return of()
  }

  update(entry: Entry): Observable<void> {
    return of()
  }

  remove(id: number): Observable<void> {
    return of()
  }

  private build(id: number, name: string, data: string) {
    let entry = new Entry()
    entry.id = id
    entry.name = name
    entry.data = data
    return entry
  }

}
