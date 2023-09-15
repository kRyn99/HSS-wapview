import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

const _initErrorMessages: {
  singleDate?: string;
  startDate?: string;
  endDate?: string;
} = {
  singleDate: "",
  startDate: "",
  endDate: "",
};

@Injectable({
  providedIn: "root",
})
export class CommonFormUtils {
  _form: FormGroup = new FormGroup({});
  _errorMessages = { ..._initErrorMessages };

  get form(): FormGroup {
    return this._form;
  }

  setForm(form: FormGroup) {
    this._form = form;
  }

  get errorMessages() {
    return this._errorMessages;
  }

  /**
   * Set error message for control
   * @param type singleDate | startDate | endDate
   * @param message error message
   */
  setErrorMessage(type: string, message: string) {
    this._errorMessages[type] = message;
  }

  resetErrorMessages() {
    this._errorMessages = { ..._initErrorMessages };
  }

  /**
   * Check if control is invalid
   * @param controlName
   * @returns
   */
  isControlInvalid(controlName: string): boolean {
    const control = this._form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  /**
   * Check if control has specific  error
   * @param validation name of validation (required, pattern, ...)
   * @param controlName
   * @returns
   */
  controlHasError(validation: string, controlName: string): boolean {
    const control = this._form.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  /**
   * Get control by name
   * @param controlName
   * @returns
   */
  control(controlName: string): AbstractControl {
    return this._form.controls[controlName];
  }

  /**
   * Check if form is valid
   * @returns
   */
  isValidForm(): boolean {
    let isValid = true;
    Object.keys(this._form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this._form.get(key).errors;

      if (controlErrors) {
        isValid = false;
      }
    });
    if (
      this.errorMessages.startDate !== "" ||
      this.errorMessages.endDate !== ""
    ) {
      isValid = false;
    }
    return isValid;
  }

  /**
   * Check if single date control is invalid
   * @param controlName
   * @param dateDataType Date | NgbDate
   * @param compareToCurrentDate return error if before | before-equal | after | after-equal | equal to current date
   * @returns
   */
  isControlInvalidDate(
    controlName: string,
    dateDataType?: string,
    compareToCurrentDate?: string
  ): boolean {
    let dateValue = this.control(controlName).value;
    this.setErrorMessage("singleDate", "");
    this.control(controlName).setErrors(null);
    if (
      dateValue == undefined ||
      dateValue == null ||
      (typeof dateValue == "string" && dateValue == "")
    ) {
      this.control(controlName).setErrors({ required: true });
      this.setErrorMessage("singleDate", "required");
      return true;
    } else if (typeof dateValue == "string") {
      let dateValueString: string = dateValue;
      if (/^[0-9]{8}$/.test(dateValueString)) {
        dateValueString = [
          dateValueString.substr(0, 2),
          dateValueString.substr(2, 2),
          dateValueString.substr(4, 4),
        ].join("/");
        if (!this.isValidDateForm(dateValueString)) {
          this.control(controlName).setErrors({ invalid: true });
          this.setErrorMessage("singleDate", "invalid");
          return true;
        }
      } else {
        this.control(controlName).setErrors({ invalid: true });
        this.setErrorMessage("singleDate", "invalid");
        return true;
      }
    } else if (typeof dateValue == "object") {
      let error = null;
      let originError = this.control(controlName).errors;
      switch (dateDataType) {
        case "Date":
          error = this.checkWithCurrentDate(dateValue, compareToCurrentDate);
          break;
        case "NgbDate":
          error = this.checkWithCurrentNgbDate(dateValue, compareToCurrentDate);
          break;
      }
      if (error) {
        this.control(controlName).setErrors({ ...originError, ...error });
        this.setErrorMessage("singleDate", Object.keys(error)[0].toString());
        return true;
      }
    }
    return false;
  }

  private checkWithCurrentDate(date: Date, compareType: string): object {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    switch (compareType) {
      case "before":
        return date < currentDate ? { before: true } : null;
      case "before-equal":
        return date <= currentDate ? { beforeEqual: true } : null;
      case "after":
        return date > currentDate ? { after: true } : null;
      case "after-equal":
        return date >= currentDate ? { afterEqual: true } : null;
      case "equal":
        return date == currentDate ? { equal: true } : null;
      default:
        return null;
    }
  }

  private checkWithCurrentNgbDate(date: NgbDate, compareType: string): object {
    const currentDate = new Date();
    const currentNgbDate = new NgbDate(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
    switch (compareType) {
      case "before":
        return this.compareBeforeNgbDate(date, currentNgbDate)
          ? { before: true }
          : null;
      case "before-equal":
        return this.compareBeforeNgbDate(date, currentNgbDate) ||
          this.compareEqualNgbDate(date, currentNgbDate)
          ? { beforeEqual: true }
          : null;
      case "after":
        return this.compareAfterNgbDate(date, currentNgbDate)
          ? { after: true }
          : null;
      case "after-equal":
        return this.compareAfterNgbDate(date, currentNgbDate) ||
          this.compareEqualNgbDate(date, currentNgbDate)
          ? { afterEqual: true }
          : null;
      case "equal":
        return this.compareEqualNgbDate(date, currentNgbDate)
          ? { equal: true }
          : null;
      default:
        return null;
    }
  }

  /**
   * Check if date range control is invalid
   * @param type enter start | end to know which control is validated
   * @param startDateControlName
   * @param endDateControlName
   * @param dateDataType Date | NgbDate
   * @param compareToCurrentDate return error if before | before-equal | after | after-equal | equal to current date
   * @returns true if invalid, false if valid and set error 'startEnd' for control if startDate > endDate
   */
  isControlInvalidDateRange(
    type: string,
    startDateControlName: string,
    endDateControlName: string,
    dateDataType?: string,
    compareToCurrentDate?: string
  ): boolean {
    let isInvalid = false;
    switch (type) {
      case "start":
        isInvalid = this.isControlInvalidDate(
          startDateControlName,
          dateDataType,
          compareToCurrentDate
        );
        break;
      case "end":
        isInvalid = this.isControlInvalidDate(
          endDateControlName,
          dateDataType,
          compareToCurrentDate
        );
        break;
    }

    let startDateValue = this.control(startDateControlName).value;
    let endDateValue = this.control(endDateControlName).value;
    let error = null;
    let originErrorStartDate = this.control(startDateControlName).errors;
    let originErrorEndDate = this.control(endDateControlName).errors;
    switch (dateDataType) {
      case "Date":
        error = endDateValue !== null && startDateValue > endDateValue ? { startEnd: true } : null;
        break;
      case "NgbDate":
        error = endDateValue !== null && this.compareAfterNgbDate(startDateValue, endDateValue) ? { startEnd: true } : null;        break;
    }
    if (error) {
      this.control(startDateControlName).setErrors({ ...originErrorStartDate, ...error });
      this.setErrorMessage("startDate", Object.keys(error)[0].toString());
      this.control(endDateControlName).setErrors({ ...originErrorEndDate, ...error });
      this.setErrorMessage("endDate", Object.keys(error)[0].toString());
      return true;
    } else {
      if (this.control(startDateControlName).getError("startEnd")) {
        delete this.control(startDateControlName).errors.startEnd;
        if (this.errorMessages.startDate == "startEnd") {
          this.setErrorMessage("startDate", "");
        }
      }
      if (this.control(endDateControlName).getError("startEnd")) {
        delete this.control(endDateControlName).errors.startEnd;
        if (this.errorMessages.endDate == "startEnd") {
          this.setErrorMessage("endDate", "");
        }
      }
    }

    if (isInvalid) {
      return isInvalid;
    }
    return false;
  }

  /**
   * return true if firstDate is before secondDate
   * @param firstDate
   * @param secondDate
   * @returns
   */
  compareBeforeNgbDate(firstDate: NgbDate, secondDate: NgbDate): boolean {
    if (firstDate.year > secondDate.year) {
      return false;
    } else if (firstDate.year < secondDate.year) {
      return true;
    } else {
      if (firstDate.month > secondDate.month) {
        return false;
      } else if (firstDate.month < secondDate.month) {
        return true;
      } else {
        if (firstDate.day >= secondDate.day) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  /**
   * return true if firstDate is after secondDate
   * @param firstDate
   * @param secondDate
   * @returns
   */
  compareAfterNgbDate(firstDate: NgbDate, secondDate: NgbDate): boolean {
    if (firstDate.year < secondDate.year) {
      return false;
    } else if (firstDate.year > secondDate.year) {
      return true;
    } else {
      if (firstDate.month < secondDate.month) {
        return false;
      } else if (firstDate.month > secondDate.month) {
        return true;
      } else {
        if (firstDate.day <= secondDate.day) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  /**
   * return true if firstDate is equal secondDate
   * @param firstDate
   * @param secondDate
   * @returns
   */
  compareEqualNgbDate(firstDate: NgbDate, secondDate: NgbDate): boolean {
    return (
      firstDate.year == secondDate.year &&
      firstDate.month == secondDate.month &&
      firstDate.day == secondDate.day
    );
  }

  isValidDateForm(dateString): boolean {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return false;
    }

    // Parse the date parts to integers
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    if (day > 0 && day <= monthLength[month - 1]) {
      return true;
    } else {
      return false;
    }
  }

  resetForm() {
    this._form.reset();
  }
}
