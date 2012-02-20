$(function(){
  
  $("#open-chat").live( "click", function(){
    var url = $(this).data("href");
    var userName = $("#user-name").val();
    console.log(userName)
    if(userName.length == 0) {
      return;
    }
    chatWindow = window.open(
      url+"?userName="+userName
    , "ConquestChat"
    , "resizable=no," +
      "toolbar=no," +
      "scrollbars=no," +
      "menubar=no," +
      "width=849," +
      "height=668"
    );
    event.preventDefault();
    chatWindow.document.getElementById('new-message').focus()
  }); 
  
});