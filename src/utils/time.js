export function millisToMinutesAndSeconds(ms) {
  const add0 = (num) => (num < 10 ? '0' + num : '' + num);
  const second = ms / 1000;
  const hour = Math.floor(second / 3600);
  const min = Math.floor((second - hour * 3600) / 60);
  const sec = Math.floor(second - hour * 3600 - min * 60);
  return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(":");
}
