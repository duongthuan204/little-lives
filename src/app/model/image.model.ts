export class Image {
    imageName: string;
    imageUrl: string;
    like: number;
    likeByYou: boolean;
    star: boolean

    constructor() {
        {
          this.imageName = null;
          this.imageUrl = null;
          this.like = 0;
          this.likeByYou = false;
          this.star = false;
        }
    }   
}
