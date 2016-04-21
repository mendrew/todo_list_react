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
			</div>
		);
	}
});

var TodoElement = React.createClass({
	render: function() {
		return(
			<div>
					<input
						type="checkbox"
						checked={this.props.done}
					/>
					{this.props.text}

			</div>
		);
	}
});

var TodoList = React.createClass({
	render: function() {

		var todo_rows = [];
		this.props.todos.forEach(function(note) {
			todo_rows.push(
				<TodoElement checked={note.done} text={note.text} />
			);
		});
		return (
			<div>
				{todo_rows}
			</div>
		);
	}
});

var TodoForm = React.createClass({
	render: function() {
		return (

			<div>
				<input
					type="text"
					placeholder="Search..."
				/>
				<button>Add</button>
			</div>
		);
	}
});

var TodoTable = React.createClass({
	render: function() {
		return (
			<div>
				<TodoMenu />
				<TodoList todos={this.props.todos_data} />
				<TodoForm />
			</div>
		);
	}

});

ReactDOM.render(
	<TodoTable todos_data={TODO_DATA} />,
	document.getElementById('TodoListContainer')
);
