import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[statusColor]",
})
export class ChangeColorDirective {
  @Input("statusColor") status: number;
  @Input("checkStatusRequest") checkStatusRequest: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnChanges() {
    const color = this.getColorByStatus(this.status); // Lấy màu dựa trên trạng thái

    // Áp dụng màu văn bản vào phần tử
    this.renderer.setStyle(this.el.nativeElement, "background", color);
  }

  getColorByStatus(status: number): string {
    if(this.checkStatusRequest){
      switch (status) {
        case 1:
          return "#2E8AF6";
        case 2:
          return "#3BC46A";
        case 3:
          return "#E24B4B";
      }
    }else{
      switch (status) {
        case 0:
          return "#2E8AF6";
        case 1:
          return "#F6B241";
        case 2:
          return "#3BC46A";
        case 3:
          return "#E24B4B"; 
      }
    }
    
  }
}
