(function(chatContainer) {
  var ChatLine = React.createClass({
    render: function() {
      var chatline = this.props.chatline;
      return (
          <div className="chatline">
            <span className="at">[{moment(chatline.at).format("HH:mm:ss")}] </span>
            <span className="user">{chatline.user}: </span>
            <span className="text">{chatline.text}</span>
          </div>
      );
    }
  });

  var ChatBox = React.createClass({
    render: function() {
      return (
          <div className="chatbox">
          {this.props.chatlines.map(function(chatline) {
            return (<ChatLine chatline={chatline}
                              key={chatline.user + chatline.at} />);
          })}
          </div>
      );
    }
  });

  var ChatInput = React.createClass({
    getInitialState: function() {
      return {
        text: ""
      };
    },

    onChange: function(event) {
      this.setState({ text: event.target.value });
    },

    onSubmit: function(event) {
      event.preventDefault();
      this.props.onSubmit(this.state.text);
      this.setState({ text: "" });
    },

    render: function() {
      return (
          <form className="chatinput" onSubmit={this.onSubmit}>
            <span className="user">{this.props.user} </span>
            <input type="text"
                   value={this.state.text}
                   placeholder="Chat here"
                   onChange={this.onChange} />
          </form>
      );
    }
  });

  var Chat = React.createClass({
    getInitialState: function() {
      return {
        user: null,
        chatlines: [],
        lastUpdate: 0,
        refreshId: null
      };
    },

    updateChats: function(resp) {
      var chats = resp.chats;
      if (chats.length == 0) {
        return;
      }
      this.setState(React.addons.update(
        this.state,
        { chatlines: { $push: chats },
          lastUpdate: { $set: chats[chats.length - 1].at } }));
    },

    getChats: function() {
      reqwest({
        url: "/chat?since=" + this.state.lastUpdate,
        method: "get",
        type: "json",
        success: this.updateChats
      });
    },

    saveChat: function(text) {
      var self = this;
      reqwest({
        url: "/chat?since=" + this.state.lastUpdate,
        method: "post",
        type: "json",
        data: { user: this.state.user, at: new Date().getTime(), text: text },
        success: this.updateChats
      });
    },

    componentDidMount: function() {
      this.getChats();
      var refreshId = setInterval(this.getChats, 500);
      this.setState({ user: prompt("Please enter a username"),
                      refreshId: refreshId });
    },

    componentWillUnmount: function() {
      cancelInterval(this.state.refreshId);
    },

    render: function() {
      return (
          <div className="chat">
            <ChatBox chatlines={this.state.chatlines}/>
            <ChatInput user={this.state.user} onSubmit={this.saveChat} />
          </div>
      );
    }
  });

  React.render(<Chat />, chatContainer);
}(document.getElementById("chat-container")));
