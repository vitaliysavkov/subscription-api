import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export class Time {
  constructor(protected value: number) {}

  static now() {
    return new Time(dayjs().unix().valueOf());
  }

  static fromISOString(isoString: string) {
    return new Time(dayjs(isoString).unix());
  }

  static fromDate(date: Date) {
    return new Time(dayjs(date).unix());
  }

  static dateFromISOString(isoString: string): string {
    return dayjs(isoString).format('YYYY-MM-DD');
  }

  static timeFromISOString(isoString: string): string {
    return dayjs(isoString).format('HH:mm:ss');
  }

  isBefore(date: Time) {
    return dayjs(this.value).isBefore(dayjs(date.value));
  }

  isAfter(date: Time) {
    return dayjs(this.value).isAfter(dayjs(date.value));
  }

  addDays(days: number): Time {
    return new Time(dayjs.unix(this.value).add(days, 'day').unix());
  }

  addMinutes(minutes: number): Time {
    return new Time(dayjs.unix(this.value).add(minutes, 'minute').unix());
  }

  addSeconds(seconds: number): Time {
    return new Time(dayjs.unix(this.value).add(seconds, 'second').unix());
  }

  toISOString() {
    return dayjs.unix(this.value).utcOffset(0).format();
  }

  toDate() {
    return dayjs.unix(this.value).toDate();
  }

  diffInMs(time: Time): number {
    return dayjs.unix(this.value).diff(dayjs.unix(time.value), 'ms');
  }

  toUnixMs() {
    return dayjs.unix(this.value).valueOf();
  }

  toUnix() {
    return dayjs.unix(this.value).unix();
  }

  toPrettyDateTime() {
    return dayjs.unix(this.value).format('DD.MM.YY HH:mm');
  }

  toISOStringWithOffset(offset: number): string {
    return dayjs.unix(this.value).utcOffset(offset).format();
  }
}
