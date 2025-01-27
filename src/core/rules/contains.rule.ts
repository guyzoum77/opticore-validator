import {ContainsOptionsInterface} from "../interfaces/containsOptions.interface";

export function containsRule(value: any, seed: string, options?: ContainsOptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: ContainsOptionsInterface = {
        ignoreCase: options?.ignoreCase || false,
        minOccurrences: options?.minOccurrences || 1,
    };

    const { ignoreCase, minOccurrences } = defaultOptions;

    let source: string = value;
    let target: string = seed;

    if (ignoreCase) {
        source = source.toLowerCase();
        target = target.toLowerCase();
    }

    const occurrences: number = source.split(target).length - 1;
    return occurrences >= minOccurrences;
}
  