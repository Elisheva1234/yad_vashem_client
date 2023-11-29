import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonServiceTsService } from 'src/app/services/json.service';
import { imageModelDTO } from 'src/app/intreface/imageModeDTO';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent {
  numberFormControl: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  constructor(public server: JsonServiceTsService) { }
  collectionName: string = "";
  numOfImg: number = 0;
  collectionNumber: string = '';
  img: imageModelDTO[] = [];
  getCollectionName() {
    this.server.getCollectionDetils(this.numberFormControl.value)
      .subscribe((res) => {
        this.collectionName = res.collctionName;
        this.numOfImg = parseInt(res.numOfImg);
        this.collectionNumber = res.collectionSymbolization
      });
  }
  addItem() {
    this.numOfImg++
    this.img.push({
      collectionSymbolization: this.collectionNumber,
      imagePath: "images/" + this.collectionNumber + "/" + this.numOfImg.toString() + ".jpg",
      backOfImage: "images/" + this.collectionNumber + "/" + this.numOfImg.toString() + "_XX.jpg",
      imgNumber: this.numOfImg.toString(),
      itemId: this.collectionNumber + this.numOfImg.toString(),
      title: this.collectionName,
      back: false,
      save: false
    })
  }
  delete() {
    this.numOfImg--
    this.img.pop()
  }
  save() {
    this.img.forEach((item: imageModelDTO) => {
      if (!item.save) {
        if (!item.back)
          item = {
            collectionSymbolization: item.collectionSymbolization,
            imagePath: item.imagePath,
            imgNumber: item.imgNumber,
            itemId: item.itemId,
            title: item.title,
            back: item.back,
            save: false,
          }
        this.server.addImgToCollection(item).subscribe(res => {
          console.log(res);          
          item.save = true
        }, error => { alert(error) })
      }
    })
  }
}
