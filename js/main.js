window.addEventListener('DOMContentLoaded', ()=>{
//tabs
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');


      function hideTabContent(){
          tabsContent.forEach(item => {
            item.style.display = 'none';
          });

          tabs.forEach(item =>{
              item.classList.remove('tabheader__item_active');
          })
      }

      function showTabContent(i = 0){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
      }


hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function(event){   
const target = event.target;
if(target && target.classList.contains('tabheader__item')){
    tabs.forEach((item, i) =>{
        if(target == item){
            hideTabContent();
            showTabContent(i);  
        }
    });
}
});




//Timer

// Задаём конечную дату (Дедлайн)
const deadline = '2020-11-23';


// Сколько осталось времени
function getTimeRemaining(endtime){

 // Получаем разницу. Переводим конечную дату в миллисекунды и отнимаем текущую дату
const t = Date.parse(endtime) - Date.parse(new Date()),
 // Высчитываем секунды, минуты, часы и дни
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

// Создаем массив данных для работы в не ф-ции
        return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
        };

}


// Функция добавляет 0 к единцам
function getZero(num){

    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else{
        return num;
    }
}


 // Форматируем и устанавливаем значения в разметку
function setClock(selector, endtime){
    // Получаем блок таймера 
const timer = document.querySelector(selector),
// И соотвественно, все элементы блока
       days = timer.querySelector('#days'),
       hours = timer.querySelector('#hours'),
       minutes = timer.querySelector('#minutes'),
       seconds = timer.querySelector('#seconds'),
       // Обновляем таймер каждую секунду
       timeInterval = setInterval(updateClock, 1000);
// запускаем таймер при старте стр-ц
       updateClock();

// Функция для обновления таймера
       function updateClock(){
           // Помещаем в t результат функции getTimeRemaining (объект)
           const t  = getTimeRemaining(endtime);

           days.innerHTML = getZero(t.days);
           hours.innerHTML = getZero(t.hours);
           minutes.innerHTML = getZero(t.minutes);
           seconds.innerHTML = getZero(t.seconds);

// Если Дедлайн прошёл - вставляем в таймер 00:00:00,
// и останавливаем отсчёт (clearInterval)
           if(t.total <= 0){
               clearInterval(timeInterval);
                    days.textContent = '00';
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
           }
       }
      
}

//Вызов таймера. Передаём таймер и наш Дедлайн
setClock('.timer', deadline);


//modal

//получаем елементы со страницы 
const modalTrigger = document.querySelectorAll('[data-modal'),
      modalClose = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');


//перебераем елементы кнопок
      modalTrigger.forEach(btn =>{
          //вешаем обработчик событий на кнопку открыть
          btn.addEventListener( "click" , openModal);
      });

      function closeModal(){
        modal.style.display = 'none';  
      }

      function openModal(){
        modal.style.display = 'block';  
        clearInterval(modalTimerId);
      }
        
        
 //вешаем обработчик событий на кнопку закрыть
      modalClose.addEventListener( "click" , closeModal);

      modal.addEventListener( "click" , (event) => {
        const target = event.target;
        if(target === modal){
            closeModal(); 
        }
    
      });

 //вешаем обработчик событий на кнопку ESC
      document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape'){
            closeModal(); 
        }
      });

 //показ модалки через время
      // const modalTimerId = setTimeout(openModal, 5000);

      function showModalByScrole(){
        if (window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScrole);
        }
      }
 //показ модалки при прокрутке до конца страницы
      window.addEventListener('scroll', showModalByScrole);



      

     
});




  

