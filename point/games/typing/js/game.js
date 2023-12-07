

const words = [
    ["I am a student.", "私は学生です。"],
    ["This is a pen.", "これはペンです。"],
    ["That is a book.", "あれは本です。"],
    ["Are you from America?", "あなたはアメリカ出身ですか？"],
    ["Yes, I am.", "はい、そうです。"],
    ["No, I am not.", "いいえ、違います。"],
    ["Is that sushi restaurant?", "あれは寿司屋ですか？"],
    ["Yes, it is.", "はい、そうです。"],
    ["No, it's not.", "いいえ、違います。"],
    ["What food do you like?", "あなたはどんな食べ物が好きですか？"],
    ["I like sushi.", "私は寿司が好きです。"],
    ["I don't like sushi.", "私は寿司が好きではありません。"],
    ["What is your favorite food?", "あなたの好きな食べ物は何ですか？"],
    ["My favorite food is sushi.", "私の好きな食べ物は寿司です。"],
    ["When is your birthday?", "あなたの誕生日はいつですか？"],
    ["My birthday is January 1st.", "私の誕生日は1月1日です。"],
    ["Where do you practice English?", "あなたはどこで英語を練習しますか？"],
    ["I practice English at home.", "私は家で英語を練習します。"],
    ["How do you come to school?", "あなたはどうやって学校に来ますか？"],
    ["By bus.", "バスで。"],
    ["On foot.", "歩いて。"],
    ["By car.", "車で。"],
    ["How are you?", "お元気ですか？"],
    ["I'm fine, thank you.", "はい、元気です。"],
    ["How about you?", "あなたはどうですか？"],
    ["Whose pen is that?", "あれは誰のペンですか？"],
    ["It's mine.", "私のです。"],
    ["I don't know.", "わかりません。"],
    ["It's not mine.", "私のではありません。"],
    ["Is it yours?", "それはあなたのですか？"],
    ["We had a great time.", "私たちは楽しい時間を過ごしました。"],
    ["I'm sorry to hear that.", "それは聞いて悲しいです。"],
    ["I'm happy to see that.", "それを見て嬉しいです。"],
    ["I'm glad to hear that.", "それを聞いて嬉しいです。"],
    ["I bought some eggs to make a cake.", "私はケーキを作るために卵を買いました。"],
    ["Why do you ask?", "なぜ聞くのですか？"],
    ["Could you tell me way to the station?", "駅への道を教えていただけますか？"],
    ["It is important to use AI effectively.", "AIを効果的に使うことは重要です。"],
    ["May I ask you a favor?", "お願いがあるのですが。"],
    ["Of course do it.", "もちろんやってください。"],
    ["Be quiet.", "静かにしてください。"],
    ["Don't be silly.", "ばかなことをするな。"],
    ["Don't run in the hallway.", "廊下で走らないでください。"],
    ["Don't forget to ask him about it.", "それについて彼に尋ねるのを忘れないでください。"],
    ["AI will take our jobs away.", "AIは私たちの仕事を奪うでしょう。"],
    ["It will be sunny tomorrow.", "明日は晴れるでしょう。"],
    ["You have to do your homework.", "あなたは宿題をしなければなりません。"],
    ["You don't have to help us.", "あなたは私たちを助ける必要はありません。"],
    ["You must come to our home by eight.", "あなたは8時までに私たちの家に来なければなりません。"],
    ["You mustn't go out alone at night.", "夜中に一人で外出してはいけません。"],
    ["We'll take you there by car.", "私たちは車であなたをそこに連れて行きます。"],
    ["I'll show you my picture of my trip.", "私はあなたに私の旅行の写真を見せます。"],
    ["Show me your passport, please.", "あなたのパスポートを見せてください。"],
    ["My grandmother gave me a present.", "祖母は私にプレゼントをくれました。"],
    ["I gave him a book.", "私は彼に本をあげました。"],
    ["People call it Singapore Flyer.", "人々はそれをシンガポールフライヤーと呼んでいます。"],
    ["I call him John.", "私は彼をジョンと呼んでいます。"],
    ["My mother named me Shohei after Shohei Otani.", "私の母は私を大谷翔平にちなんで翔平と名付けました。"],
    ["I have many things to do.", "私にはやることがたくさんあります。"],
    ["I have a lot of things to study.", "私は勉強することがたくさんあります。"],
    ["Have you been to Tokyo?", "あなたは東京に行ったことがありますか？"],
    ["I have never been to Tokyo.", "私は東京に行ったことがありません。"],
    ["Do you have any pets?", "あなたはペットを飼っていますか？"],
    ["I have a dog.", "私は犬を飼っています。"],
    ["I have two cats.", "私は猫を2匹飼っています。"],
    ["Yes, I do.", "はい、そうです。"],
    ["No, I don't.", "いいえ、違います。"],
    ["Did you have a good time?", "楽しい時間を過ごしましたか？"],
    ["Yes, I did.", "はい、そうです。"],
    ["No, I didn't.", "いいえ、違います。"],
    ["The air conditioner doesn't work.", "エアコンが動きません。"],
    ["I apologize for the trouble.", "ご迷惑をおかけして申し訳ありません。"],
    ["The people the next door are too noisy.", "隣の人たちはうるさいです。"],
    ["Were there any stores near your house?", "あなたの家の近くに店はありましたか？"],
    ["Yes, there were.", "はい、そうでした。"],
    ["No, there weren't.", "いいえ、そうではありませんでした。"],
    ["Was it fun?", "楽しかったですか？"],
    ["Yes, it was.", "はい、そうでした。"],
    ["No, it wasn't.", "いいえ、そうではありませんでした。"],
    ["Were you at home yesterday?", "あなたは昨日家にいましたか？"],
    ["Yes, I was.", "はい、そうでした。"],
    ["No, I wasn't.", "いいえ、そうではありませんでした。"],
    ["My teacher told me to study English.", "先生は私に英語の勉強をするように言いました。"],
    ["Please tell me your name.", "あなたの名前を教えてください。"],
    ["What's your name?", "あなたの名前は何ですか？"],
    ["I want to visit the United States.", "私はアメリカに行きたいです。"],
    ["I want to be a doctor.", "私は医者になりたいです。"],
    ["Do you want something to drink?", "何か飲み物は欲しいですか？"],
    ["Do you have anything to buy?", "買うものはありますか？"],
    ["I need to learn English.", "私は英語を学ぶ必要があります。"],
    ["What should I do?", "私は何をすればいいですか？"],
    ["You should study about AI.", "あなたはAIについて勉強すべきです。"],
    ["About 3000 years ago.", "約3000年前。"],
    ["I'm thinking about my future.", "私は自分の未来について考えています。"],
    ["I was talking with my friend.", "私は友達と話していました。"],
    ["Were you watching TV?", "あなたはテレビを見ていましたか？"],
    ["Were you talking with your friend?", "あなたは友達と話していましたか？"],
    ["He doesn't know about it.", "彼はそれについて知りません。"],
    ["How do I get to the library?", "図書館にはどうやって行けばいいですか？"],
    ["We will arrive there at 5.", "私たちは5時にそこに着きます。"],
    ["Look at this picture.", "この写真を見てください。"],
    ["How nice!", "なんて素敵なんでしょう！"],
    ["What a cute cat!", "なんて可愛い猫なんでしょう！"],
    ["Could you get up early today?", "今日は早起きできましたか？"],
    ["I like to talk with neighbors.", "私は隣人と話すのが好きです。"],
    ["He thinks that she is smart.", "彼は彼女が頭がいいと思っています。"],
    ["You and I went to the park.", "あなたと私は公園に行きました。"],
    ["Let's climb Mt. Fuji.", "富士山に登りましょう。"],
    ["Shall we drink some tea?", "お茶を飲みましょうか？"],
    ["Yes, let's.", "はい、しましょう。"],
    ["No, let's not.", "いいえ、しません。"],
    ["I'm going to meet my teacher after school.", "放課後に先生に会いに行きます。"],
    ["I'm sorry I missed your phone call.", "電話に出られなくてすみませんでした。"],
    ["I'm free on sunday.", "日曜日は暇です。"],
    ["Be careful.", "気をつけて。"],
    ["It is necessary to study English.", "英語を勉強する必要があります。"],
    ["If you have free time, please come to my house.", "もし暇なら、私の家に来てください。"],
    ["Don't you mind if I smoke?", "私がタバコを吸っても気になりませんか？"],
    ["You are a member of family.", "あなたは家族の一員です。"],
    ["I have to follow this rules.", "私はこのルールに従わなければなりません。"],
    ["Some jobs will disappear.", "いくつかの仕事は消えてしまうでしょう。"],
    ["What animal can we see in New Zealand?", "ニュージーランドではどんな動物が見られますか？"],
    ["We can see kiwi.", "キウイが見られます。"],
    ["Where will you visit tomorrow?", "あなたは明日どこを訪れますか？"],
    ["Which do you want, coffee or tea?", "コーヒーと紅茶とどちらが欲しいですか？"],
    ["Please pick it up.", "それを拾ってください。"],
    ["Explain this reason, please.", "この理由を説明してください。"],
    ["When are you going to go there?", "あなたはいつそこに行くつもりですか？"],
    ["During the summer vacation.", "夏休み中。"],
    ["Come here at 8.", "8時にここに来てください。"],
    ["The ancient Egyptians use the sun to know time.", "古代エジプト人は時間を知るために太陽を使っていました。"],
    ["Can I use your computer?", "あなたのコンピュータを使ってもいいですか？"],
    ["Yes, you can.", "はい、あなたはできます。"],
    ["No, you can't.", "いいえ、あなたはできません。"],
    ["Can you speak English?", "あなたは英語が話せますか？"],
    ["Yes, I can.", "はい、できます。"],
    ["No, I can't.", "いいえ、できません。"],
    ["Don't worry.", "心配しないで。"],
    ["My pen is on the desk.", "私のペンは机の上にあります。"],
    ["I visited the museum to see many interesting things.", "私は多くの面白いものを見るために博物館を訪れました。"],
    ["Maybe you can get ideas there.", "おそらくあなたはそこでアイデアを得ることができます。"],
    ["I got it.", "わかりました。"],
    ["May I open this window?", "この窓を開けてもいいですか？"],
    ["Sure, I do.", "もちろんです。"],
    ["Old clocks aren't cheap.", "古い時計は安くありません。"],
    ["This is result of people's efforts.", "これは人々の努力の結果です。"],
    ["I'd like a humburger and a cola.", "ハンバーガーとコーラをお願いします。"],
    ["Would you like to go out with me?", "私と一緒に外出しませんか？"],
    ["This room is too hot.", "この部屋は暑すぎます。"],
    ["I know that you are busy.", "あなたが忙しいことは知っています。"],
    ["Who are you?", "あなたは誰ですか？"],
    ["Is he your friend?", "彼はあなたの友達ですか？"],
    ["We use them to work, to learn, and to communicate.", "私たちはそれらを使って働き、学び、コミュニケーションをとります。"],
    ["Which animal do you like, cats or dogs?", "あなたはどちらが好きですか、猫と犬と？"],
    ["I want this one.", "私はこれが欲しいです。"],
    ["How much is it?", "いくらですか？"],
    ["Did you have for lunch?", "あなたは昼食を食べましたか？"],
    ["What did you have for breakfast?", "あなたは朝食に何を食べましたか？"],
    ["I had a sandwich.", "私はサンドイッチを食べました。"],
    ["These are theirs.", "これらは彼らのものです。"],
    ["Do I have to call him?", "私は彼に電話しなければなりませんか？"],
    ["To use computer is fun.", "コンピュータを使うことは楽しいです。"],
    ["Is it fun to play games?", "ゲームをするのは楽しいですか？"],
    ["I know another countries' cultures.", "私は他の国の文化を知っています。"],
    ["It's my first overseas trip.", "これは私の初めての海外旅行です。"],
    ["I have many schedules tomorrow.", "私は明日たくさんの予定があります。"],
    ["According to this graph,", "このグラフによると、"],
    ["If you feel sorry for me, give me money!", "同情するなら金をくれ。"],
    ["I often drink coffee.", "私はよくコーヒーを飲みます。"],
    ["I always get up at 6.", "私はいつも6時に起きます。"],
    ["He tries to learn English.", "彼は英語を学ぼうとしています。"],
    ["If it's sunny tomorrow, I'll go to the park.", "明日晴れたら、私は公園に行きます。"],
    ["When I was 10 years old, I lived in Kyoto.", "私が10歳の時、私は京都に住んでいました。"],
    ["I wonder if he is smart.", "彼は頭がいいのかな。"],
    ["Following humanrights is important.", "人権を守ることは重要です。"],
    ["I studied English to pass the Eiken test.", "私は英検に合格するために英語を勉強しました。"],
    ["What do you do?", "あなたは何をしていますか？"],
    ["You're right.", "あなたは正しいです。"],
    ["I left my pen at home.", "私は家にペンを置き忘れました。"],
    ["Can I borrow your pen?", "あなたのペンを借りてもいいですか？"],
    ["He brought some toys.", "彼はいくつかのおもちゃを持ってきました。"],
    ["She is 13 years old.", "彼女は13歳です。"],
    ["You look tired.", "あなたは疲れて見えます。"],
    ["What's wrong?", "どうしたのですか？"],
    ["I have a headache.", "頭痛がします。"],
    ["I have a stomachache.", "お腹が痛いです。"],
    ["She has to do her homework.", "彼女は宿題をしなければなりません。"],
    ["He doesn't have to meet her.", "彼は彼女に会う必要はありません。"],
    ["People call it the Great Wall.", "人々はそれを万里の長城と呼んでいます。"],
    ["We went there on foot.", "私たちはそこに歩いて行きました。"],
    ["My teacher told us about it.", "先生は私たちにそれについて話しました。"],
    ["That is picture of mountain.", "あれは山の絵です。"],
    ["Could you take our picture?", "私たちの写真を撮っていただけますか？"],
    ["Bless you.", "お大事に。"],
    ["It's quarter cents.", "15セントです。"],
    ["You musn't forget my name.", "私の名前を忘れてはいけません。"],
    ["Do you remember me?", "私を覚えていますか？"],
    ["I mustn't run away...", "逃げちゃダメだ..."],
    ["I punish you on behalf of the moon!", "月に代わってお仕置きよ！"],
    ["Don't answer questions with questions!", "質問に質問で答えるな！"],
    ["If we can meet someday, will you call me friend again?", "いつか会えたら、また友達と呼んでくれますか？"],
    ["I'll choose. Please give up your dream and die.", "俺は選ぶぞ。夢を諦めて死んでくれ。"],
    ["It's symbol for school.", "それは学校のシンボルです。"],
    ["I eat dinner a lot.", "私は夕食をたくさん食べます。"],
    ["I finished using bathroom.", "私は浴室を使い終わりました。"],
    ["I enjoyed talking with my friend.", "私は友達と話すのを楽しみました。"],
    ["He started to learn about computer.", "彼はコンピュータについて学び始めました。"],
    ["How have you been keeping?", "お元気でしたか？"],
    ["It's been a while.", "久しぶりですね。"],
    ["Nice to see you again.", "またお会いできて嬉しいです。"],
    ["I'm sure that she is kind.", "彼女は優しいと確信しています。"],
    ["I'm sorry that his grandfather passed away.", "彼のおじいさんが亡くなったことを残念に思います。"],
    ["Do you know where we can play baseball?", "野球ができる場所を知っていますか？"],
    ["The shop that sells t-shirts is over there.", "Tシャツを売っている店はあそこです。"],
    ["I learned how to help people by universal design.", "私はユニバーサルデザインによって人々を助ける方法を学びました。"],
    ["Now many facilities adopt universal design.", "今、多くの施設がユニバーサルデザインを採用しています。"],
    ["This movie is the oldest one in my collection.", "この映画は私のコレクションの中で一番古いものです。"],
    ["I went to the exhibition about the ancient people's lives", "私は古代人の生活についての展覧会に行きました。"],
    ["I wonder how universal designs help people.", "ユニバーサルデザインが人々をどのように助けるのかな。"],
    ["I can show you how.", "どのようにしてかを見せることができます。"],
    ["Because of the rain, the train will be late.", "雨のため、電車は遅れます。"],
    ["There's a lot of question for you.", "あなたにたくさんの質問があります。"],
    ["Thanks to the bumps on the ground, blind people can walk safely.", "地面の凸凹のおかげで、目の見えない人は安全に歩くことができます。"],
    ["We often disabled as we get older.", "私たちは年をとるにつれて障害を持つことが多くなります。"],
    ["My pleasure.", "どういたしまして。"],
    ["She has already leave.", "彼女はすでに出発しました。"],
    ["Ancient people put stick on the ground to know the time.", "古代人は時間を知るために棒を地面に立てました。"],
    ["You don't have to leave a tip in Japan.", "日本ではチップを払う必要はありません。"],
    ["We will take you up by 8.", "私たちは8時までにあなたを乗せます。"],
    ["I didn't hear what she said.", "私は彼女が何を言ったのか聞き取れませんでした。"],
    ["Studying English is difficult for me.", "英語を勉強するのは私にとって難しいです。"],
    ["I finished doing my homework.", "私は宿題を終えました。"],
    ["We couldn't all go to the party.", "私たちはみんなパーティーに行けませんでした。"],
    ["Are you interested in using computers?", "コンピュータを使うことに興味がありますか？"],
    ["You have to leave 15% as a tip in America.", "アメリカではチップとして15%を残さなければなりません。"],
    ["I have not eaten lunch yet today.", "私は今日まだ昼食を食べていません。"],
    ["I've been working at this school for 5 years.", "私はこの学校で5年間働いています。"],
    ["I've never been abroad before.", "私は今まで海外に行ったことがありません。"],
    ["She's afraid of flying.", "彼女は飛行機に乗るのが怖いです。"],
    ["I will be absent from this party.", "私はこのパーティーを欠席します。"],
    ["I should've eaten breakfast.", "私は朝食を食べるべきでした。"],
].map(w => { return {"word" : w[0], "mean" : w[1]} });

