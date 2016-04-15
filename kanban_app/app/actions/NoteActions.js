import alt from '../libs/alt';


/*
To keep this simple, we can CRUD (Create, Read, Update, Delete) it. 
Given Read is implicit, we won't be needing that. We can model the 
rest as actions, though. Alt provides a shorthand known as 
generateActions. We can use it like this:
*/
export default alt.generateActions('create', 'update', 'delete');