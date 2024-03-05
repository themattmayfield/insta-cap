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
