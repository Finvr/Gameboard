(function(){

  angular.module('imgame.datetime', ['scDateTime'])
//   .value('scDateTimeConfig', {
//     defaultTheme: 'material',
//     autosave: false,
//     defaultMode: 'date',
//     defaultDate: undefined, //should be date object!!
//     displayMode: undefined,
//     defaultOrientation: false,
//     displayTwentyfour: false,
//     compact: false
// })
    .value('scDateTimeI18n', {
      previousMonth: "Previous Month",
      nextMonth: "Next Month",
      incrementHours: "Increment Hours",
      decrementHours: "Decrement Hours",
      incrementMinutes: "Increment Minutes",
      decrementMinutes: "Decrement Minutes",
      switchAmPm: "Switch AM/PM",
      now: "Now",
      cancel: "Cancel",
      save: "Save",
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      switchTo: 'Switch to',
      clock: 'Clock',
      calendar: 'Calendar'
    });
    
})();
