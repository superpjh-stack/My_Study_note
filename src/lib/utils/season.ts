/**
 * 시즌 유틸리티 — 벚꽃 시즌 판별 및 인사 문구
 */

export function isCherryBlossomSeason(date = new Date()): boolean {
  return date.getMonth() === 3; // April = index 3
}

export function getSeasonGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return '🌸 좋은 아침이에요! 봄 학기 파이팅~';
  if (hour < 18) return '🌸 4월의 오후, 오늘도 잘 하고 있어요!';
  return '🌸 수고했어요! 내일도 벚꽃처럼 활짝 피어봐요';
}
