import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-status-color",
  templateUrl: "./status-color.component.html",
  styleUrls: ["./status-color.component.scss"],
})
export class StatusColorComponent implements OnInit {
  @Input() status: number;
  statusName: string;
  classColor: string = "text-primary";

  constructor(
    private router: Router,
    public translate: TranslateService) {}

  ngOnInit(): void {
    this.getStatusName();
  }

  getStatusName() {
    const span = document.getElementsByTagName("span");
    if (this.status === 0) {
      this.classColor = "statusColor0";
      this.statusName = this.translate.instant("IDEA_MANAGEMENT.STATUS.CREATED");
    } else if (this.status === 1) {
      this.classColor = "statusColor1";
      this.statusName = this.translate.instant("IDEA_MANAGEMENT.STATUS.WAITING_FOR_EVALUATION");
    } else if (this.status === 2) {
      this.classColor = "statusColor2";
      this.statusName = this.translate.instant("IDEA_MANAGEMENT.STATUS.EVALUATED");
    } else if (this.status === 3) {
      this.classColor = "statusColor3";
      this.statusName = this.translate.instant("IDEA_MANAGEMENT.STATUS.REJECTED");
    }
  }
}
