import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  album: Album = new Album();
  albumList: Array<Album> = new Array;
  isDisplayNewAlbum: boolean;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.albumListData.subscribe(data => this.albumList = data);
  }

  likeAlbum(album) {
    if (!album.likeByYou) {
      album.like++;
    } else {
      album.like--;
    }
    album.likeByYou = !album.likeByYou;
  }

  goToDetail(album) {
    this.updateAlbumData(album);
    this.router.navigate(['detail']);
  }

  updateAlbumData(album) {
    this.dataService.updateAlbum(album);
  }

  updateAlbumListData(albumList) {
    this.dataService.updateAlbumList(albumList);
  }

  addNewAlbum(album) {
    this.albumList.unshift(album);
    this.updateAlbumListData(this.albumList);
  }

  displayNewAlbum() {
    this.isDisplayNewAlbum = true;
  }

  receiveValue($event){
    this.isDisplayNewAlbum = $event;
  }

}
