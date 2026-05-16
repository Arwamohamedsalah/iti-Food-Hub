/** ITI Aswan branch — active training tracks. */
export const ASWAN_TRACKS = [
  '9 Month .NET',
  'UI/UX',
  '2D Graphics',
  'Frontend & Cross-Platform Mobile Application',
  'Social Media Marketing',
  'Software Engineering Fundamentals',
  'Full Stack Web Development - MEARN',
] as const;

export type AswanTrack = (typeof ASWAN_TRACKS)[number];
