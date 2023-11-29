import { Component, EventEmitter, Input, OnInit ,Output} from '@angular/core';
import { JsonServiceTsService } from 'src/app/services/json.service';
import { imageModelDTO } from 'src/app/intreface/imageModeDTO';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent implements OnInit {
  @Input("img")
  image: imageModelDTO = { collectionSymbolization: '', imagePath: '', imgNumber: '', itemId: '', title: '',backOfImage:'',back:false,save:false }
  back: boolean = false
  ngOnInit(): void {
  }
  constructor(public server: JsonServiceTsService) { }

  sendCheckboxValue(event: any) {
    this.back = event.checked;
    this.image.back = event.checked;
  }
}
