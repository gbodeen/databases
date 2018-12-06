var MessageView = {

  render: _.template(`
      <!--

      -->
      <div class="chat">
        <div
          class="name <%= Friends.isFriend(name) ? 'friend' : '' %>"
          data-name="<%- name %>">
          <%- name %>
        </div>
        <div><%- message %></div>
      </div>
      <!--
            -->
    `)

};