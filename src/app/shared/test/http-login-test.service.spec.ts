// import { TestBed } from '@angular/core/testing';
// import {
//   MockBackend,
//   MockConnection
// } from '@angular/http/testing';

// import {
//   HttpModule, Http, XHRBackend, Response, ResponseOptions
// } from '@angular/http';
// import { of } from 'rxjs';

// import { HttpLoginTestService } from './http-login-test.service';

// describe('HttpLoginTestService', () => {

//   let backend: MockBackend;
//   let service: HttpLoginTestService;

//   beforeEach( () => {
//     TestBed.configureTestingModule({
//       imports: [ HttpModule ],
//       providers: [
//         HttpLoginTestService,
//         { provide: XHRBackend, useClass: MockBackend }
//       ]
//     });
//   });

//   it('can instantiate service via DI', () => {
//       service = TestBed.get(HttpLoginTestService);
//       expect(service instanceof HttpLoginTestService).toBe(true);
//   });

//   it('can instantiate service with "new"', () => {
//     const http = TestBed.get(Http);
//     expect(http).not.toBeNull('http should be provided');
//     let service = new HttpLoginTestService(http);
//     expect(service instanceof HttpLoginTestService).toBe(true, 'new service should be ok');
//   });

//   it('can provide the mockBackend as XHRBackend', () => {
//     const backend = TestBed.get(XHRBackend);
//     expect(backend).not.toBeNull('backend should be provided');
//   });

//   describe('when login', () => {
//     let http: Http;
//     let response: Response;

//     beforeEach(() => {

//       backend = TestBed.get(XHRBackend);
//       http = TestBed.get(Http);

//       service = new HttpLoginTestService(http);
//       let options = new ResponseOptions({status: 200});
//       response = new Response(options);
//     });
    
//   });

//   beforeEach(() => TestBed.configureTestingModule({}));

//   // it('should be created', () => {
//   //   const service: HttpLoginTestService = TestBed.get(HttpLoginTestService);
//   //   expect(service).toBeTruthy();
//   // });
// });
