// Multiple classes
export function classes(...classes: (string | boolean | undefined)[]) {
    return classes.filter((className) => className).join(' ');
}

// copy to clipboard
export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(String(text));
    } catch (err) {
        console.log(err);
    }
};

// Get copied text from clipboard
export const getLastCopiedText = async (): Promise<string> => {
    try {
        if (!navigator.clipboard) {
            throw new Error('Clipboard API is not supported in this browser.');
        }
        const text = await navigator.clipboard.readText();
        return text;
    } catch (error) {
        console.error('Failed to read clipboard content:', error);
        return '';
    }
};
