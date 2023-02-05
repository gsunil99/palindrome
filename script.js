var input = document.querySelector("#input-date");
var btn = document.querySelector("#btn-calculate");
var output = document.querySelector("#output");
var outputDaysDiff = document.querySelector("#output-days-diff");
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
btn.addEventListener("click", handleClick);
document.getElementById("google_consent").onclick = function(){
    google_translate_api();
    }
function handleClick() {
  output.style.display = "block";
  outputDaysDiff.style.display = "block";
  output.style.color = "white";

  if (input.value == ""){
    output.innerText = "🙄 please select a date 🙄";
  }
  else {
    var dateObj = getDateObj(input.value);
    var dateStr = getDateStr(dateObj);

    // for palindrome
    if (palindromeCheck(dateStr)) {
      output.style.color = "green";
      output.innerText = "🥳 yayy! it's a palindrome 🥳";
    } else {
      var [nextDateObj, days] = getNextPalindromeAndDays(dateObj);
      output.innerText = `✨ next nearest palindrome date is \n${nextDateObj.day}-${nextDateObj.month}-${nextDateObj.year} and you missed it by ${days} days ✨`;
    }

    // for difference between days
    var birthDate = getBirthday(input.value);
    var todaysDate = getToday();
    var hourNow = todaysDate.hours;
    var minsNow = todaysDate.minutes;
    var secsNow = todaysDate.seconds;

    var diffInDays = findDiffInDays(birthDate, todaysDate);

    console.log(diffInDays);

    var totalHours = diffInDays * 24 + hourNow;
    var totalMins = totalHours * 60 + minsNow;
    var totalSecs = totalMins * 60 + secsNow;
    var daysTillBirthday = findDaysTillBirthday(todaysDate, birthDate)

    if (daysTillBirthday == 365) {
      output.style.color = "green";
      output.innerText += "\n\n🥳 Happy Birthday 🥳"
    }

    if (diffInDays < 0) {
      output.style.display = "none";
      outputDaysDiff.innerText = "🤨 take birth and come here 🤨";
    } else {
      output.innerText += `\n\nYou are ${diffInDays} days old 👶\n\n${daysTillBirthday} days remaining for your next birthday 🍰 yayy!`;
      outputDaysDiff.innerText = `😮 ${totalHours} hours \n😲 ${totalMins} mins \n🤯 ${totalSecs} secs`;
    }
  } 
}

function getDateObj(str) {
  // given 2020-12-25 return {day:"25",month:"12",year:"2020"}
  var dateObj = {
    day: 00,
    month: 00,
    year: 0000,
  };
  var dateList = str.split("-");
  dateObj.day = dateList[2];
  dateObj.month = dateList[1];
  dateObj.year = dateList[0];

  return dateObj;
}

function getDateStr(dateObj) {
  //given {day:"1",month:"9",year:"2020"} it returns 01092020
  dateObj.day = get2DigitNumberStr(dateObj.day);
  dateObj.month = get2DigitNumberStr(dateObj.month);
  return dateObj.day + dateObj.month + dateObj.year;
}

function get2DigitNumberStr(number) {
  // given '9' return 09, given '10' returns 10
  number = Number(number);
  if (number < 10) {
    return "0" + number;
  }
  return number.toString();
}

function palindromeCheck(str) {
  // true if palindrome else false
  var reverse = str.split("").reverse().join("");

  return str === reverse;
}

function getNextDay(dateObj) {
  // given  {day: '08',month: '09',year: '2020'} returns {day: 9,month: 9,year: 2020}
  var nextDay = Number(dateObj.day) + 1;
  var month = Number(dateObj.month);
  var year = Number(dateObj.year);

  if (isLeap(year) && month == 2) {
    if (nextDay > 29) {
      nextDay = 1;
      month += 1;
    }
  } else {
    if (nextDay > monthDays[month - 1]) {
      nextDay = 1;
      month += 1;
    }
  }

  if (month > 12) {
    month = 1;
    year += 1;
  }

  var dateObj = {
    day: nextDay,
    month: month,
    year: year,
  };

  return dateObj;
}

function getNextPalindromeAndDays(dateObj) {
  var days = 0;
  while (1) {
    days += 1;
    var dateObj = getNextDay(dateObj);
    var nextDate = getDateStr(dateObj);

    if (palindromeCheck(nextDate)) {
      return [dateObj, days];
    }
  }
}

function isLeap(year) {
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    return true;
  } else {
    return false;
  }
}

function getToday() {
  var currentdate = new Date();
  return {
    day: currentdate.getDate(),
    month: currentdate.getMonth() + 1,
    year: currentdate.getFullYear(),
    hours: currentdate.getHours(),
    minutes: currentdate.getMinutes(),
    seconds: currentdate.getSeconds(),
  };
}

function getDateInNumberFormat(dateObj) {
  dateObj.day = Number(dateObj.day);
  dateObj.month = Number(dateObj.month);
  dateObj.year = Number(dateObj.year);

  return dateObj;
}

function getBirthday() {
  return getDateInNumberFormat(getDateObj(input.value));
}

function findDiffInDays(birthDate,todaysDate){
    //date string in mm/dd/yyyy
    var birthdateString = birthDate.month.toString()+"/"+birthDate.day.toString()+"/"+birthDate.year.toString();
    var todaydateString = todaysDate.month.toString()+"/"+todaysDate.day.toString()+"/"+todaysDate.year.toString();
    const birthdateType = new Date(birthdateString);
    const todaydateType = new Date(todaydateString);
    const diffTime = todaydateType - birthdateType;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}

function findDaysTillBirthday(todaysDate, birthday) {
  var nextBirthday = birthday;
    if(birthday.month < todaysDate.month) {
      nextBirthday.year = todaysDate.year + 1;
    }
    else if(birthday.month == todaysDate.month) {
      if(birthday.day > todaysDate.day) {
        nextBirthday.year  = todaysDate.year
      }
      else if (birthday.day <= todaysDate.day) {
        nextBirthday.year = todaysDate.year + 1;
      } 
    }
    else {
      nextBirthday.year  = todaysDate.year
    }
    return findDiffInDays(todaysDate, nextBirthday)
}
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }
function google_translate_api(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}
