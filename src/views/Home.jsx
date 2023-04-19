import { Navigate } from 'react-router-dom';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import * as React from 'react';
import { streamListItems, validateToken } from '../api/firebase';

export function Home({ setListToken }) {
	const [userListNameInput, setUserListNameInput] = React.useState('');
	const [tokenExists, setTokenExists] = React.useState(false);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	async function handleSumbit(e) {
		e.preventDefault();

		const isValid = await validateToken(userListNameInput);
		console.log(isValid);
		if (isValid) {
			setListToken(userListNameInput);
			setTokenExists(true);
		} else {
			setListToken('');
			setTokenExists(false);
			alert('invalid token input');
		}
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button type="button" onClick={handleClick}>
				Create New List
			</button>

			<form onSubmit={handleSumbit}>
				<label htmlFor="tokenInput">Have a token already? </label>

				<input
					id="tokenInput"
					onChange={(event) => setUserListNameInput(event.target.value)}
				/>

				<button type="submit">Submit</button>
			</form>

			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
