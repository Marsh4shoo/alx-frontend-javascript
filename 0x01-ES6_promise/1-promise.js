
rt default function getFullResponseFromAPI(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve({ status: 200, body: 'Success' });
    } else {
      reject(new Error('The fake API is not working currently'));
    }
  });
}
Create 1-main.js to test:
js
Copy code
import getFullResponseFromAPI from './1-promise';

console.log(getFullResponseFromAPI(true));
console.log(getFullResponseFromAPI(false));
Run the test:
sh
Copy code
npm run dev 1-main.js
Task 2: Catch me if you can!
Create 2-then.js with the following content:
js
Copy code
export default function handleResponseFromAPI(promise) {
  return promise
    .then(() => ({ status: 200, body: 'success' }))
    .catch(() => new Error())
    .finally(() => {
      console.log('Got a response from the API');
    });
}
Create 2-main.js to test:
js
Copy code
import handleResponseFromAPI from "./2-then";

const promise = Promise.resolve();
handleResponseFromAPI(promise);
Run the test:
sh
Copy code
npm run dev 2-main.js
Task 3: Handle multiple successful promises
Create 3-all.js with the following content:
js
Copy code
import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
    .then((values) => {
      console.log(`${values[0].body} ${values[1].firstName} ${values[1].lastName}`);
    })
    .catch(() => {
      console.log('Signup system offline');
    });
}
Create 3-main.js to test:
js
Copy code
import handleProfileSignup from "./3-all";

handleProfileSignup();
Run the test:
sh
Copy code
npm run dev 3-main.js
Task 4: Simple promise
Create 4-user-promise.js with the following content:
js
Copy code
export default function signUpUser(firstName, lastName) {
  return Promise.resolve({ firstName, lastName });
}
Create 4-main.js to test:
js
Copy code
import signUpUser from "./4-user-promise";

console.log(signUpUser("Bob", "Dylan"));
Run the test:
sh
Copy code
npm run dev 4-main.js
Task 5: Reject the promises
Create 5-photo-reject.js with the following content:
js
Copy code
export default function uploadPhoto(fileName) {
  return Promise.reject(new Error(`${fileName} cannot be processed`));
}
Create 5-main.js to test:
js
Copy code
import uploadPhoto from './5-photo-reject';

console.log(uploadPhoto('guillaume.jpg'));
Run the test:
sh
Copy code
npm run dev 5-main.js
Task 6: Handle multiple promises
Create 6-final-user.js with the following content:
js
Copy code
import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  return Promise.allSettled([userPromise, photoPromise]).then((results) => {
    return results.map((result) => ({
      status: result.status,
      value: result.value || result.reason,
    }));
  });
}
Create 6-main.js to test:
js
Copy code
import handleProfileSignup from './6-final-user';

console.log(handleProfileSignup("Bob", "Dylan", "bob_dylan.jpg"));
Run the test:
sh
Copy code
npm run dev 6-main.js
Task 7: Load balancer
Create 7-load_balancer.js with the following content:
js
Copy code
export default function loadBalancer(chinaDownload, USDownload) {
  return Promise.race([chinaDownload, USDownload]);
}
Create 7-main.js to test:
js
Copy code
import loadBalancer from "./7-load_balancer";

const ukSuccess = 'Downloading from UK is faster';
const frSuccess = 'Downloading from FR is faster';

const promiseUK = new Promise((resolve) => {
  setTimeout(resolve, 100, ukSuccess);
});

const promiseUKSlow = new Promise((resolve) => {
  setTimeout(resolve, 400, ukSuccess);
});

const promiseFR = new Promise((resolve) => {
  setTimeout(resolve, 200, frSuccess);
});

const test = async () => {
  console.log(await loadBalancer(promiseUK, promiseFR));
  console.log(await loadBalancer(promiseUKSlow, promiseFR));
}

test();
Run the test:
sh
Copy code
npm run dev 7-main.js
Task 8: Throw error / try catch
Create 8-try.js with the following content:
js
Copy code
export default function divideFunction(numerator, denominator) {
  if (denominator === 0) {
    throw new Error('cannot divide by 0');
  }
  return numerator / denominator;
}
Create 8-main.js to test:
js
Copy code
import divideFunction from './8-try';

console.log(divideFunction(10, 2));
console.log(divideFunction(10, 0));
Run the test:
sh
Copy code
npm run dev 8-main.js
Task 9: Throw an error
Create 9-try.js with the following content:
js
Copy code
export default function guardrail(mathFunction) {
  const queue = [];
  try {
    const value = mathFunction();
    queue.push(value);
  } catch (error) {
    queue.push(`Error: ${error.message}`);
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
Create 9-main.js to test:
js
Copy code
import guardrail from './9-try';
import divideFunction from './8-try';

console.log(guardrail(() => { return divideFunction(10, 2)}));
console.log(guardrail(() => { return divideFunction(10, 0)}));
Run the test:
sh
Copy code
npm run dev 9-main.js
Task 10: Await / Async
Create 100-await.js with the following content:
js
Copy code
import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    const [photo, user] = await Promise.all([uploadPhoto(), createUser()]);
    return { photo, user };
  } catch (error) {
    return { photo: null, user: null };
  }
}
Create 100-main.js to test:
js
Copy code
import asyncUploadUser









