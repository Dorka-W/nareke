//
// function przelicz(){
//   var stawka = document.getElementById("stawka").value, godzin = document.getElementById("godzin").value;
//   document.getElementById("wynik").innerHTML = 'zarobiles '+ stawka * godzin;
// }

function max(a,b){
  if (a >= b){
    return a;
  }
  else {
    return b;
  }
}

// function zaokraglij(a,b){ <= trudniejsza wersja zaokrąglania liczb
//   var mnoznik = 1;
//   for (i=0; i<b; i++){
//     mnoznik = mnoznik * 10;
//   }
//   return Math.round(a*mnoznik)/mnoznik;
// }

function formatWaluty(a){
  return Math.round(a*100)/100;
}

function wyswietl_wynik(wynik){
  $('#netto').text('Kwota netto ' + wynik.netto + " | " + " Na przelewie " + formatWaluty(1.23 * wynik.netto));
  $('#zus').text('ZUS ' + wynik.zus);
  $('#skarbowy').text('Podatek ' + wynik.podatek);
  $('#koszty').text('Koszty' + wynik.koszty);
  $('#wynik').text('Zarobiłeś '+ formatWaluty(wynik.zarobek));
}

function przelicz_jquery(stawka, godzin, koszty){
  var zusSpoleczny = 749.94, funduszPracy = 62.67, zusZdrowotny = 297.28;
  var netto = stawka * godzin;
  var zarobiles = netto - zusSpoleczny - funduszPracy;
  var podatek = Math.round(max(max(zarobiles, 0) * 0.19 - 255.99, 0));
  var wynik = zarobiles - podatek - zusZdrowotny - koszty;
  return {'netto': netto, 'zus': zusZdrowotny + zusSpoleczny + funduszPracy, 'podatek': podatek, 'zarobek': wynik}
}

function przelicz_i_wyswietl(){
  var stawka = $("#stawka").val(), godzin=$("#godzin").val(), koszty=$("#koszty").val();
  var adres = $(location).attr('href')
  $(location).attr('href', adres.split('#')[0]+'#stawka='+stawka+'&godzin='+godzin+'&koszty='+koszty);
  var wynik = przelicz_jquery(stawka, godzin, koszty)
  wyswietl_wynik(wynik)
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function move(procent=100) {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 25);
    function frame() {
        if (width >= procent) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function move_fancy(procent=100){
  $(".meter > span").each(function() {
    $(this)
      .data("origWidth", procent+"%")
      .width(0)
      .animate({
        width: $(this).data("origWidth")
      }, 1200);
  });
}

function przelicz_procent(){
  var cel = $("#cel").val(), godzin=$("#godzin").val(), procent = 0;
  if (cel > 0 ){
    procent = Math.round(( godzin / cel )*100)
    if (isNaN(procent)){
      procent = 0;
    }
  }
  procent = Math.min(procent, 100)
  //$("#pasek").val(procent); z jquery
  //document.getElementById("pasek").value = procent; <= wersja bez uzycia jQuery
  move(procent);
  move_fancy(procent);

}

$(document).ready(function(){
  $('input.przelicznik').change(przelicz_i_wyswietl);
  $("#stawka").val(getParameterByName("stawka"));
  $("#godzin").val(getParameterByName("godzin"));
  $("#koszty").val(getParameterByName("koszty"));
  //koszty = getParameterByName("koszty");
  przelicz_i_wyswietl();
  $('input.procent').change(przelicz_procent);
})
