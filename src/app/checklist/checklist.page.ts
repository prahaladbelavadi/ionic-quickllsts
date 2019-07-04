import { Component, OnInit } from '@angular/core';
import { Checklist } from '../interfaces/checklists';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ChecklistDataService } from '../services/checklist-data.service';



@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  private slug: string;
  public checklist: Checklist;

  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private dataService: ChecklistDataService) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    this.loadChecklist();
  }

  loadChecklist() {
    if (this.dataService.loaded) {
      this.checklist = this.dataService.getChecklist(this.slug);
    } else {
      this.dataService.load()
        .then(() => {
          this.checklist = this.dataService.getChecklist(this.slug);
        });
    }
  }

  addItem(): void {
    this.alertCtrl.create({
      header: 'Add Item',
      message: 'Enter the name of the task for this checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.addItem(this.checklist.id, data);
          }
        }
      ]
    }).then((prompt) => {
      prompt.present();
    });
  }

  removeItem(item): void {
    this.dataService.removeItem(this.checklist, item);
  }

  renameItem(item): void {
    this.alertCtrl.create({
      header: 'Rename Item',
      message: 'Enter the new name of the task for this checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameItem(item, data)
          }
        }
      ]
    }).then((prompt) => {
      prompt.present();
    });
  }

  toggleItem(item): void {
    this.dataService.toggleItem(item);
  }

}
