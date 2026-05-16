function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function toDateTimeLocalValue(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Builds session id like `group-2026-05-15-02-39` from `datetime-local` value. */
export function sessionSlugFromDateTimeLocal(value: string): string {
  const [datePart, timePart = '12:00'] = value.split('T');
  const [h = '12', m = '00'] = timePart.slice(0, 5).split(':');
  return `group-${datePart}-${h}-${m}`;
}

/** Inverse of `sessionSlugFromDateTimeLocal`; maps legacy lunch/dinner/snack presets to a time on that day. */
export function dateTimeLocalFromSessionId(sessionId: string): string {
  const mHyphen = sessionId.match(/^group-(\d{4}-\d{2}-\d{2})-(\d{2})-(\d{2})$/);
  if (mHyphen) return `${mHyphen[1]}T${mHyphen[2]}:${mHyphen[3]}`;
  const mCompact = sessionId.match(/^group-(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})$/);
  if (mCompact) return `${mCompact[1]}T${mCompact[2]}:${mCompact[3]}`;
  const mLeg = sessionId.match(/^(lunch|dinner|snack)-(\d{4}-\d{2}-\d{2})$/);
  if (mLeg) {
    const h = mLeg[1] === 'dinner' ? '19' : mLeg[1] === 'snack' ? '16' : '12';
    return `${mLeg[2]}T${h}:00`;
  }
  return toDateTimeLocalValue(new Date());
}

export function defaultSessionId(): string {
  return sessionSlugFromDateTimeLocal(toDateTimeLocalValue(new Date()));
}
