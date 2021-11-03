import {Injectable} from "@angular/core";
import {Entry} from "../model/entry";
import {from, Observable, of, partition} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import Dexie from "dexie";
import {plainToClass} from "class-transformer";
import {Setting} from "../model/setting";

@Injectable()
export class DataService {

  private static SETTINGS: string = 'settings'
  private static ENTRIES: string = 'entries'
  private static CACHE: string = 'quick-access'
  private static CACHE_PREFIX: string = '/file/'

  private db: Dexie

  constructor() {
    this.db = new Dexie(DataService.CACHE)
    this.db.version(4).stores({
      settings: '++id,skip_intro',
      entries: "++id,name,path,favorite,data"
    })
  }

  isFirstStart(): Observable<boolean> {
    return from(this.db.table(DataService.SETTINGS).toArray())
      .pipe(map(result => result.length == 0 || !result[0].skipIntro))
  }

  skipIntro(): Observable<void> {
    let setting = new Setting()
    setting.skipIntro = true
    return from(this.db.table(DataService.SETTINGS).add(setting))
      .pipe(map(() => {}))
  }

  list(): Observable<Entry[]> {
    return from(this.db.table(DataService.ENTRIES).toArray())
      .pipe(map(entries => entries.map(entry => plainToClass(Entry, entry))))
  }

  byId(id: number): Observable<Entry> {
    return from(this.db.table(DataService.ENTRIES).get(id))
      .pipe(map(entry => plainToClass(Entry, entry)))
  }

  favorite(): Observable<Entry | null> {
    return this.list()
      .pipe(
        map(entries => {
          let favorites = entries.filter(entry => entry.favorite)
          if (favorites.length > 0) {
            return favorites[0]
          } else if (entries.length > 0) {
            return entries[0]
          } else {
            return null
          }
        }),
      )
  }

  update(entry: Entry): Observable<void> {
    return from(
      this.db.transaction('rw', this.db.table(DataService.ENTRIES), async () => {
        await this.db.table(DataService.ENTRIES)
          .filter(entry => entry.favorite == true)
          .modify({favorite: false})

        await this.db.table(DataService.ENTRIES).update(entry.id, entry)
      })
    ).pipe(map(() => {}))
  }

  remove(id: number): Observable<void> {
    return from(
      this.db.table(DataService.ENTRIES)
        .get(id)
        .then(entry => window.caches.open(DataService.CACHE)
            .then(cache => cache.delete(entry.path))
        )
        .then(() => this.db.table(DataService.ENTRIES).delete(id))
    ).pipe(map(() => {}))
  }

  createByFile(file: File): Observable<void> {

    let entry = new Entry()

    return from(
      this.db.table(DataService.ENTRIES)
        .add(entry)
        .then(id => {
          entry.id = id as number
          entry.name = 'File #' + id
          entry.path = DataService.CACHE_PREFIX + id

          return window.caches.open(DataService.CACHE)
        })
        .then(cache => cache.put(entry.path, new Response(file)))
        .then(() => this.db.table(DataService.ENTRIES).update(entry.id, entry))
    ).pipe(map(() => {}))

  }

  createByQr(data: string): Observable<number> {

    let entry = new Entry()
    entry.data = data

    return from(
      this.db.table(DataService.ENTRIES)
        .add(entry)
        .then(id => {
          entry.id = id as number
          entry.name = 'File #' + id
        })
        .then(() => this.db.table(DataService.ENTRIES).update(entry.id, entry))
    ).pipe(map(() => entry.id))

  }

}
