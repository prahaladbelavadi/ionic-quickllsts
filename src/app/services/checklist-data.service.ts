import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklists';

@Injectable({
  providedIn: 'root'
})

export class ChecklistDataService {

  public checklists: Checklist[] = [];
  public loaded: boolean = false;

  constructor() { }

  load(): Promise<boolean> {
    return Promise.resolve(true);
  }

  createChecklist(data): void {
    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: []
    });
    this.save();
  }

  renameChecklist(checklist, data): void {
    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists[index].title = data.name;
      this.save();
    }
  }

  removeChecklist(checklist): void {
    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklistId, data): void {
    this.getChecklist(checklistId).items.push({
      title: data.name,
      checked: false
    });
    this.save();
  }

  removeItem(checklist, item): void {
    let index = checklist.items.indexOf(item);

    if (index > -1) {
      checklist.items.splice(index, 1);
      this.save();
    }
  }

  renameItem(item, data): void {
    item.title = data.name;

    this.save();
  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.save();
  }

  save(): void {

  }

  generateSlug(title): string {

    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // check if slug already exists

    let exists = this.checklists.filter((checklist) => {
      return checklist.id.substring(0, slug.length) === slug;
    });

    // if title is already used, make slug unique by adding a number
    if (exists.length > 0) {
      slug = slug + exists.length.toString();
    }

    return slug;

  }


}
