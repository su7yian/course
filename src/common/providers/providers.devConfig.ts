import {
Injectable
} from "@nestjs/common";
//any inejctable class looks like this declare it as provider in mdouel where you wnat it to inject 
// also unlike objects, classes do need injectable before them to become injectable. later they can be provided normally in constructor
@Injectable()
export class DevConfigService {
DBHOST = "localhost";
getDBHOST() {
return this.DBHOST;
}
}