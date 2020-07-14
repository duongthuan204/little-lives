import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { Image } from 'src/app/model/image.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  album: Album = new Album();
  image: Image = new Image();
  isDisplay: boolean;
  currentIndex: number;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.dataService.albumData.subscribe(data => this.album = data);
    if (this.album == null) {
      this.router.navigate(['']);
    }
  }

  displayImage(image, index) {
    this.image = image;
    this.isDisplay = true;
    this.currentIndex = index;
  }

  moveToImage(index) {
    if (index == -1) {
      index = this.album.imageList.length - 1;
    } else if (index == this.album.imageList.length) {
      index = 0;
    }
    this.currentIndex = index;
    this.displayImage(this.album.imageList[index], index);
  }

  closeImage() {
    this.isDisplay = false;
  }

  likeImage(image) {
    if (!image.likeByYou) {
      image.like++;
    } else {
      image.like--;
    }
    image.likeByYou = !image.likeByYou;
  }

  validateImage(fileName) {
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    return (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
  }

  uploadImage(event) {
    let file = event.target.files[0];
    if (!this.validateImage(file.name)) {
      alert('Only accept jpg/jpeg/png file!');
      (<HTMLInputElement>document.getElementById('fileInput')).value = "";
      return;
    }
    let reader = new FileReader();
    let image: Image = new Image();
    reader.onload = (() => {
      return () => {
        let result: string = reader.result as string;
        image.imageUrl = result;
        image.imageName = file.name;
        this.album.imageList.unshift(image);
        this.updateAlbumData(this.album);
        (<HTMLInputElement>document.getElementById('fileInput')).value = "";
      }
    })();
    reader.readAsDataURL(file);
  }

  updateAlbumData(album) {
    this.dataService.updateAlbum(album);
  }

}
