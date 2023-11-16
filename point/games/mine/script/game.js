const weight = 15;
const height = 15;
const bom = 20;

let board_cells, check_cells;
let gameover = false;
let checked_count = 0;

function put_mines() {
    let x, y, mem, count;

    let board = [];
    let open_check = [];
    for (let i = 0; i < height; i ++) {
        board.push(new Array(weight).fill(0));
        open_check.push(new Array(weight).fill(false));
    }

    for (let _ = 0; _ < bom; _++) {
        x = Math.floor(Math.random() * weight);
        y = Math.floor(Math.random() * height);

        if (board[y][x] != -1) {
            board[y][x] = -1;
        } else {
            _--;
        }
    }

    for (y = 0; y < height; y++) {
        for (x = 0; x < weight; x++) {
            mem = board[y][x];
            if (mem == -1) continue;

            count = 0;
            for (let cy = -1; cy <= 1; cy++) {
                for (let cx = -1; cx <= 1; cx++) {
                    if (cx != 0 || cy != 0) {
                        console.log(x, y, cx, cy);
                        if (x + cx < weight &&
                            y + cy < height &&
                            x + cx >= 0 &&
                            y + cy >= 0 &&
                            board[y + cy][x + cx] == -1) count++;
                    }
                }
            }
            board[y][x] = count;
        }
    }
    return [board, open_check];
}

function output_board(board) {
    let output = "";
    let x, y;

    y = 0;
    board.forEach((line) => {
        x = 0;
        line.forEach((cell) => {
            if (check_cells[y][x]) {
                output += `<button class="button_for_mine white">${cell != -1 ? cell : "💣"}</button>`;
            } else {
                output += `<button class="button_for_mine black" onclick="open_cell(${x}, ${y});">　</button>`;
            }
            x++;
        });

        output += "<br>";
        y++;
    });

    $(".display").html(output);
    $(".status").text(`${checked_count} / ${weight * height - bom}`);
}

function gameover_action() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < weight; x++) {
            check_cells[y][x] = true;
        }
    }

    output_board(board_cells);
    $(".status").text("Game Over");
    create_point_code(Math.ceil(checked_count / (weight * height - bom) * 10));
    console.log(Math.ceil(checked_count / (weight * height - bom) * 10));
}

function open_cell(x, y) {
    if (gameover) return;

    check_cells[y][x] = true;
    checked_count++;
    if (board_cells[y][x] == -1) {
        gameover = true;
        gameover_action();
        return;
    }

    if (board_cells[y][x] == 0) {
        for (let cy = -1; cy <= 1; cy++) {
            for (let cx = -1; cx <= 1; cx++) {
                if (cx != 0 || cy != 0) {
                    console.log(x, y, cx, cy);
                    if (x + cx < weight &&
                        y + cy < height &&
                        x + cx >= 0 &&
                        y + cy >= 0 &&
                        check_cells[cy + y][cx + x] == false) open_cell(x + cx, y + cy);
                }
            }
        }
    } else {
        output_board(board_cells);
    }
}

function new_game() {
    [board_cells, check_cells] = put_mines();
    console.log(board_cells);
    output_board(board_cells);
}

$(function() {
    $(".button").click(new_game);
});