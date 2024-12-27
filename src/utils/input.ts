import * as fs from 'fs';
import Common from './common';
import Os from 'os';

export default class InputHelper {

  testmode = false;
  eol = Os.EOL;
  dblEol = Os.EOL + Os.EOL;

  constructor () {
    this.testmode = Common.testMode();
    console.log(Os.platform());
  }    

  getRawInput (name=(this.testmode ? "test" : "input")) {
    return fs.readFileSync(`./${name}.txt`, "utf-8");
  };
  getInput (separator = this.eol, name=(this.testmode ? "test" : "input")): string[] {
    const file = fs.readFileSync(`./${name}.txt`, "utf-8");
    return file.split(separator).map(x =>x);
  };
  
  getNumericInput (separator = this.eol) {
    return this.getInput(separator).map(x => parseInt(x));
  }; 
}