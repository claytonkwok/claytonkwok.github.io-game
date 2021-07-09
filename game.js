const buttonColours =['red','blue','green','yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = true;
$('body').keypress(function (){
    if (started) {
    $('#level-title').text(`level:${level}`);
    nextSequence();
    started = false
    }
}
)


$('.btn').click(function() {
    let userChosenColour =  $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
})

function startOver() {
    started =true;
    gamePattern=[];
    level=0;
}

function checkAnswer(currentLevel){
    if (userClickedPattern[(currentLevel-1)]===gamePattern[(currentLevel-1)]) {
        console.log('success');
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            },1000)
        }

    }else {
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function (){
            $('body').removeClass('game-over')
        },200);
        $('#level-title').text('Game Over,Press Any Key to Restart');
        startOver()
    }

}

function nextSequence() {
    userClickedPattern=[];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('#level-title').text(`level:${level}`);
    
};


function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play()
}
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function (){
        $(`#${currentColour}`).removeClass('pressed')
    },100)
}

