let numbers = [];
for (let i = 0; i < 4; i++) {
    numbers[i] = new Array(4).fill(0);
}
console.log(numbers);

let clear = false;
const empty_place = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];

/*function set_number_answer() {
    let count = 1;

    for (let i = 0; i < numbers[0].length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            numbers[i][j] = count;
            count++;
            if (i == 3 && j == 3) {
                numbers[i][j] = 0;
            }
        }
    }
    console.log(numbers);
}*/

function set_number() {
    let reminder_numbers = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15".split(",").map(Number);
    let x = 0;

    for (let i = 0; i < numbers[0].length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            if (i == empty_place[0] && j == empty_place[1]) {
                numbers[i][j] = 0;
                continue;
            }

            x = Math.floor(Math.random() * reminder_numbers.length);
            numbers[i][j] = reminder_numbers[x];
            reminder_numbers.splice(x, 1);
        }
    }
    console.log(numbers);
}

function put_number() {
    let display = $(".display");
    display.empty();
    for (let i = 0; i < numbers[0].length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            if (numbers[i][j] == 0) {
                display.append("<button class='number_cell' id='cell_" + i + "_" + j + "' onclick='move_number(" + i + "," + j + ");'>　</button>");
            } else {
                display.append("<button class='number_cell' id='cell_" + i + "_" + j + "' onclick='move_number(" + i + "," + j + ");'>" + numbers[i][j] + "</button>");
            }
        }
        display.append("<br>");
    }
}

function check_clear() {
    let count = 1;
    for (let i = 0; i < numbers[0].length; i++) {
        for (let j = 0; j < numbers[i].length; j++) {
            if (i == 3 && j == 3) break;

            if (numbers[i][j] != count) {
                return false;
            } else {
                count++;
            }
        }
    }
    clear = true;
    $(".status").text("クリア！");
    create_point_code(20);

    return;
}

function move_number(x, y) {
    if (clear) return;

    for (let i = -1; i <= y + 1; i++) {
        for (let j = -2; j <= x + 1; j++) {
            if (i + x > 3 || i + x < 0 || j + y > 3 || j + y < 0) continue;
            if (i != 0 && j != 0) continue;

            if (numbers[i + x][j + y] == 0) {
                numbers[i + x][j + y] = numbers[x][y];
                numbers[x][y] = 0;
                put_number();
                check_clear();
                return;
            }
        }
    }
}

function new_game() {
    set_number();
    put_number();
}