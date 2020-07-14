import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from 'src/app/model/album.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  album = new BehaviorSubject<Album>(null);
  albumData = this.album.asObservable();
  albumList = new BehaviorSubject<Array<Album>>(null);
  albumListData = this.albumList.asObservable();
  constructor() { }
  updateAlbumList(data) {
    this.albumList.next(data);
  }
  updateAlbum(data) {
    this.album.next(data);
  }
}
