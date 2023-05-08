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

/* PSEUDOCODE FOR ISSUE #12:
 * 1. Write comparePurchaseUrgency function which sorts items by urgency status.
 *     - Take in list of filtered items as an argument and return a sorted list based on purchase urgency.
 *     - Purchase urgency will be assigned using getDaysBetween.
 *
 *	export function comparePurchaseUrgency(filteredList) {
 *		const active = []
 *		const inactive =[]
 *		today = new Date()
 *
 * 		filter items into active and inactive arrays in list:
 *	 		a. active:
 *	 			if (days since purchased < 60 AND today > dateNextPurchase)
 *					- assign urgency property "overdue"
 *				if (dateNextPurchase < 7 days)
 * 					- assign urgency property "soon"
 * 				if (dateNextPurchase between 7-30 days)
 * 					- assign urgency property "kind of soon"
 * 				if (dateNextPurchase > 30 days)
 *  				- assign urgency property "not soon"
 *				push to active
 * 			b. inactive:
 * 				if (days since purchased > 60 AND today > dateNextPurchase)
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
