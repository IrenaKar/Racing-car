$(function () {
    //write your code here
  
    $(".go").on("click", function (e) {
      e.preventDefault();
      // disable the buttons
      $("button").attr("disabled", "disabled");
  
      let counter = 3;
  
      $("#counter").fadeIn();
      $("#counter").addClass("counting");
      $(".counting").html(counter);
  
      let interval = setInterval(function () {
        counter--;
        $(".counting").html(counter);
        if (counter === 0) {
          $(".counting").html("");
          clearInterval(interval);
          $("#counter").removeClass("counting");
  
          function checkIfComplete() {
            if (isComplete == false) {
              isComplete = true;
              $("#flag").addClass("flag");
            } else {
              place = "second";
            }
          }
  
          let car1Width = $("#car1").width();
          let car2Width = $("#car2").width();
  
          // meassure the racing track width
          let racetrackCar1 = $(window).innerWidth() - car1Width;
          let raceTrackCar2 = $(window).innerWidth() - car2Width;
  
          // generate a random number
          let raceTime1 = Math.floor(Math.random() * 5000);
          let raceTime2 = Math.floor(Math.random() * 5000);
  
          //when the race is finished set to true
          let isComplete = false;
          let place = "first";
  
          //animate car1
          $("#car1").animate(
            {
              left: racetrackCar1 - 15,
            },
            raceTime1,
            function () {
              checkIfComplete();
  
              // append results from the race
  
              $(".info1").append(
                `<div class="result1"> <p>Finished in: <span class="car1Info">${place}</span> place with a time of <span class="car1Info">${raceTime1}</span> millieseconds!</p></div>`
              );
  
              localStorage.setItem(
                "firstCar",
                `<div class="oldResultsCar1"> <p> <span class="car1Info">Car 1</span> finished in: <span class="car1Info">${place}</span> place with a time of <span class="car1Info">${raceTime1}</span> millieseconds!</p></div>`
              );
              $("button").removeAttr("disabled");
            }
          );
  
          $("#car2").animate(
            {
              left: raceTrackCar2 - 15,
            },
            raceTime2,
            function () {
              checkIfComplete();
  
              // append results from the race
  
              $(".info2").append(
                `<div class="result2"> <p>Finished in: <span class="car2Info">${place}</span> place with a time of <span class="car2Info">${raceTime2}</span> millieseconds!</p></div>`
              );
  
              localStorage.setItem(
                "secondCar",
                `<div class="oldResultsCar2"> <p> <span class="car2Info">Car 2</span> finished in: <span class="car2Info">${place}</span> place with a time of <span class="car2Info">${raceTime2}</span> millieseconds!</p></div>`
              );
              $("button").removeAttr("disabled");
            }
          );
        }
      }, 1000);
    });
  
    $("body").on("click", function () {
      $("#flag").removeClass("flag");
    });
  
    $(".reset").on("click", function () {
      $(".car").animate({
        left: "0",
      });
    });
  
    //get the previous results from local storage
  
    let prevResultCar1 = localStorage.getItem("firstCar");
    let prevResultCar2 = localStorage.getItem("secondCar");
    if (prevResultCar1 || prevResultCar2) {
      $(".oldResults").show();
      $(".oldResults").append(prevResultCar1);
      $(".oldResults").append(prevResultCar2);
    }
    localStorage.clear();
  });
  