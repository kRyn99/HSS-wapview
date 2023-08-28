import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HTTPService } from "./http.service";
import { CONFIG } from "./constants";

@Injectable({
  providedIn: "root",
})
export class ContrivanceService {
  selectedUnitValue: BehaviorSubject<any> = new BehaviorSubject([]);
  showDropdown = false;
  lstContributorDTOService = new BehaviorSubject<any>([]);
  lstContributorDTOServiceOut = new BehaviorSubject<any>([]);
  public file: BehaviorSubject<{ url: string; name: string }> = new BehaviorSubject({
    url: '',
    name: '',
  });
  contrivancesDTO = new BehaviorSubject<any>(null);

  previousRoute: string;
  requestContrivanceIdSelected: number;
  isFromAdd: boolean;

  constructor(
    public http: HttpClient,
    public httpService: HTTPService,
    public spinner: NgxSpinnerService,
    public toastrService: ToastrService,
    public httpClient: HttpClient
  ) {}

  header = {
    // "Content-Type": "application/json",
    "Accept-Language": localStorage.getItem(CONFIG.KEY.LOCALIZATION),
    // Authorization:
    //   "Bearer " + JSON.parse(localStorage.getItem(CONFIG.KEY.TOKEN)),
  };

  callApiCommon(functionName, request) {
    this.spinner.show();
    const url = `${environment.API_HOST_NAME}/api/${functionName}`;
    // spread operator
    return this.httpClient
      .post<any>(url, request, {
        headers: {
          ...this.header,
          Authorization: "Bearer " + JSON.parse(localStorage.getItem(CONFIG.KEY.TOKEN))
        },
      })
      .pipe(
        catchError((err) => {
          this.toastrService.error(err.error?.message || err.message);
          this.spinner.hide();
          return of(undefined);
        }),
        finalize(() => {
          this.spinner.hide();
        })
      );
  }

  callApiCommonUsingGet(functionName, request) {
    this.spinner.show();
    const url = `${environment.API_HOST_NAME}/api/${functionName}`;
    // spread operator
    return this.httpClient
      .get(url, {
        headers: {
          ...this.header,
          Authorization: "Bearer " + JSON.parse(localStorage.getItem(CONFIG.KEY.TOKEN))
        },
        params: request,
      })
      .pipe(
        catchError((err) => {
          this.toastrService.error(err.error?.message || err.message);
          this.spinner.hide();
          return of(undefined);
        }),
        finalize(() => {
          this.spinner.hide();
        })
      );
  }

  getListContrivance(contrivanceDTO) {
    return this.http.post<any>(
      `${environment.API_HOST_NAME}/api/get-list-contrivance`,
      contrivanceDTO,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenInLocalStorage")
          )}`,
        },
      }
    );
  }

  getContrivanceDetail(contrivanceDTO) {
    return this.http.post<any>(
      `${environment.API_HOST_NAME}/api/get-contrivance-detail`,
      contrivanceDTO,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenInLocalStorage")
          )}`,
        },
      }
    );
  }

  clearData() {
    this.lstContributorDTOService.next([]);
    this.lstContributorDTOServiceOut.next([]);
    this.file.next({ url: "", name: "" });
    this.contrivancesDTO.next(null);
    this.selectedUnitValue.next([]);
    this.showDropdown = false;
  }
}