const sound = new Audio("./key_sound.mp3");

const question_length = words.length;
let komoji_only = false;
let first_keydown = false;

let select_word
let now_word
let interval;
let question_number;
// let shoryaku_check = false;
let question_status = 0;
let mistype = 0;
let correct_type = 0;

const odai = document.getElementById("odai_text");
const mean = document.getElementById("mean");
const time = document.getElementById("time");
const time_to_calc = 30;
let now_time = 0;

document.addEventListener("keypress", event => get_key(event));

document.getElementById("komoji_only").addEventListener("change", () => {
    komoji_only = document.getElementById("komoji_only").checked;
});

/* アポストロフィをなくす機能
document.getElementById("no_shoryaku").addEventListener("change", () => {
    shoryaku_check = document.getElementById("no_shoryaku").checked;
});*/

// 少数第2位まで表示するように四捨五入
function round(num) {
    return Math.round(num * 100) / 100;
}

function time_up() {
    document.getElementById("komoji_only").removeEventListener("change", () => {
        komoji_only = document.getElementById("komoji_only").checked;
    });
    odai.removeEventListener("keypress", event => get_key(event));
    time.innerHTML = ` - 終了 - <br>総タイプ数: ${correct_type + mistype}<br>正しい入力数: ${correct_type}<br>ミスタイプ数: ${mistype}<br>正しいタイプ率: ${round(correct_type / (correct_type + mistype) * 100)}%<br>平均タイプ速度: 約${round((correct_type + mistype) / now_time)}回/秒`;
    create_point_code(Math.ceil(correct_type * 0.05));
}

function get_key(e) {
    if (!first_keydown) {
        first_keydown = true;
        now_time = 0;
        interval = setInterval(() => {
            now_time += 0.1;
            time.innerText = now_time.toFixed(1);
            if (now_time >= time_to_calc) {
                clearInterval(interval);
                time_up();
            }
        }, 100);
    }

    if (e.key == now_word.charAt(question_status) || (komoji_only && e.key == now_word.charAt(question_status).toLowerCase())) {
        correct_type++;
        sound.currentTime = 0;
        sound.play();

        question_status++;
        if (question_status == now_word.length) {
            odai.innerHTML = "";
            play_game();
        } else {
            odai.innerHTML = "<span id='gray'>" + now_word.substring(0, question_status).replace(/ /g, "␣") + "</span>" + now_word[question_status].replace(/ /g, "␣") + now_word.substring(question_status + 1, now_word.length).replace(/ /g, "␣");
        }
    } else {
        mistype++;
    }
}

function play_game() {
    question_number = Math.floor(Math.random() * question_length);
    question_status = 0;

    select_word = words[question_number];

    odai.innerText = select_word.word.replace(/ /g, "␣");
    mean.innerText = select_word.mean;
    now_word = select_word.word;
}

onload = play_game();