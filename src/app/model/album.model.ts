import { Image } from 'src/app/model/image.model';

export class Album {
    albumId: string;
    albumName: string;
    createDate: string;
    description: string;
    coverImage: string;
    like: number;
    likeByYou: boolean;
    star: boolean;
    imageList: Array<Image>;

    constructor() {
        {
          this.albumId = null;
          this.albumName = null;
          this.createDate = null;
          this.description = null;
          this.coverImage = null;
          this.like = 0;
          this.likeByYou = false;
          this.star = false;
          this.imageList = [];
        }
    }
}
