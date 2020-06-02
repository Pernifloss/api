import {Injectable} from '@nestjs/common';
import {IResult, Zinzon, zinzonConfig, zinzonsProbs, zinzonTypes} from "./zinzon";

@Injectable()
export class ZinzonService {

    zinzonne(): IResult {
        const zinzon: Zinzon = new Zinzon({zinzonConfig, zinzonsProbs, zinzonTypes});
        return zinzon.zinzonne();

    }
}
