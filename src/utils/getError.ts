export function getError(error: Error | string | Record<string, string>, selector?: string): string {
    try {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        if (error?.message) {
            return error.message;
        }
        if (typeof error[selector as string] === 'string') {
            return error[selector as string];
        }
    } catch {
        return 'Something when wrong.';
    }
    return 'Something when wrong.';
}
