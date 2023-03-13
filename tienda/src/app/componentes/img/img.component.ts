import { Component, Input, Output, EventEmitter, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements AfterViewInit {
  img: string ='';

  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
  }

  @Output() loaded = new EventEmitter<string>();
  
  imageDefaul='https://image.shutterstock.com/image-vector/images-icon-simple-flat-black-260nw-1686170467.jpg';

  constructor() {}

  ngAfterViewInit(){}

  imgError(){
    this.img = this.imageDefaul;
  }

  imgLoaded(){
    this.loaded.emit(this.img);
  }

}
