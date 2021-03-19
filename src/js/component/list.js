import React, { useState, useEffect } from "react";

export function CreateList() {
	const [input, setInput] = useState("");
	const [task, setTask] = useState([]);
	const [count, setCount] = useState(1);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/DavidLM", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(respond => {
				return respond.json();
			})
			.then(data => {
				setTask(task.concat(data));
			});
	}, []);

	const handleSubmit = () => {
		if (input != "") {
			let newArray = [...task, { label: input, done: false }];
			setTask(newArray);

			setInput("");

			setCount(count + 1);
		}
		actualizar();
	};

	const actualizar = () => {
		//console.log("ACTUALIZAR");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/DavidLM", {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log("data ", data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const DeleteInput = index => {
		task.splice(index, 1);
		setTask([...task]);

		setCount(count - 1);

		actualizar();
	};

	const KillemAll = () => {
		let emptyArray = [];
		setTask(emptyArray);
		setCount(0);
	};

	return (
		<div className="container-fluid card p-0">
			<div className="card-header">
				<h1 className="card-title text-secondary">TODO</h1>
			</div>
			<div className="card-body pt-0 px-0">
				<input
					className="w-100 border p-3 m-0 font-weight-light text-secondary display-5"
					type="text"
					placeholder="What needs to be done?"
					onChange={e => setInput(e.target.value)}
					onKeyPress={e => (e.key === "Enter" ? handleSubmit() : "")}
					value={input}
				/>
				{task.map((Element, i) => (
					<h5
						className="card-text border w-100 mb-0 p-3 font-weight-light text-secondary text-capitalize"
						id={i}
						onClick={e => DeleteInput(e.target.id)}
						key={i}>
						{" "}
						{Element.label}
					</h5>
				))}
				<button
					type="button"
					className="btn btn-secondary w-100 rounded-0"
					onClick={() => KillemAll()}>
					Eliminate all tasks
				</button>

				<div className="pt-3 pl-3 pb-0 text-muted">
					<small> {count} item left</small>
				</div>
			</div>
		</div>
	);
}
