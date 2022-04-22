export function gettimeInSeconds(timeString: string): number {
  const timeArray = timeString.split(':');
  const seconds = Number(timeArray[0]) * 60 + Number(timeArray[1]);
  console.log(seconds);
  return seconds;
}
