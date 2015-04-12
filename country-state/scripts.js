var br = React.DOM.br;
var div = React.DOM.div;
var select = React.DOM.select;
var option = React.DOM.option;

var CountryState = React.createClass({
  displayName: 'CountryState',
  
  getInitialState: function() {
    return({
      countries: ["USA", "India"],
      states: ["Arizona", "Colorado"]});
  },
  
  handleSelectChange: function (e) {
    var mapping = {
      "USA": ["Arizona", "Colorado"], 
      "India": ["Karnataka", "Gujrat"]
    };
    
    this.setState({states: mapping[e.target.value]});
  },
  
  render: function () {
    return(div({},
      React.createElement(Country, {countries: this.state.countries, change: this.handleSelectChange}),
      br({}),
      React.createElement(State, {states: this.state.states}))
    );
  }
});

var Country = React.createClass({
  displayName: 'Country',
  
  render: function () {
    var countries = this.props.countries.map(function(item, idx) { 
      return(option({key: idx}, item));
    });    
    
    return(div({}, "Country", br({}), select({onChange: this.props.change}, countries)));
  }
});

var State = React.createClass({
  displayName: 'State',
  
  render: function () {
    var states = this.props.states.map(function(item, idx) { 
      return(option({key: idx}, item));
    });
        
    return(div({}, "State", br({}), select({}, states)));
  }
});

React.render(React.createElement(CountryState, {}), document.getElementById('container'));