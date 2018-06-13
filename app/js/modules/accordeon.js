// accordeon par année
var $years = document.querySelectorAll('.client_overview-year');

for (let i = 0; i < $years.length; i++){
    let $year = $years[i];
    var $title = $year.querySelector('.h3');
    $title.addEventListener('click', function(){
        $year.classList.toggle('accordeon-on');
    });
}

// factures payées / non-payées
var $bills = document.querySelectorAll('.client_progress-bill--state');
for (let i = 0; i < $bills.length; i++){
    $bills[i].addEventListener('click', function(){
        this.classList.toggle('bill-paid');
    });
}

// switch button 
var $switchs = document.querySelectorAll('.input_switch');
var $onoff = document.querySelectorAll('.input_switch .slider');
for (let i = 0; i < $switchs.length; i++){
    $switchs[i].addEventListener('click', function(){
        console.log(i);
        console.log($onoff[i])
        $onoff[i].classList.toggle('slider-off'); // not working
    });
}