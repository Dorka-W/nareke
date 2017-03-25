function testy(){
  var wynik = przelicz_jquery(100, 110);
  if (wynik.zus != 1109.89){
    $("#wynik").text("zla suma zus");
    return
  }
  if (wynik.podatek != 1680){
    $("#wynik").text("zla suma podatku");
    return
  }

  if (typeof przelicz_i_wyswietl == 'undefined'){
    $("#wynik").text("ojej, nie ma przelicz i wyswietl!");
    return
  }

  $("#wynik").text("testy ok");

}

testy();
