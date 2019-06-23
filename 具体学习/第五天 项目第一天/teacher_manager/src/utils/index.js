
import request from './request.js';

const makeAge = function (timeStr) {
    let howAgo = new Date(timeStr);
    console.log(timeStr, howAgo)
    let now = new Date();

    let yearMinus = now.getFullYear() - howAgo.getFullYear();
    let monthMinus = now.getMonth() - howAgo.getMonth();
    let dateMinus = now.getDate() - howAgo.getDate();

    let msg;
    if (yearMinus != 0) {
        msg = yearMinus + '岁';
     } else if (monthMinus != 0) {
        msg = monthMinus + '个月';
     } else if (dateMinus != 0) {
        msg = dateMinus + '天的宝宝';
     }
     return msg;

}



export { 
    request,
    makeAge
}