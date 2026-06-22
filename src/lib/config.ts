export const APPS_SCRIPT_URLS: Record<string, string> = {
  driver:       process.env.NEXT_PUBLIC_SCRIPT_DRIVER       || 'https://script.google.com/macros/s/AKfycbwSDRdsGFTrhcPZmyfcJ_Uom2l6S1na9aYAIW-Ux9I063_D45gGA79d4Z3wUSczb0OJ/exec',
  satisfaction: process.env.NEXT_PUBLIC_SCRIPT_SATISFACTION || 'https://script.google.com/macros/s/AKfycbwGUyf5gLvQ6EOkt0qoBpPCMyOtTHjSFX2zb72QXWwNknzHGKUZam-Ttoz3zxINasaX/exec',
  cleanliness:  process.env.NEXT_PUBLIC_SCRIPT_CLEANLINESS  || '',
  restroom:     process.env.NEXT_PUBLIC_SCRIPT_RESTROOM     || '',
};
