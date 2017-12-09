import { NgModule } from "@angular/core";
import {HttpModule} from "@angular/http";
import {FieldworkerService} from "./fieldworker.service";
import {LocationService} from "./location.service";

@NgModule({
  imports: [HttpModule],
  providers: [FieldworkerService, LocationService]
})

export class ServiceModule { }
