import TinyText from '../helpers/tinyText';

export interface IZinzonConfig {
  zizFactor: number;
  tinyZizonChance: number;
  upperCaseChance: number;
}

export type EventName =
  | 'ZOUZED'
  | 'ZIZED'
  | 'ZINZURE'
  | 'ZINEDINED'
  | 'ZINI'
  | 'ZAZIE'
  | 'ZINZ'
  | 'TRIPLE_ZIZ'
  | 'QUADRUPLE_ZIZ'
  | 'PENTA_ZIZ'
  | 'ZAZED'
  | 'NADINED'
  | 'ALDINI'
  | 'ZIZI'
  | 'NAZI'
  | 'MINI'
  | 'CAPS';

export interface IEvent {
  name?: string;
  bonusPoints: number;
  multiplicator?: number;
}

export interface IProbs {
  type: string;
  p: number;
}

export interface IZinzonTypes {
  ZOUZED: IEvent;
  ZIZED: IEvent;
  ZINZURE: IEvent;
  ZINEDINED: IEvent;
  ZINI: IEvent;
  ZAZIE: IEvent;
  ZINZ: IEvent;
  TRIPLE_ZIZ: IEvent;
  QUADRUPLE_ZIZ: IEvent;
  PENTA_ZIZ: IEvent;
  ZAZED: IEvent;
  NADINED: IEvent;
  ALDINI: IEvent;
  ZIZI: IEvent;
  NAZI: IEvent;
  MINI: IEvent;
  CAPS: IEvent;
}

export interface IResult {
  zinzon: Zinzon;
  score: number;
  types: IZinzonTypes[];
}

export interface IUnityResult extends IResult {
  indexes: any;
}

export const zinzonConfig: IZinzonConfig = {
  zizFactor: 10, //the number of occurences of each ziz probs
  tinyZizonChance: 0.01, //1% chance of a tiny zizon roll
  upperCaseChance: 0.1, //10% chance of uppercase
};

export const zinzonsProbs: IProbs[] = [
  { type: 'zi', p: 1 },
  { type: 'za', p: 1 },
  { type: 'zé', p: 1 },
  { type: 'zo', p: 1 },
  { type: 'zu', p: 1 },

  { type: 'ni', p: 0.5 },
  { type: 'na', p: 0.5 },
  { type: 'né', p: 0.5 },
  { type: 'no', p: 0.5 },
  { type: 'nu', p: 0.5 },

  { type: 'di', p: 0.3 },
  { type: 'da', p: 0.3 },
  { type: 'dé', p: 0.3 },
  { type: 'do', p: 0.3 },
  { type: 'du', p: 0.3 },

  { type: 'dine', p: 0.1 },
  { type: 'dane', p: 0.1 },
  { type: 'dune', p: 0.1 },
];

export const zinzonTypes: IZinzonTypes = {
  ZOUZED: { name: 'zouzed', bonusPoints: 0 }, //zinzon with a score of 0
  ZIZED: { name: 'zized', bonusPoints: 0 }, //a zinzon that broke your personnal best
  ZINZURE: { name: 'zinzure', bonusPoints: 0 }, //a zinzon that broke the highest record
  ZINEDINED: { name: 'zinédined', bonusPoints: 6000 }, //a perfect zinzon ("Zinédine Zidane")
  ZINI: { name: 'zini', bonusPoints: 1500 }, //a perfect zinzon but without one or two uppercases
  ZAZIE: { name: 'zazie', bonusPoints: 350 }, //a zinzon containing "zazi"
  ZINZ: { name: 'zinz', bonusPoints: 1000 }, //half a perfect zinzon, containing "zinédine" or "zidane"
  TRIPLE_ZIZ: { name: 'triple ziz', bonusPoints: 400 }, //same ziz 3 times in a row
  QUADRUPLE_ZIZ: { name: 'quadruple ziz', bonusPoints: 850 }, //same ziz 4 times in a row
  PENTA_ZIZ: { name: 'penta ziz', bonusPoints: 1300 }, //same ziz 5 times in a row
  ZAZED: { name: 'zazed', bonusPoints: -50 }, //contains a zaz
  NADINED: { name: 'nadined', bonusPoints: -100 }, //contains a "nadine"
  ALDINI: { name: 'aldini', bonusPoints: 2750 }, //contains only "dine"s or "dane"s
  ZIZI: { name: 'zizi', bonusPoints: 175 }, //contains zizi
  NAZI: { name: 'nazi', bonusPoints: 66.6 }, //contains nazi
  MINI: { name: 'mini', bonusPoints: 0, multiplicator: 3 }, //a tiny zinzon
  CAPS: { name: 'caps locked', bonusPoints: 0, multiplicator: 1.25 }, //a set of caps
};

