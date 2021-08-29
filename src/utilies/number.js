function toEnglishDigits(str) {
  const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
  const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
  const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  
  return str.split("").map(c => persianNumbers[englishNumbers.indexOf(c)] ||
      persianNumbers[arabicNumbers.indexOf(c)] || c).join("")
}

toEnglishDigits("۶٦۵any٥32") // "665any532"

export default toEnglishDigits;