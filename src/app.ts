#!/usr/bin/env node
import { VowelsCounter } from 'vowels-counter';
import { readFileSync } from 'fs';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import readline from 'readline';

let readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const program = require('commander');
const packageInfo = require('../package.json');

export class VowelsCounterCli {
  vCounter: any;
  constructor() { 
    this.vCounter = new VowelsCounter();
  }

  // Initialization
  init() {
    clear();
    console.log(chalk.red(figlet.textSync('VowelsCounter', {horizontalLayout: 'full'})));
    program.version(`@VowelsCounter/cli: v${packageInfo.version}`).description(packageInfo.description)
    .option('-c, --console', 'Use the Console Program')
    .option('-f, --file <file>', 'Count vowels inside text file')
    .option('-wf, --wordfrase <word>', 'Count vowels inside a word or frase')
    .parse(process.argv);
    const options =  program.opts();
    if(options.console) {
      this.consoleOption();
    }

    if(options.file) {
      this.fileOption(options.file);
    }

    if(options.wordfrase) {
      this.wordFraseOption(options.wordfrase);
    }

    if(!process.argv.slice(2).length) {
      program.outputHelp();
    }
  }

  consoleOption() {
    console.clear();
    console.log('Bienvenido a Vowels Counter');
    console.log('Seleccione una opción');
    console.log('1- Contar Vocales');
    console.log('2- Salir');
    readLine.question('Opción: ', (input) => {
      switch(input.trim()) {
        case '1':
          this.vowelsCounterMenu();
          break;
        case '2':
          process.exit();
        default:
          this.consoleOption();
          break;
      }
    });
  }

  vowelsCounterMenu() {
    console.clear();
    console.log('Contador de Vocales');
    readLine.question('Ingrese Palabra: ', (input) => {
      console.log('Vocales Contadas');
      console.log(this.vCounter.vowelsCounter(input));
      console.log(' ');
      console.log('¿Desea Repetir?');
      console.log('1- Si');
      console.log('2- No');
      readLine.question('Opción: ', (input) => {
        switch(input.trim()) {
          case '1':
            this.vowelsCounterMenu();
            break;
          case '2':
            this.consoleOption();
            break;
          default:
            this.vowelsCounterMenu();
            break;
        }
      });
    });
  }

  fileOption(fileName: string) {
    const fileContent = readFileSync(`./${fileName}`, 'utf-8');
    const fileExtension = fileName.split('.').pop();
    clear();
    if(fileExtension === 'txt') {
      console.log(`El archivo ${fileName}, contiene: `);
      console.log(this.vCounter.vowelsCounter(fileContent));
    } else {
      console.log('Tipo de Archivo Invalido')
    }
  }

  wordFraseOption(wordFrase: string) {
    clear();
    console.log(`La Palabra ${wordFrase}, contiene: `);
    console.log(this.vCounter.vowelsCounter(wordFrase));
  }
}

const vc = new VowelsCounterCli();
vc.init();