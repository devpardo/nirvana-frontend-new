import Vue from "vue"

function dateFilter (date, formatString) {
  if (!date) return ""
  if (typeof date === "string") date = new Date(date)

  formatString = formatString || "yyyy-MM-dd HH:mm:ss"

  var dateMap = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }

  for (var key in dateMap) {
    let value = dateMap[key]
    value = value < 10 ? `0${value}` : value
    dateMap[key] = value.toString()
  }

  const { year, month, day, hour, minutes, seconds } = dateMap

  const formatDate = formatString
    .replace(/y+/, ($0) => (year.substring(year.length, -$0.length)))
    .replace(/M+/, () => month)
    .replace(/d+/, () => day)
    .replace(/H+/, () => hour)
    .replace(/h+/, () => hour % 12 === 0 ? 12 : hour % 12)
    .replace(/m+/, () => minutes)
    .replace(/s+/, () => seconds)

  return formatDate
}

Vue.filter("date", dateFilter)

export { dateFilter }
