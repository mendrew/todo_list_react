var TODO_DATA = [
	{ done: false, text: "Create reactApp"},
	{ done: false, text: "Create reactApp"},
	{ done: true, text: "Start typing"},
];

var TodoMenu = React.createClass({
	render: function() {
		return (
			<div>
				Hi, A am TodoMenu
				<button>Clear All</button>
				<button>Delete selected</button>
			</div>);
	}
});

var TodoElement = React.createClass({
	handleCheck: function() {
		console.log("note.done = " + this.props.note.done + " checkbox = " + this.refs.todoCheckbox.checked);

		this.props.onUserChecked(this.props.index, this.refs.todoCheckbox.checked);
	},

	render: function() {
		console.log("index value: " + this.props.index);

		var todo_text = this.props.done ?
			<span style={{color: 'red'}}>
				{this.props.note.text}
			</span> :
			this.props.note.text;

		return(
			<div>
					<input
						type="checkbox"
						/*checked={this.props.note.done}*/
						ref="todoCheckbox"
						onChange={this.handleCheck}
					/>
					{todo_text}
			</div>
		);
	}
});

var TodoList = React.createClass({
	handleCheck: function(index, done) {
		console.log("We handle in TodoList index: " + index + " doneStatus: " + done);
		this.props.todos[index] = done;
		console.log("todos with index: " + index + " = " + this.props.todos[index]);

	},

	render: function() {
		var self = this;
		var todo_rows = [];
		this.props.todos.forEach(function(note) {
			todo_rows.push(
				<TodoElement
					note={note}
					index={todo_rows.length + 1}
					onUserChecked={self.handleCheck}
				/>
			);
		});
		return (
			<div>
				Task text: {this.props.newTaskText}
				<br/>
				{todo_rows}
			</div>
		);
	}
});

var TodoForm = React.createClass({
	handleInputChange: function() {
		this.props.onUserInput(
			this.refs.newTodoInput.value
		);
	},

	render: function() {
		return (
			<div>
				<input
					type="text"
					placeholder="Todo..."
					value={this.props.newTaskText}
					ref="newTodoInput"
					onChange={this.handleInputChange}
				/>
				<button>Add</button>
			</div>
		);
	}
});

var TodoTable = React.createClass({
	handleUserInput: function(newTaskText) {
		this.setState({
			newTaskText: newTaskText
		});

	},
	getInitialState: function() {
		return {
			newTaskText: ''
		};

	},
	render: function() {
		var self = this
		this.props.todos_data.forEach(function(note) {
			console.log("["+self.props.todos_data.indexOf(note)+"] = " + note.done);
		});
		return (
			<div>
				<TodoMenu />
				<TodoList
					todos={this.props.todos_data}
					newTaskText={this.state.newTaskText}
				/>
				<TodoForm
					onUserInput={this.handleUserInput}
					newTaskText={this.state.newTaskText}/>
			</div>
		);
	}

});

ReactDOM.render(
	<TodoTable todos_data={TODO_DATA} />,
	document.getElementById('TodoListContainer')
);
