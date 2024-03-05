export const TONES = [
  'playful',
  'witty',
  'insperational',
  'sarcastic',
  'motivational',
  'humerous',
  'thought-provoking',
  'positive',
  'quirky',
  'empowering',
] as const;
export type TTones = (typeof TONES)[number];

export const LENGTHS = ['short', 'medium', 'long'] as const;
export type TLengths = (typeof LENGTHS)[number];

export const HASHTAGS = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const;
export type THashtags = (typeof HASHTAGS)[number];
