// IMPORT MOMENT LIBRARY
var moment = require("moment");


var users = [];

const fillDummyUsers = () => {
    for (let i = 0; i < 100; i++) {
        let user = {
            name: `name ${i}`,
            password: "pwd " + i,
            grad: randomInt(50, 100),
            dob: moment().format("YYYY-MMMM-DD HH:mm:SS"),
        }
        users.push(user);
    }
}

const readUser = () => {
    for (const user of users) {
        console.log(user.name, user.password, user.dob, user.grad);
    }
}



const randomInt = (min, max) => {
    let num = Math.floor(
        Math.random() * (max - min + 1) + min);
    return num;
}
const gradeCharacter = () => {
    let countA = 0;
    let countB = 0;
    let countC = 0;
    let countD = 0;
    let countF = 0;
    for (const user of users) {
        if (user.grad > 90)
            countA++;
        else if (user.grad > 80)
            countB++;
        else if (user.grad > 70)
            countC++;
        else if (user.grad > 60)
            countD++;
        else
            countF++;
    }
    console.log(`count A: ${countA}, B:${countB}, C:${countC}, D:${countD}, F:${countF}`);
}

fillDummyUsers();
readUser();
gradeCharacter();