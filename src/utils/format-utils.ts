export function formatFileNameAsTitle(fileName: string): string {
    return fileName
        .replace(/\.[^/.]+$/, "") // Remove extension
        .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces between camelCase
        .replace(/\b\w/g, c => c.toUpperCase()); // Convert to title case
}