export function secondsIntime(timeSecs: number): string {
  const minutes = Math.trunc(timeSecs / 60);
  const seconds = timeSecs % 60;
  return `${minutes.toLocaleString('pt-BR', {
    minimumIntegerDigits: 2,
  })}:${seconds.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`;
}
