import { NgModule } from "@angular/core";
import {HttpModule} from "@angular/http";
import {FieldworkerService} from "./fieldworker.service";

@NgModule({
  imports: [HttpModule],
  providers: [FieldworkerService]
})

export class ServiceModule { }
