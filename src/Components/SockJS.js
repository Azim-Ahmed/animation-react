//https://codepen.io/jamesburton/pen/aBMLvL
// importing Container, Row, Col, etc from React Boostrap CodePen
var url = 'https://chatreactsockjs.azurewebsites.net/chat';
var options = {};
var sockjs = new SockJS(url, /*_reserved*/null, options);

sockjs.onopen = function() {
    console.log('open');
  
   //sock.send('test');
  sockjs.send(JSON.stringify({ name: 'Test User', message: 'This is a hard-coded test'}));
  //sockjs.close();
};
/*  NB: Moved into App
sockjs.onmessage = function(e) {
    console.log('message', e.data);
}; //*/
sockjs.onclose = function() {
    console.log('close');
};

var LoggedIn = function(props) { return <h6><small>Logged in as: </small> <strong>{props.name}</strong></h6>; };

//var Login = function() { return <div>[Login]</div>; };
class Login extends React.Component
{
  render() {
    var self = this;
    var login = function(e) { 
      ((e && e.preventDefault) ? e : event).preventDefault(); 
      self.props.login(self.refs.name.value); 
    };
    return <form onSubmit={login}>
      <div>
        Name:
        <input placeholder="Name" ref="name" />
      </div>
      <div>
        <button>Login</button>
        <Button>Login</Button>
      </div>
    </form>; 
  }
}

//////////////////////

//var UserList = function(props) { return <div>[UserList]</div> };
var UserList = function(props) {
  return <div>
    <h6>User List</h6>
    <ul className="list-unstyled">
      { props.users.map(function(user) { return <li key={user.id}>{user.name}</li> }) }
    </ul>
  </div>;
};

//var MessageList = function(props) { return <div>[MessageList]</div> };
var MessageList = function(props) {
  return <div>
    <h6>Message List</h6>
    <ul className="list-unstyled">
      { props.messages.map(function(message) { return <li key={message.id}>
        <em>{message.name}: </em>
        {message.message}
      </li> }) }
    </ul>
  </div>;
};

//var NewMessage = function(props) { return <div>[NewMessage]</div>; };
class NewMessage extends React.Component
{
  sendMessage() {
    event.preventDefault();
    var name = this.props.name;
    var message = this.refs.message.value;
    this.props.sendMessage(name, message);
    this.refs.message.value = '';
  }
  render () {
    var props = this.props;
    return <div className="row">
      <form onSubmit={this.sendMessage.bind(this)}>
        <div className="col-md-10">
          <textarea className="fill" ref="message" placeholder="Write your message here"></textarea>
        </div>
        <div className="col-md-2">
          <button className="fill">Send</button>
        </div>
      </form>
    </div>;
  }
}

class ChatApp extends React.Component
{
  render() {
    //return <div>[ChatApp]</div>;
    return <div className="container">
      <div className="row">
        <div className="col-md-12">
          <LoggedIn name={this.props.name} />
        </div>
        <div className="col-md-4 h300">
          <UserList users={this.props.users} />
        </div>
        <div className="col-md-8 h300">
          <MessageList messages={this.props.messages} />
        </div>
        <div className="col-md-12">
          <NewMessage name={this.props.name} sendMessage={this.props.sendMessage} />
        </div>
      </div>
    </div>
  }
}

class App extends React.Component
{
  constructor(props) {
    super(props);
    var self = this;
    this.state = {
      users: [],
      messages: [],
      loggedIn: false,
      name: '',
      messageId: 0,
      userId: 0
    };
    this.login = this.handleLogin.bind(this);
    this.sendMessage = function(name, message) {
      self.props.sock.send(JSON.stringify({name: name, message: message}));
    };
  }
  //login(name) {
  handleLogin(name) {
    if(name.length)
      this.setState({ loggedIn: true, name: name });
    else
      alert('Please enter a name first');
  }
  logout() {
    this.setState({ loggedIn: false, name: '' });
  }
  /* NB: Moved to constructor, so that self reference can be used instead of this
  sendMessage(name, message) {
    this.props.sock.send(JSON.stringify({name: name, message: message}));
  } */
  getMessageId() {
    var id = this.state.messageId - 1;
    this.setState({messageId: id});
    return id;
  }
  addMessage(message) {
    message.id = message.id || this.getMessageId();
    this.setState({ messages: this.state.messages.concat(message) });
    this.addUser(message.name);
  }
  getUserId() {
    var id = this.state.userId - 1;
    this.setState({userId: id});
    return id;
  }
  addUser(name) {
    if(!this.state.users.some(function(user) { return user.name === name; }))
      this.setState({ users: this.state.users.concat({ id: this.getUserId(), name: name }) });
    // else console.log('User already exists: ' + name);
  }
  componentDidMount() {
    var self = this;
    //alert(this.props.sock);
    //this.sendMessage('SYSTEM', 'App mounted');
    this.props.sock.onmessage = function(e) {
        //console.log('message', e.data);
      self.addMessage(JSON.parse(e.data));
    };
    this.addMessage({name: 'Bilbo Baggins', message: 'Welcome to the Shire!'});
  }
  render() {
    let loggedIn = this.state.loggedIn;
    return <div>
      { loggedIn 
        ? <ChatApp logout={this.logout} users={this.state.users} messages={this.state.messages} name={this.state.name} sendMessage={this.sendMessage} /> 
        : <Login login={this.login} /> }
    </div>;
  }
}

ReactDOM.render(<Container><App sock={sockjs} /></Container>, document.getElementById('app'));
