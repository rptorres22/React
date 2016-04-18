/*
To keep things simple and manageable, we can implement a little 
wrapper for storage. It will wrap all of these complexities. 
The API expects strings.

As objects are convenient, we'll use JSON.parse and JSON.stringify 
for serialization. We need just storage.get(k) and storage.set(k, v) 
as seen in the implementation below:

The implementation could be generalized further. You could convert 
it into a factory (storage => {...}) and make it possible to swap 
the storage. Now we are stuck with localStorage unless we change 
the code.
*/

export default {
	get(k) {
		try {
			return JSON.parse(localStorage.getItem(k));
		}
		catch(e) {
			return null;
		}
	},

	set(k, v) {
		localStorage.setItem(k, JSON.stringify(v));
	}
};