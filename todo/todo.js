(function(container) {
  var ul    = React.DOM.ul,
      li    = React.DOM.li,
      form  = React.DOM.form,
      input = React.DOM.input,
      div   = React.DOM.div;

  var TodoItem = React.createClass({
    onChange: function(event) {
      if (event.target.checked) {
        this.props.onCheck(event.target.id);
      }
    },

    render: function() {
      return li({}, input({ type     : "checkbox",
                            id       : this.props.id,
                            onChange : this.onChange }),
                    this.props.text);
    }
  });

  var TodoInput = React.createClass({
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
      return form({ onSubmit: this.onSubmit },
                  input({ type        : "text",
                          value       : this.state.text,
                          placeholder : "Enter todo items",
                          onChange    : this.onChange }));
    }
  });

  var Todo = React.createClass({
    getInitialState: function() {
      return {
        items: []
      };
    },

    addItem: function(item) {
      var items = this.state.items.slice(0);
      items.push(item);
      this.setState({ items: items });
    },

    checkItem: function(itemIdx) {
      var items = this.state.items.slice(0);
      items.splice(parseInt(itemIdx), 1);
      this.setState({ items: items });
    },

    render: function() {
      var self = this;
      var todoItems = self.state.items.map(function(item, idx) {
        return React.createElement(TodoItem, { text    : item,
                                               key     : idx + item,
                                               id      : idx,
                                               onCheck : self.checkItem });
      });
      var todoInput = React.createElement(TodoInput, { onSubmit: self.addItem });
      return div({ className: "todo" }, ul({}, todoItems),
                                        todoInput);
    }
  });

  var todo = React.createElement(Todo);

  React.render(todo, container);
}(document.getElementById("todo-container")));
