var MessagesView = {

  $chats: $('#chats'),

  initialize: function () {

    MessagesView.$chats.on('click', '.name', MessagesView.handleClick);
  },

  render: function () {

    MessagesView.$chats.html('');
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.room))
      .each(message => MessagesView.renderMessage(message));
  },

  renderMessage: function (message) {
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function (event) {
    // Get name from data attribute
    var name = $(event.target).data('name');
    if (name === undefined) { return; }

    Friends.toggleStatus(name, MessagesView.render);
  }

};