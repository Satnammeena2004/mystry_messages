export function formatTime(seconds: number) {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  let remainingSeconds: string | number = seconds % 60;

  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return minutes + "m:" + remainingSeconds;
}


