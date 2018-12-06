var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function () {

    RoomsView.$select.on('change', RoomsView.handleChange);
    RoomsView.$button.on('click', RoomsView.handleClick);
  },

  render: function () {

    RoomsView.$select.html('');
    Rooms
      .items()
      .each(RoomsView.renderRoom);
    RoomsView.$select.val(Rooms.selected);
  },

  renderRoom: function (roomname) {
    var $option = $('<option>').val(roomname).text(roomname);
    RoomsView.$select.append($option);
  },

  handleChange: function (event) {
    Rooms.selected = RoomsView.$select.val();
    MessagesView.render();
  },

  handleClick: function (event) {
    var room = prompt('Enter room name');
    if (room) {
      Rooms.add(room, () => {
        RoomsView.render();
        MessagesView.render();
      });
    }
  }

};
