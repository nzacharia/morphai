

export const LogLevels = [ "error", "info", "warning" ] as const

export type LogFunction = (message: string) => void
export type LogLevel = (typeof LogLevels)[number]

export type Log = {message: string, level: LogLevel,timestamp: Date}

export type LogCollector = {
    getAll(): Log[]
} & {
    [key in LogLevel]: LogFunction;
}
