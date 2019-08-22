window.onload = function() {
  //get reference to the element on the page
  var form = document.getElementById("message-form");
  var messageField = document.getElementById("message");
  var messageList = document.getElementById("messages");
  var socketstatus = document.getElementById("status");
  var closeBtn = document.getElementById("close");

  //creating a new websocket
  var socket = new WebSocket("wss://echo.websocket.org");

  //Handle amy errors that occur
  socket.onerror = function(error) {
    console.log("WebSocketError: " + error);
  };

  //show a connected message when the websocket is opened
  socket.onopen = function(event) {
    socketstatus.innerHTML = "connected to: " + event.currentTarget.url;
    socketstatus.className = "open";
  };

  //Handle the messages sent by the server
  socket.onmessage = function(event) {
    var message = event.data;
    messageList.innerHTML +=
      '<li class="received"><span>Received:</span>' + message + "</li>";
  };

  //show a disconnected message when the webSocket is closed
  socket.onclose = function(event) {
    socketstatus.innerHTML = "Disconnected From WebSocket.";
    socketstatus.className = "closed";
  };

  //send a message when a form is submitted
  form.onsubmit = function(e) {
    e.preventDefault();

    //Retrieve the message from the textarea
    var message = messageField.value;

    //send the message through the webSocket
    socket.send(message);

    //add the message to the messages list
    messageList.innerHTML +=
      '<li class="sent"><span>sent:</span>' + message + "</li>";

    //clear out the message field
    messageField.value = "";

    return false;
  };

  //close the webSocket connection when the close button is clicked
  closeBtn.onclick = function(e) {
    e.preventDefault();

    //close the Websocket
    socket.close();

    return false;
  };
};
