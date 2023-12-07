let numbers = [];
for (let i = 0; i < 4; i++) {
    numbers[i] = new Array(4).fill(0);
}

let clear = false;
const empty_place = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];

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

    // Check the parity of the puzzle
    let inversions = 0;
    for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
            if (numbers[Math.floor(i / 4)][i % 4] && numbers[Math.floor(j / 4)][j % 4] && numbers[Math.floor(i / 4)][i % 4] > numbers[Math.floor(j / 4)][j % 4]) {
                inversions++;
            }
        }
    }

    // If the parity is odd, swap two numbers to make it even
    if (inversions % 2 == 1) {
        let i = 0, j = 1;
        if (numbers[0][0] != 0 && numbers[0][1] != 0) {
            [numbers[0][0], numbers[0][1]] = [numbers[0][1], numbers[0][0]];
        } else {
            [numbers[1][0], numbers[1][1]] = [numbers[1][1], numbers[1][0]];
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
                display.append("<button class='number_cell' id='cell_" + j + "_" + i + "' onclick='move_number(" + j + "," + i + ");'>　</button>");
            } else {
                display.append("<button class='number_cell' id='cell_" + j + "_" + i + "' onclick='move_number(" + j + "," + i + ");'>" + numbers[i][j] + "</button>");
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
    create_point_code(10);

    return;
}

function move_number(x, y) {
    if (clear) return;

    // Define the directions for adjacent cells
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let dir of directions) {
        let nx = x + dir[0];
        let ny = y + dir[1];

        // Check the boundaries
        if (nx >= 0 && ny >= 0 && nx < 4 && ny < 4) {
            if (numbers[ny][nx] == 0) {
                numbers[ny][nx] = numbers[y][x];
                numbers[y][x] = 0;
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