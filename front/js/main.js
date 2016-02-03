import React from 'react'
import { render } from 'react-dom'

class Tutu
{
    alert() {
        console.log('Test Class');
    }
}

var t = new Tutu();

console.log('test basic');

t.alert();

fetch('http://localhost:9312', {
    method: 'get',
    mode: 'no-cors'
}).then(function(response) {
    return response.json();
}).catch(function(err) {
    console.log("crash");
});

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

render(<HelloMessage name="John" />, document.getElementById('content'));
