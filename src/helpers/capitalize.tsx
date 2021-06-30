export function capitalize(s: string) {
  if (s.length === 0) {
    return s
  }
  const firstCharCodePoint = s.codePointAt(0)!
  if (firstCharCodePoint >= 97 && firstCharCodePoint <= 122) {
    return s[0].toUpperCase() + s.substring(1)
  } else {
    return s
  }
}
