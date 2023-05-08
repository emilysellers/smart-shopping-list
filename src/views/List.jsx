import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { updateItem } from '../api/firebase.js';
import { Link } from 'react-router-dom';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [checkedItemId, setCheckedItemId] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	/*TO DO: Implement guard against user's accidental click. Currently the updated fields (dateLastPurchased and totalPurchases) in Firestore 
	persist when user unchecks item.
	TO DO: Consider adding option for user to navigate home to create a new list.
	TO DO: Redirect user to Add Item view if list is empty.*/

	useEffect(() => {
		if (isChecked) {
			updateItem(listToken, checkedItemId);
		}
	}, [isChecked, listToken, checkedItemId]);

	const filteredList = data.filter((item) => {
		if (searchTerm === '') {
			return item;
		} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return item;
		}
	});

	/* PSEUDOCODE FOR ISSUE #12:
	 * 1. Call comparePurchaseUrgency on filteredList.
	 *     This should return sorted list.
	 *     const sortedList = comparePurchaseUrgency(filteredList)
	 * 2. Map over sorted list and render ListItem with urgency indicator.
	 *     const renderedList = sortedList.map((item) => (
	 *     		<ListItem...
	 *              urgency={item.urgency} .../>
	 */

	const renderedList = filteredList.map((item) => (
		<ListItem
			name={item.name}
			isDefaultChecked={item.isDefaultChecked}
			key={item.id}
			itemId={item.id}
			setCheckedItemId={setCheckedItemId}
			setIsChecked={setIsChecked}
		/>
	));

	const clearSearchField = (e) => {
		e.preventDefault();
		setSearchTerm('');
	};

	const renderedListLength = renderedList.length;

	return (
		<>
			{renderedListLength > 0 ? (
				<>
					<form onSubmit={clearSearchField}>
						<label htmlFor="search-filter">
							Search for an item in your list:
						</label>
						<input
							type="text"
							id="search-filter"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button type="submit">Search</button>
					</form>
					<h3>Here are the items in your list:</h3>
					<ul>{renderedList}</ul>
				</>
			) : (
				<>
					<h2>Your list currently has no items.</h2>
					<h3>Click on the add first item button to start your list.</h3>
					<Link to="/add-item">
						<button>Add first item</button>
					</Link>
				</>
			)}
		</>
	);
}
