import { Component } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { ChecklistDataService } from "../services/checklist-data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public dataService: ChecklistDataService, private alertCtrl: AlertController) { }

  addChecklist(): void {
    this.alertCtrl.create({
      header: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ], buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.createChecklist(data);
          }
        }
      ]
    }).then((prompt)=>{
      prompt.present();
    });
  }

  renameChecklist(checklist): void {

  }

  removeChecklist(checklist): void {

  }

}
