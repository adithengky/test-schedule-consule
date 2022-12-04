import moment from 'moment';

export const addMinutes = (time, minsToAdd) => {
    function D(J){ return (J<10? '0':'') + J;};
    var piece = time.split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;
  
    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
} 

// export const getNextDayOfWeek = (date) => {
//     var start = moment(start), // Sept. 1st
//     end   = moment(), // Nov. 2nd
//     day   = 0;                    // Sunday

//     var result = [];
//     var current = start.clone();

//     while (current.day(7 + day).isBefore(end)) {
//         result.push(current.clone());
//     }
// }
