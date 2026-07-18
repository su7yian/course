import { Inject, Injectable } from "@nestjs/common";
import { DevConfigService } from "./common/providers/providers.devConfig.js";

// both the class taking injected class and the inejcted class must use injectbale decorator for contolelr its not neede dcause the contorller decorator does this for us...
@Injectable()
export class AppService {
constructor(private devConfigService: DevConfigService,
@Inject("CONFIG")
private config: {
port: string
}){
    console.log(this.config);
    console.log(this.devConfigService.getDBHOST())

}

}