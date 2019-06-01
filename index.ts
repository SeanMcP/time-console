const dayjs = require('dayjs');
const chalk = require('chalk');

const defaultFormat: string = 'HH:mm:ss.SSS';

function getTime(format = defaultFormat): string {
    return dayjs().format(format);
}

enum ConsoleMethod {
    error = 'error',
    info = 'info',
    log = 'log',
    warn = 'warn'
}

const consoleMethodChalkColorMap = {
    [ConsoleMethod.error]: 'red',
    [ConsoleMethod.info]: 'cyan',
    [ConsoleMethod.log]: 'gray',
    [ConsoleMethod.warn]: 'yellow'
}

function consoleFactory(method: ConsoleMethod, format: string): Function {
    return function (message: string): void {
        console[method](chalk[consoleMethodChalkColorMap[method]](`[${getTime(format)}] ${message}`))
    }
}

type Libary = {
    error: Function,
    info: Function,
    log: Function,
    warn: Function
}

function factory(format: string): Libary {
    return {
        error: consoleFactory(ConsoleMethod.error, format),
        info: consoleFactory(ConsoleMethod.info, format),
        log: consoleFactory(ConsoleMethod.log, format),
        warn: consoleFactory(ConsoleMethod.warn, format),
    }
}

module.exports = factory;