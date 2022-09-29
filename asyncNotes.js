
/*// - Synchronous vs Asynchronous
	- From MDN:
		- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
		- Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.
		- Many functions provided by browsers, especially the most interesting ones, can potentially take a long time, and therefore, are asynchronous. For example:
			- Making HTTP requests using fetch()
			- Accessing a user's camera or microphone using getUserMedia()
			- Asking a user to select files using showOpenFilePicker()
		- So even though you may not have to implement your own asynchronous functions very often, you are very likely to need to use them correctly.
	- A synchronous program is a program that relies on the proper execution of each line in the code in order to function
	- The advantage of a synchronous program is that the developer can be certain of the order of operations and how they will execute
	- The disadvantage of synchronous programs is that if there is a long running task, the rest of the program must wait for that task to complete before continuing
	- When it comes to browser based applications, users are usually not willing to wait for an unresponsive browser to complete its task. Mainly because they want to still be able to browse other parts of the webpage while the task is waiting to be completed. Otherwise, they will assume that the browser is frozen and will leave the site.
		- _Fun-Fact_: The average user will only wait 2 seconds before assuming the browser is locked up and leaves the site.
	- There are many usecases in which the browser must be able to continue its operations while waiting for some event to happen. E.G.
		- The browser may be waiting for a user to trigger an event listener
		- The browser may be waiting for an API call to resolve
		- The browser may be loading in static assests such as images or videos
	- In these cases, we want to allow the user to continue to operate the site, while we wait for these events to resolve
- Async JS
	- JS is synchronous single threaded blocking language
		- Meaning the program can only run a single execution at a time (single-threaded)
		- Blocking means that if there is a line of code that takes time to run, the rest of the program is BLOCKED from running
	- The JS world has implemented features in order to make the language behave like an asynchronous language in certain cicumstances. This was implemented for the browser so that any long-running function would not lock up any other functions. 
	- The main way JS gets around blocking execution is through the event loop
		- The event loop is a second stack that can store functions for later execution
		- The callback function is the function that gets pushed onto the event loop stack to execute AFTER a certain condition as been met (usually some amount of time has passed)
	- The "old" way of handling long-running functions that depended on each other to execute was to nest callbacks. In this way, a callback could resolve and the nest callback that depended on the first callback could then resolve afterward, and so on. This led to a problem called "callback hell" in which you would have lots nested callbacks within each other. 
	- The modern way of handling asynchronous functions is to use a Promise. When the promise is created, the handler function will be pushed onto the event stack and will complete after a certain condition has been met. We can chain code off of a promise in order to run asynchronous code and not block the rest of the program from exeucting.
- Promises
	- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
	- A promise is a specific type of JS function that when called, will initially return a unsettled Promise object. Then when the function resolves with a success or a failure, the Promise will settle and the code that is waiting for the promise to complete will proceed to execute.
	- Promises have three states
		- Pending: meaning that the promise is on the queue and waiting to be called by the event loop and/or waiting for some operation to resolve (such as a database call)
		- Fulfilled: meaning that the promise has succesfully completed its execution and has resolved with a value for the rest of the code to use
		- Rejected: meaning that the promise has failed to execute for some reason and is throwing an error
	- Here is how a promise is written:
		- const myPromise = new Promise((resolve, reject) => {
				setTimeout(() => {
					const data = getData()
					resolve(data)
				}, 2000);
			})
	- The promise will execute when it is invoked and after the setTimeout completes (meant to simulate a asynchronous operation we have to wait for), we resolve the fetched data.
- Async/Await
	- Async and await are two keywords that allow us to write more concise promise based code.
		- First, a function is declared as an async function, which tells JS that the execution of the function must pause at await before continuing, i.e. the function is expecting to be blocked at a certain point
		- Second, we use the await keyword to flag any promise within our function that the code needs to wait for before executing, i.e. we block the execution until the promise resolves
	- In the async function, the normally asynchronous JS code which would skip over the promise before it could resolve, will now wait for the promise to resolve before completing the rest of its execution.
- Most common use case
	- Many of the promises that we will have to use async/await for have already been "promisified" which is when you turn a normal JS function into a promise and return that promise in the function call.
	- const getDataPromisified = () => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					const data = getData()
					resolve(data)
				}, 2000);
			})
		} 
	- The advantage here is that we can call the function getDataPromisified as a normal function and await it. Then when the promise finally resolves, our code will continue its execution. In the below case, we will wait for the promise returned from getDataPromisified to fulfill before calling the console.log for data below it.
		- const asyncFunc = async () => {
				console.log("starting promise")
				const data = await getDataPromisified()
				console.log("completed promise")
				console.log(data)
			}
			asyncFunc()
- Additional resources:
	- https://betterprogramming.pub/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb#:~:text=under%20the%20hood.-,JavaScript%20is%20Synchronous,in%20progress%20at%20a%20time.
	- https://www.youtube.com/watch?v=8aGhZQkoFbQ

    */