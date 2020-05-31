import dataTranslate from './data/translate.data.js';

class LocalDate {
  constructor({ currentDay, currentTime, futureWeekdays }) {
    this.currentDay = currentDay;
    this.currentTime = currentTime;
    this.futureWeekdays = futureWeekdays;
    this.locales = 'en-GB';
    this.timeZone = null;
    this.language = 'en';
    this.weekdayKeys = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.weekdayFormat = {
      short: 'shortWeekday',
      long: 'longWeekday',
    };
    this.newDayTime = '00:00:00';
  }

  setTime() {
    const time = new Date().toLocaleString(this.locales, {
      hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: this.timeZone,
    });
    this.currentTime.textContent = time;
    if (time === this.newDayTime) {
      this.setDay();
      this.setFutureWeekdays();
    }
  }

  setDay() {
    const date = new Date();

    const weekday = this.getWeekday(date, this.weekdayFormat.short);

    const day = date.toLocaleString(this.locales, { day: 'numeric', timeZone: this.timeZone });

    const monthNumber = date.toLocaleString(this.locales, { month: 'numeric', timeZone: this.timeZone }) - 1;
    const month = dataTranslate.month[this.language][monthNumber];

    this.currentDay.textContent = `${weekday} ${day} ${month}`;
  }

  setFutureWeekdays() {
    const date = new Date();

    this.futureWeekdays.forEach((item) => {
      const dayContainer = item;
      date.setDate(date.getDate() + 1);
      const weekday = this.getWeekday(date, this.weekdayFormat.long);
      dayContainer.textContent = weekday;
    });
  }

  getWeekday(date, formatDay) {
    const weekday = date.toLocaleString(this.locales, { weekday: 'long', timeZone: this.timeZone });
    const weekdayNumber = this.weekdayKeys.indexOf(weekday);
    return dataTranslate[formatDay][this.language][weekdayNumber];
  }
}

export default LocalDate;
