import { Component, ViewChild } from '@angular/core';
import { ColorPickerEventArgs, SignatureComponent, SignatureFileType } from '@syncfusion/ej2-angular-inputs';
import { ItemModel, MenuEventArgs, SplitButton } from '@syncfusion/ej2-angular-splitbuttons';
import { addClass, getComponent } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangularproject';
  @ViewChild('signature') signObj !: SignatureComponent;

  public presetColors = {
    'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
  }

  public widthOptions: ItemModel[] = [
    { text: '1'},
    { text: '2'},
    { text: '3'},
  ];

  public saveOptions: ItemModel[] = [
    { text: 'Png'},
    { text: 'Jpeg'},
    { text: 'Svg'},
  ];

  public onColorChange(args: ColorPickerEventArgs, id: string){
    if(!this.signObj.disabled){
      let pickerElem: any = this.getPickerElem(id);
      if(id=== 'bg-color'){
        this.signObj.backgroundColor = args.currentValue.rgba;
      } else {
        this.signObj.strokeColor = args.currentValue.rgba;
      }
      pickerElem.style.borderBottomColor = args.currentValue.rgba;
    }
  }

  public onCreated(id: string){
    let pickerElem: any = this.getPickerElem(id);
    addClass([pickerElem], 'e-sign-icons');
  }

  public getPickerElem(id: string){
    return document.getElementById(id)?.nextElementSibling?.querySelector('.e-selected-color');
  }

  public onClick(args: any){
    if(!this.signObj.disabled){
      (args.item.text === 'Undo') ? this.signObj.undo() : (args.item.text === 'Redo') ? this.signObj.redo() : this.signObj.clear();
    }
  }  

  public onSelect(args: MenuEventArgs, option: string){
    if(option === 'stroke-width'){
      this.signObj.maxStrokeWidth = parseInt(args.item.text as string);
    } else {
      this.signObj.save(args.item.text as SignatureFileType, 'Save');
    }
  }

  public onChange(){
    let splitBtn = document.getElementById('save');
    (getComponent(splitBtn as HTMLElement, 'split-btn') as SplitButton).disabled = this.signObj.isEmpty() ? true : false;
  }

  public valueChanged(args: ChangeEventArgs){
    this.signObj.disabled = args.checked as boolean;
  }
}
