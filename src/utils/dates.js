export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const CURRENT_DATE = new Date();

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Compute days between two JavaScript Date objects.
 * @param {Date} starting date of interval
 * @param {Date} ending date of interval
 */
export function getDaysBetweenDates(startingDate, endingDate) {
	// normalize date by converting to time
	const startingDateInMilliseconds = startingDate.getTime();
	const endingDateInMilliseconds = endingDate.getTime();

	// calculate the number of days that elapsed between both times
	const daysElapsed = Math.floor(
		(endingDateInMilliseconds - startingDateInMilliseconds) /
			ONE_DAY_IN_MILLISECONDS,
	);

	return daysElapsed;
}

/**
 * Sorting compare callback function. Defines sorting order based on decreasing purchasing urgency.'
 * @param {Date} first element up for comparison.
 * @param {Date} second element up for comparison.
 */
function compareItemUrgencyCallback(itemA, itemB) {
	const today = new Date();
	const dateNextPurchasedA = itemA.dateNextPurchased.toDate();
	const dateNextPurchasedB = itemB.dateNextPurchased.toDate();
	const itemANumOfDays = getDaysBetweenDates(today, dateNextPurchasedA);
	const itemBNumOfDays = getDaysBetweenDates(today, dateNextPurchasedB);
	if (itemANumOfDays < itemBNumOfDays) {
		return -1;
	}
	if (itemANumOfDays > itemBNumOfDays) {
		return 1;
	}
	return 0;
}

/**
 * Filter items into active and inactive categories and sort each category based on decreasing purchasing urgency.
 * @param {Object[]} An array of objects representing the user's unsorted list
 * @returns {Object[]} An array of objects representing the user's sorted list.
 */
export function comparePurchaseUrgency(unsortedList) {
	const activeItems = [];
	const inactiveItems = [];
	const today = new Date();
	const todayInMilliseconds = today.getTime();

	// filter items as inactive/active and append an urgency property to each object
	for (let i = 0; i < unsortedList.length; i++) {
		const item = unsortedList[i];
		const dateLastPurchased = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: today;
		const daysSinceLastPurchased = getDaysBetweenDates(
			dateLastPurchased,
			today,
		);
		const dateNextPurchased = item.dateNextPurchased.toDate();
		const dateNextPurchasedInMilliseconds = dateNextPurchased.getTime();
		const daysUntilNextPurchase = getDaysBetweenDates(today, dateNextPurchased);

		// inactive items
		if (
			daysSinceLastPurchased >= 60 &&
			todayInMilliseconds > dateNextPurchasedInMilliseconds
		) {
			item.urgency = 'inactive';
			inactiveItems.push(item);
		}

		// active items
		else {
			if (
				daysSinceLastPurchased < 60 &&
				todayInMilliseconds >= dateNextPurchasedInMilliseconds
			) {
				item.urgency = 'overdue';
			}
			if (daysUntilNextPurchase <= 7) {
				item.urgency = 'soon';
			}
			if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
				item.urgency = 'kind of soon';
			}
			if (daysUntilNextPurchase >= 30) {
				item.urgency = 'not soon';
			}
			activeItems.push(item);
		}
	}

	// sort active and inactive items
	activeItems.sort(compareItemUrgencyCallback);
	inactiveItems.sort(compareItemUrgencyCallback);

	const sortedList = [...activeItems, ...inactiveItems];

	return sortedList;
}

/* PSEUDOCODE FOR ISSUE #12:
 * 1. Write comparePurchaseUrgency function which sorts items by urgency status.
 *     - Take in list of filtered items as an argument and return a sorted list based on purchase urgency.
 *     - Purchase urgency will be assigned using getDaysBetween.
 *
 *	export function comparePurchaseUrgency(unsortedList) {
 *		const active = []
 *		const inactive =[]
 *		today = new Date()
 *
 * 		filter items into active and inactive arrays in list:
 *	 		a. active:
 *	 			if (days since purchased < 60 AND today > dateNextPurchased)
 *					- assign urgency property "overdue"
 *				if (dateNextPurchased < 7 days)
 * 					- assign urgency property "soon"
 * 				if (dateNextPurchased between 7-30 days)
 * 					- assign urgency property "kind of soon"
 * 				if (dateNextPurchased > 30 days)
 *  				- assign urgency property "not soon"
 *				push to active
 * 			b. inactive:
 * 				if (days since purchased > 60 AND today > dateNextPurchased)
 * 					- assign urgency property "inactive"
 *				push to inactive
 *
 *		sort active items:
 *		(TODO: extrapolate comparator function out)
 *			active.sort((a, b) => {
 *				const numOfDaysForAItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				const numOfDaysForBItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				if (numOfDaysForAItem < numOfDaysForBItem){
 *					return -1}
 *				if (numOfDaysForAItem > numOfDaysForBItem){
 *					return 1}
 *				return 0
 *			})
 *		sort inactive items:
 *			inactive.sort((a, b) => {
 *				const numOfDaysForAItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				const numOfDaysForBItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				if (numOfDaysForAItem < numOfDaysForBItem){
 *					return -1}
 *				if (numOfDaysForAItem > numOfDaysForBItem){
 *					return 1}
 *				return 0
 *			})
 * 		const sortedList = concatenate active and inactive arrays
 * 		return sortedList
 * 		}
 */
