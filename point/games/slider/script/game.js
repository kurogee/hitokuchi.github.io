let numbers = [];
for (let i = 0; i < 4; i++) {
    numbers[i] = new Array(4).fill(0);
}

let clear = false;
const empty_place = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];

const solvabled = arr => {
  const SPACE = "0"
  const DEST_ARR = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", SPACE]
  const SIZE = Math.floor(Math.sqrt(DEST_ARR.length))

  const point = index =>({x:index % SIZE, y:Math.floor(index / SIZE)})

  const DEST_POINT = point(DEST_ARR.length-1)

  const correctToSolvable = arr =>
    isSolvable(arr) ? arr
    : [0,1].includes(arr.indexOf(SPACE)) ? exchanged(2)(3)(arr)
    : exchanged(0)(1)(arr)

  const isSolvable =  arr =>
    exchangeParity(arr) === spaceMovementParity(arr) 

  const spaceMovementParity =  arr => 
    distance(DEST_POINT)(point(arr.indexOf(SPACE))) % 2

  const distance = a => b => Math.abs( a.x - b.x ) + Math.abs(a.y - b.y)

  const exchangeParity = arr =>
    arr.reduce(updateEP, {array:arr, parity:0}).parity

  const updateEP = ({array, parity}, e, i) => 
    array[i] === DEST_ARR[i] ? {array, parity}
    : {array:exchanged(i)(array.indexOf(DEST_ARR[i]))(array)
       ,  parity:parity?0:1}
  const exchanged = i => j => arr =>{
    const array = [...arr];
    [array[i], array[j]] = [array[j], array[i]]
    return array
  }

  return correctToSolvable(arr)
}

// 一次元配列に戻す関数
const flatten = arr => arr.reduce((acc, val) => acc.concat(val), []);

// 一次元配列を二次元配列に戻す関数
const unflatten = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

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
    numbers = unflatten(solvabled(flatten(numbers)).map(Number), 4);
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
    create_point_code(15);

    return;
}

function move_number(x, y) {
    if (clear) return;

    for (let i = -1; i <= y + 1; i++) {
        for (let j = -1; j <= x + 1; j++) {
            if (i + y > 3 || i + y < 0 || j + x > 3 || j + x < 0) continue;
            if (i != 0 && j != 0) {
                continue;
            } else {
                if (numbers[i + y][j + x] == 0) {
                    numbers[i + y][j + x] = numbers[y][x];
                    numbers[y][x] = 0;
                    put_number();
                    check_clear();
                    return;
                }
            }
        }
    }
}

function new_game() {
    set_number();
    put_number();
}