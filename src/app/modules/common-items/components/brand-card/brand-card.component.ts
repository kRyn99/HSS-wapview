import { formatNumber } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-brand-card",
  templateUrl: "./brand-card.component.html",
  styleUrls: ["./brand-card.component.scss"],
})
export class BrandCardComponent implements OnInit {
  @Input() bannerUrl: string;
  @Input() logoUrl: string;
  @Input() logoStyle: string;
  @Input() description: string;
  @Input() totalFollowers: number;

  constructor() {}

  ngOnInit() {
  }
}
