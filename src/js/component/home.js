import React from "react";
import { CreateList } from "./list";

//create your first component
export function Home() {
	return (
		<div className="row justify-content-center">
			<div className="col-4">
				<CreateList />
			</div>
		</div>
	);
}
