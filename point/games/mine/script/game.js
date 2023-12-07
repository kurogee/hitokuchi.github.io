const weight = 15;
const height = 15;
const bom = 20;

let board_cells, check_cells, flag_checked_map;
let gameover = false;
let checked_count = 0;

function put_mines() {
    let x, y, mem, count;

    let board = [];
    let open_check = [];

    flag_checked_map = [];
    for (let i = 0; i < height; i ++) {
        board.push(new Array(weight).fill(0));
        flag_checked_map.push(new Array(weight).fill(false));
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
    let x, y;
    let display = $(".display");
    let html = "";

    y = 0;
    board.forEach((line) => {
        x = 0;
        line.forEach((cell) => {
            if (check_cells[y][x]) {
                html += `<button class="button_for_mine white" value="${x},${y}">${cell == -1 ? "💣" : cell == 0 ? "　" : cell}</button>`;
            } else {
                html += `<button class="button_for_mine black" value="${x},${y}">${flag_checked_map[y][x] ? "🚩" : "　"}</button>`;
            }
            x++;
        });

        html += "<br>";
        y++;
    });

    display.html(html);
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
    // create_point_code(Math.ceil(checked_count / (weight * height - bom) * 10));
    // console.log(Math.ceil(checked_count / (weight * height - bom) * 10));
}

function open_cell(x, y) {
    if (gameover || check_cells[y][x] || flag_checked_map[y][x]) return;

    let queue = [{x: x, y: y}];

    while (queue.length > 0) {
        let cell = queue.shift();
        let x = cell.x;
        let y = cell.y;

        if (check_cells[y][x]) continue;
        if (check_cells[y][x] == false && board_cells[y][x] == -1) {
            gameover = true;
            gameover_action();
            return;
        }

        console.log(check_cells[y][x]);
        check_cells[y][x] = true;
        checked_count++;

        if (checked_count >= weight * height - bom) {
            gameover = true;
            $(".status").text("Game Clear");
            create_point_code(15);
            return;
        }

        if (board_cells[y][x] == 0) {
            for (let cy = -1; cy <= 1; cy++) {
                for (let cx = -1; cx <= 1; cx++) {
                    // Skip the current cell
                    if (cx == 0 && cy == 0) continue;

                    let nx = x + cx;
                    let ny = y + cy;

                    // Check the boundaries first to avoid unnecessary calculations
                    if (nx >= 0 && ny >= 0 && nx < weight && ny < height) {
                        if (!check_cells[ny][nx] && !flag_checked_map[ny][nx]) {
                            queue.push({x: nx, y: ny});
                        }
                    }
                }
            }
        }
    }

    output_board(board_cells);
}

function put_checkmark_to_mine(x, y) {
    if (gameover || check_cells[y][x]) return;

    console.log(flag_checked_map[y][x]);
    flag_checked_map[y][x] = !flag_checked_map[y][x];

    output_board(board_cells);
}

function new_game() {
    [board_cells, check_cells] = put_mines();
    console.log(board_cells);
    output_board(board_cells);

    return false;
}

$(function() {
    $(".button").click(new_game);

    $(document).on("contextmenu", ".button_for_mine", function(e) {
        e.preventDefault();

        let [x, y] = $(this).val().split(",").map((v) => parseInt(v));
        put_checkmark_to_mine(x, y);

        return false;
    });

    $(document).on("click", ".button_for_mine", function() {
        let [x, y] = $(this).val().split(",").map((v) => parseInt(v));
        open_cell(x, y);
    });
});