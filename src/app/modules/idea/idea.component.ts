import { Component } from "@angular/core";
import { DataService } from "../../shared/service/data.service";

@Component({
  selector: "app-idea",
  templateUrl: "./idea.component.html",
  styleUrls: ["./idea.component.scss"],
})
export class IdeaComponent {
  constructor(public DataService: DataService) {}
  closeOverlay() {
    this.DataService.showBg = false;
    this.DataService.showAddInsideAuthor = false;
    this.DataService.showEditInsideAuthor = false;
    this.DataService.showAddOutsideAuthor = false;
    this.DataService.showEditOutsideAuthor = false;
    this.DataService.showDuplicateIdea = false;
    this.DataService.showAddInsideEdit = false;
    this.DataService.showEditInsideEdit = false;
    this.DataService.showAddOutsideEdit = false;
    this.DataService.showEditOutsideEdit = false;
    if (!this.DataService.showBg) {
      document.body.style.overflow = "auto";
    }
  }
}
