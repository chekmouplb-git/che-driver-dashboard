/* Apps Script URLs — one per form */
export const APPS_SCRIPT_URLS: Record<string, string> = {
  driver:      process.env.NEXT_PUBLIC_SCRIPT_DRIVER      || 'https://script.google.com/macros/s/YOUR_DRIVER_SCRIPT_ID/exec',
  cleanliness: process.env.NEXT_PUBLIC_SCRIPT_CLEANLINESS || '',
  restroom:    process.env.NEXT_PUBLIC_SCRIPT_RESTROOM    || '',
};
