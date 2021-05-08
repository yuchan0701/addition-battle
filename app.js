var barP = 0;
var machigaeAnswer = "";
var max = 8;
var min = 1;
var win = 0;
var quizCount = 0;
var point = 0;

document.getElementById("js-owari").style.display = "none";

//HTMLと接続
    const seigoDisplay = document.getElementById('seigo');
    const answer = document.getElementById('text1');
    const pointDisplay = document.getElementById('point');
    const pointBar = document.getElementById("Pbar");

//ページ更新
function retry(){
    location.reload()
}

//時間制限
function timeLimit(){
    barP += 1;
 
        document.getElementById("bar").style = "width:" + barP + "%";
    
};


//計算画面出す
function setupKeisan(){
    document.getElementById('js-question').style.display = "block";
    document.getElementById('text1youso').style.display = "block";
    seigoDisplay.style.color = "black";

    document.getElementById('result').style.display = "none";
    document.getElementById('retry').style.display = "none";
}

//結果発表だす
function setupKekka(){
            
    document.getElementById("js-owari").style.display = "block";

    document.getElementById('js-question').remove();
            document.getElementById('text1youso').remove();
            document.getElementById('result').style.display = "block";
            document.getElementById('retry').style.display = "block";
            pointDisplay.textContent = point;
            seigoDisplay.style.display = "none";
            document.getElementById("baryouso").style.display = "none";
            document.getElementById("P-baryouso").style.display = "none";
};

//時間制限
function timeLimit(){
    barP += 1.8;
    console.log(barP)
    document.getElementById("bar").style = "width:"+barP+"%";
    if (parseInt(barP , 10) == 113) {
        document.getElementById("js-owari").textContent = "時間切れ";
        setupKekka();
    };

};

//ポイントプログレスバー
function pointProgress(){
    if (point < 100) {
        pointBar.className = "progress-bar bg-success";
        pointBar.style = "width:"+point+"%";
    }else if (point < 500) {
        pointBar.className = "progress-bar bg-info";
        pointBar.style = "width:"+((point - 100)/4)+"%";
    }else if (point < 2000) {
        pointBar.className = "progress-bar bg-warning";
        pointBar.style = "width:"+((point - 500)/15)+"%";
    }else if (point < 10000) {
        pointBar.className = "progress-bar bg-danger";
        pointBar.style = "width:"+((point - 2000)/80
        )+"%";
    };
      
    
};



const setupQuiz = () => {


    setupKeisan();
    quizCount += 1;

     
//ランダムの値だす
var a = Math.floor( Math.random() * (max + 1 -min) ) + min;
var b = Math.floor( Math.random() * (max + 1 - min) ) + min;
//問題文作る
const question = a + ' + ' + b + ' = ?';
var correct = a+b

//問題文表示
document.getElementById('js-question').textContent = question;




document.getElementById('text1').onkeydown = (e) =>{
    const key = e.keyCode || e.charCode || 0;
    


    if(key == 13){
        if(answer.value == ''){
            seigoDisplay.textContent = "解答を入力してください。"
        }else{
           if(answer.value == correct){
            min += 1;
            win += 1;
            max += 2;
            point = point + a+b;  
            seigoDisplay.textContent = "正解";
            answer.value = '';
            barP = -3;
            pointProgress();
            setupQuiz();
        
            }else{
            barP += 150;
            document.getElementById("machigae").textContent = a + ' + ' + b + ' = ' + answer.value + " ではありません。";
      
            seigoDisplay.textContent = "";
            setupKekka()
            answer.value = '';
            }; 
        };
        
        

    };

};

};

setupQuiz();


setInterval(timeLimit,100);