interface IZinZonParams {
  zinzonConfig: IZinzonConfig;
  zinzonsProbs: IProbs[];
  zinzonTypes: IZinzonTypes;
}

export class Zinzon {
  private tinyText: TinyText;
  private zinzons: string[];
  private zinzonTypes: IZinzonTypes;
  private zinzonsProbs: IProbs[];
  private tinyZizonChance: number;
  private goal: string;
  private cleanGoal: string;
  private tinyGoal: string;
  private upperCaseChance: number;

  constructor({ zinzonConfig, zinzonsProbs, zinzonTypes }: IZinZonParams) {
    if (!zinzonConfig) throw 'missing config !';
    if (!zinzonsProbs) throw 'missing zinzons probabilities array !';

    this.tinyText = new TinyText();
    this.zinzons = this.buildZizons(zinzonConfig, zinzonsProbs);
    this.zinzonTypes = zinzonTypes;
    this.zinzonsProbs = zinzonsProbs;
    this.tinyZizonChance = zinzonConfig.tinyZizonChance;
    this.goal = 'Zinédine Zidane';
    this.cleanGoal = this.cleanZinzon(this.goal);
    this.tinyGoal = this.tinyText.tiny(this.goal);
    this.upperCaseChance = zinzonConfig.upperCaseChance;
  }

  buildZizons(zinzonConfig, zinzonsProbs): string[] {
    const zinzons = [];
    zinzonsProbs.forEach((zz: IProbs) => {
      for (let i = 0; i < zz.p * zinzonConfig.zizFactor; ++i)
        zinzons.push(zz.type);
    });
    return zinzons;
  }

  getRandomZizon() {
    let zizIndex = Math.floor(Math.random() * this.zinzons.length);
    return this.zinzons[zizIndex];
  }

  getRandomZizonWithIndex() {
    let zizIndex = Math.floor(Math.random() * this.zinzons.length);
    return {
      zizon: this.zinzons[zizIndex],
      index: zizIndex,
    };
  }

  ziz(numberOfZizon) {
    const zizons = [];
    for (let i = 0; i < numberOfZizon; ++i) {
      zizons.push(this.getRandomZizon());
    }
    return zizons.join('');
  }

  zizWithIndexes(numberOfZizon): { ziz: string; indexes: number[] } {
    const zizons = [];
    const indexes = [];
    for (let i = 0; i < numberOfZizon; ++i) {
      const zizonWithIndex = this.getRandomZizonWithIndex();
      zizons.push(zizonWithIndex.zizon);
      indexes.push(
        this.zinzonsProbs.findIndex(zp => zp.type === zizonWithIndex.zizon),
      );
    }
    return {
      ziz: zizons.join(''),
      indexes,
    };
  }

  rollTwoZiz(): string {
    return `${this.ziz(3)} ${this.ziz(2)}`;
  }

  rollTwoZizWithIndexes() {
    const zizWithIndexes0 = this.zizWithIndexes(3);
    const zizWithIndexes1 = this.zizWithIndexes(2);
    return {
      zizs: `${zizWithIndexes0.ziz} ${zizWithIndexes1.ziz}`,
      indexes: zizWithIndexes0.indexes.concat(zizWithIndexes1.indexes),
    };
  }

  replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);

    return firstPart + replaceChar + lastPart;
  }

  zinzonne(): IResult {
    let capsBonus = false;
    let roll = this.rollTwoZiz();
    if (Math.random() < this.upperCaseChance) {
      roll = this.replaceChar(roll, roll[0].toUpperCase(), 0);
      roll = this.replaceChar(
        roll,
        roll.split(' ')[1][0].toUpperCase(),
        roll.split(' ')[0].length + 1,
      );
      capsBonus = true;
    }
    if (Math.random() < this.tinyZizonChance) roll = this.tinyText.tiny(roll);
    return this.computeZinzonScore(roll, capsBonus);
  }

  zinzonneWithIndexes(): IUnityResult {
    let capsBonus = false;
    let { zizs, indexes } = this.rollTwoZizWithIndexes();
    if (Math.random() < this.upperCaseChance) {
      zizs = this.replaceChar(zizs, zizs[0].toUpperCase(), 0);
      zizs = this.replaceChar(
        zizs,
        zizs.split(' ')[1][0].toUpperCase(),
        zizs.split(' ')[0].length + 1,
      );
      capsBonus = true;
    }
    if (Math.random() < this.tinyZizonChance) zizs = this.tinyText.tiny(zizs);
    return {
      ...this.computeZinzonScore(zizs, capsBonus),
      indexes,
    };
  }

  computeZinzonScore(zinzon, capsBonus = false): IResult {
    let result: IResult = {
      zinzon,
      score: this.getSimilarityScore(zinzon),
      types: [],
    };
    if (!zinzon) return result;
    if (typeof zinzon !== 'string') return result;

    if (capsBonus) result = this.updateResult(result, 'CAPS');

    result = this.checkZinedined(zinzon, result);
    result = this.checkZini(this.cleanZinzon(zinzon), result);
    result = this.checkZinz(this.cleanZinzon(zinzon), result);
    result = this.checkZizi(this.cleanZinzon(zinzon), result);
    result = this.checkNazi(this.cleanZinzon(zinzon), result);
    result = this.checkRecurringZiz(this.cleanZinzon(zinzon), result);
    result = this.checkAldini(this.cleanZinzon(zinzon), result);
    result = this.checkZazie(this.cleanZinzon(zinzon), result);

    result = this.checkZazed(this.cleanZinzon(zinzon), result);
    result = this.checkNadined(this.cleanZinzon(zinzon), result);

    result = this.checkMini(zinzon, result);
    return result;
  }

  cleanZinzon(zinzon): string {
    return this.tinyText.normalSize(zinzon.toLowerCase());
  }

  updateResult(result, zinzonType: EventName): IResult {
    if (!this.zinzonTypes[zinzonType]) return result;
    if (typeof this.zinzonTypes[zinzonType].bonusPoints === 'number') {
      result.score += this.zinzonTypes[zinzonType].bonusPoints;
    }

    if (typeof this.zinzonTypes[zinzonType].multiplicator === 'number') {
      result.score *= this.zinzonTypes[zinzonType].multiplicator;
    }

    result.types.push(this.zinzonTypes[zinzonType].name);
    if (this.zinzonTypes[zinzonType].name === 't') {
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////

  stringsSimilarity(a, b): number {
    let similarity = 0;

    for (let i = 0; i < Math.min(a.length, b.length); ++i) {
      if (a[i] === b[i]) similarity++;
    }

    return Math.floor((similarity / Math.max(a.length, b.length)) * 100);
  }

  getSimilarityScore(zinzon): number {
    if (!zinzon) return 0;
    if (typeof zinzon !== 'string') return 0;

    const cleanGoalLeft = this.cleanGoal.split(' ')[0].trim();
    const cleanGoalRight = this.cleanGoal.split(' ')[1].trim();
    const tinyGoalLeft = this.tinyGoal.split(' ')[0].trim();
    const tinyGoalRight = this.tinyGoal.split(' ')[1].trim();
    const zinzonLeft = zinzon.split(' ')[0].trim();
    const zinzonRight = zinzon.split(' ')[1].trim();
    const cleanZinzonLeft = this.cleanZinzon(zinzonLeft);
    const cleanZinzonRight = this.cleanZinzon(zinzonRight);

    if (this.tinyText.hasTinyness(zinzon))
      return (
        (this.stringsSimilarity(zinzonLeft, tinyGoalLeft) +
          this.stringsSimilarity(zinzonRight, tinyGoalRight)) /
        2
      );

    return (
      (this.stringsSimilarity(cleanZinzonLeft, cleanGoalLeft) +
        this.stringsSimilarity(cleanZinzonRight, cleanGoalRight)) /
      2
    );
  }

  checkMini(zinzon, result): IResult {
    if (this.tinyText.hasTinyness(zinzon))
      result = this.updateResult(result, 'MINI');
    return result;
  }

  checkZinedined(zinzon, result): IResult {
    if (zinzon === this.goal || zinzon === this.tinyText.tiny(this.goal))
      result = this.updateResult(result, 'ZINEDINED');
    return result;
  }

  checkZini(zinzon, result): IResult {
    const zinedine = zinzon.split(' ')[0].trim();
    const zidane = zinzon.split(' ')[1].trim();

    if (zinedine.includes('zinédine'))
      result = this.updateResult(result, 'ZINI');

    if (zinedine.includes('zinedine'))
      result = this.updateResult(result, 'ZINI');

    if (zidane.includes('zidane')) result = this.updateResult(result, 'ZINI');

    return result;
  }

  checkZinz(zinzon, result): IResult {
    if (zinzon.includes('zinédine') || zinzon.includes('zidane'))
      result = this.updateResult(result, 'ZINZ');

    return result;
  }

  checkZizi(zinzon, result): IResult {
    const nbOfZizi = this.countZaz(zinzon, 'zizi');

    for (let i = 0; i < nbOfZizi; ++i)
      result = this.updateResult(result, 'ZIZI');

    return result;
  }

  checkNazi(zinzon, result): IResult {
    const nbOfNazi = this.countZaz(zinzon, 'nazi');

    for (let i = 0; i < nbOfNazi; ++i)
      result = this.updateResult(result, 'NAZI');

    return result;
  }

  countZaz(zinzon, wordZiz = 'zaz'): number {
    const trimedZizon = zinzon.replace(' ', '');

    let countZ = 0;
    let foundZaz;
    for (let i = 0; i <= trimedZizon.length - wordZiz.length; i++) {
      foundZaz = false;
      for (let j = 0; j < wordZiz.length; j++) {
        if (trimedZizon[i + j].toUpperCase() === wordZiz[j].toUpperCase()) {
          foundZaz = true;
        } else {
          foundZaz = false;
          break;
        }
      }
      if (foundZaz) countZ++;
    }
    return countZ;
  }

  checkZazed(zinzon, result): IResult {
    const nbOfZaz = this.countZaz(zinzon);

    for (let i = 0; i < nbOfZaz; ++i)
      result = this.updateResult(result, 'ZAZED');

    return result;
  }

  checkZazie(zinzon, result): IResult {
    const nbOfZaz = this.countZaz(zinzon, 'zazi');

    for (let i = 0; i < nbOfZaz; ++i)
      result = this.updateResult(result, 'ZAZIE');

    return result;
  }

  countZiz(zinzon, ziz): number {
    const regex = new RegExp(`(^|${ziz}| )+(${ziz})+`, 'g');
    const matches = zinzon.match(regex) || [''];
    const bestMatch = matches.sort((a, b) => b.length - a.length)[0];
    return bestMatch.trim().split(ziz).length - 1;
  }

  checkRecurringZiz(zinzon, result): IResult {
    let bestAmount = 0;

    this.zinzonsProbs.forEach(zt => {
      const ziz = zt.type;
      const count = this.countZiz(zinzon, ziz);
      if (count > bestAmount) bestAmount = count;
    });

    if (bestAmount === 3) result = this.updateResult(result, 'TRIPLE_ZIZ');
    else if (bestAmount === 4)
      result = this.updateResult(result, 'QUADRUPLE_ZIZ');
    else if (bestAmount === 5) result = this.updateResult(result, 'PENTA_ZIZ');

    return result;
  }

  checkNadined(zinzon, result): IResult {
    const nbOfZaz = this.countZaz(zinzon, 'nadine');

    for (let i = 0; i < nbOfZaz; ++i)
      result = this.updateResult(result, 'NADINED');

    return result;
  }

  checkAldini(zinzon, result): IResult {
    const dineCount = (zinzon.match(/dine/g) || []).length;
    const daneCount = (zinzon.match(/dane/g) || []).length;
    const duneCount = (zinzon.match(/dune/g) || []).length;

    if (dineCount + daneCount + duneCount >= 5)
      result = this.updateResult(result, 'ALDINI');

    return result;
  }
}

module.exports = { Zinzon, zinzonConfig, zinzonsProbs, zinzonTypes };
