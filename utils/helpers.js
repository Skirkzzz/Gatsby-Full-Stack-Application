const TimeAgo = require("javascript-time-ago");

// English.
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-GB)");

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  recent_date: (date) => {
    // Format date as MM/DD/YYYY
    return timeAgo.format(date);
  },
  truncate_text: (text, length) => {
    // Truncate text to length

    if (text.length > length) {
      return text.substring(0, length) + "...";
    } else {
      return text;
    }
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
};
