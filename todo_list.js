var TODO_DATA = [
	{ done: true, text: "Start typing"},
	{ done: false, text: "Create React app"},
	{ done: false, text: "Do something helpfull"},
];

var TodoMenu = React.createClass({

	handleClickClear: function() {
		this.props.handleClear();
	},

	handleClickDeleteSelected: function() {
		this.props.handleDeleteSelected();
	},

	render: function() {
		return (
			<div>
				<button onClick={this.handleClickClear}>Clear All</button>
				<button onClick={this.handleClickDeleteSelected}>Delete selected</button>
			</div>);
	}
});

var TodoElement = React.createClass({
	handleCheck: function(event) {
		this.props.handleCheck(this.props.index, event.target.checked);
	},

	render: function() {

		var todo_text = this.props.note.done ?
			<span style={{
				textDecoration: 'line-through',
				color: 'grey'
			}}>
				{this.props.note.text}
			</span> :
			this.props.note.text;

		return (
			<div>
					<input
						type="checkbox"
						checked={this.props.note.done}
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
		this.props.handleCheck(index, done);
	},

	render: function() {
		var self = this;
		var todo_rows = [];

		this.props.todos.forEach(function(note) {
			todo_rows.push(
				<TodoElement
					note={note}
					index={todo_rows.length}
					handleCheck={self.handleCheck}
					key={todo_rows.length}
				/>
			);
		});

		return (
			<div>
				<br/>
				{todo_rows}
			</div>
		);
	}
});

var TodoForm = React.createClass({
	getInitialState: function() {
		return {todo_text: ''};
	},

	handleSubmit: function(event) {
		event.preventDefault();

		var input_todo_text = this.state.todo_text;

		if ( input_todo_text.trim().length == 0) return;

		this.props.handleAddTodo(input_todo_text);
		this.setState({todo_text: ''});
	},

	onChangeInput: function(event) {
		this.setState({todo_text: event.target.value});
	},

	render: function() {
		return (
			<div>
				<br/>
				<form onSubmit={this.handleSubmit}>
					<input
						onChange={this.onChangeInput}
						value={this.state.todo_text}
						placeholder="Enter todo text here..."
						ref="newTodoInput"
					/>
					<button class="addBtn">Add</button>
				</form>
			</div>
		);
	}
});

var TodoTable = React.createClass({
	getInitialState: function() {
		return {
			newTaskText: '',
			todos_data: []
		};
	},

	componentDidMount: function() {
		var self = this;
		this.setState({
			todos_data: self.props.todos_data
		});
	},

	handleClear: function() {
		this.setState({
			todos_data: []
		});

	},

	handleDeleteSelected: function() {
		var new_todos_data = [];
		this.state.todos_data.forEach(function(todo, index, todos){
			if (!todo.done) {
				new_todos_data.push(todo);
			}
		});

		this.setState({
			todos_data: new_todos_data
		});

	},

	handleCheck: function(index, check) {
		this.state.todos_data[index].done = check;

		this.setState({
			todos_data: this.state.todos_data
		});

	},

	addTodo: function(todo_text) {
		if (todo_text.length == 0) return;

		this.state.todos_data.push(
			{ done: false, text: todo_text}
		);

		this.setState({
			todos_data: this.state.todos_data
		});
	},

	render: function() {
		return (
			<div>
				<TodoMenu
					handleClear={this.handleClear}
					handleDeleteSelected={this.handleDeleteSelected}
				/>
				<TodoList
					todos={this.state.todos_data}
					handleCheck={this.handleCheck}
				/>
				<TodoForm
					handleAddTodo={this.addTodo}
				/>
			</div>
		);
	}

});

ReactDOM.render(
	<TodoTable todos_data={TODO_DATA} />,
	document.getElementById('TodoListContainer')
);
