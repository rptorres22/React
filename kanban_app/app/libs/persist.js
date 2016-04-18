/*
Persisting Application Using FinalStore
Besides this little utility, we'll need to adapt our application to use it. 
Alt provides a built-in store called FinalStore which is perfect for this 
purpose. We can persist the entire state of our application using FinalStore, 
bootstrapping, and snapshotting. FinalStore is a store that listens to all 
existing stores. Every time some store changes, FinalStore will know about it. 
This makes it ideal for persistency.

We can take a snapshot of the entire app state and push it to localStorage 
every time FinalStore changes. That solves one part of the problem. 
Bootstrapping solves the remaining part as alt.bootstrap allows us to set 
state of the all stores. The method doesn't emit events. To make our stores 
populate with the right state, we will need to call it before the components 
are rendered. In our case, we'll fetch the data from localStorage and invoke 
it to populate our stores.

An alternative way would be to take a snapshot only when the window gets 
closed. There's a Window level beforeunload hook that could be used. The 
problem with this approach is that it is brittle. What if something unexpected 
happens and the hook doesn't get triggered for some reason? You'll lose data.
In order to integrate this idea to our application, we will need to implement a 
little module to manage it. We take the possible initial data into account there 
and trigger the new logic.

app/libs/persist.js does the hard part. It will set up a FinalStore, deal with 
bootstrapping (restore data) and snapshotting (save data). I have included an 
escape hatch in the form of the debug flag. If it is set, the data won't get 
saved to localStorage. The reasoning is that by doing this, you can set the flag 
(localStorage.setItem('debug', 'true')), hit localStorage.clear() and refresh the 
browser to get a clean slate. The implementation below illustrates these ideas:
*/

import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {
	const finalStore = makeFinalStore(alt);

	try {
		alt.bootstrap(storage.get(storeName));
	}
	catch(e) {
		console.error('Failed to bootstrap data', e);
	}

	finalStore.listen(() => {
		if(!storage.get('debug')) {
			storage.set(storeName, alt.takeSnapshot());
		}
	});
}