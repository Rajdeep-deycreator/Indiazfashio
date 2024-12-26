// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDfa7BdS2Mvqqh1oufYt6MMVcHkGQt_vGY",
  authDomain: "indiazfashion.firebaseapp.com",
  projectId: "indiazfashion",
  storageBucket: "indiazfashion.appspot.com",
  messagingSenderId: "830809729124",
  appId: "1:830809729124:web:2b46b64154d3a968e19771",
  measurementId: "G-MKVN46YLD9"
};

firebase.initializeApp(firebaseConfig);
const fs = firebase.firestore();
const aut = firebase.auth();
const stor = firebase.storage();

// Redirect Function with userName as Parameter
var id
var ui
function redi(userName) {
  if (userName) {
    console.log("Redirecting with userName:", userName);
    sessionStorage.setItem('userName', id);
    window.location.href = "home.html";
  } else {
    console.error("Redirect Error: userName is not set. Check data retrieval.");
    alert("Failed to retrieve user name. Please try again.");
  }
}

// Fetch User Data with Callback for Redirect
function fetchUserData(uid, callback) {
  fs.collection('users').doc(id).get()
    .then((doc) => {
      if (doc.exists) {
        const user = doc.data();
        if (user && user.n) {
          console.log('User Name successfully retrieved:', user.n);
          callback(user.n); // Call the redirect with userName
        } else {
          console.error('User data incomplete or missing "n" field:', user);
          alert('User data incomplete');
          callback(null);
        }
      } else {
        console.error('No document found for user');
        alert('No document found for user');
        callback(null);
      }
    })
    .catch((error) => {
      console.error('Firestore Error while fetching user data:', error.message);
      callback(null);
    });
}

// Login Function
function sub() {
  const email = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  aut.signInWithEmailAndPassword(email, pass)
    .then((creden) => {
      alert('Logged in');
      const uid = creden.user.uid;
      id=uid;
      console.log('User ID after login:', uid);

      // Fetch user data and redirect with callback
      fetchUserData(uid, redi);
    })
    .catch((error) => {
      alert('Authentication Error: check weather your password or email is correct', error.message);
    });
}
function newuser() {
  const email = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  aut.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      const userId = cred.user.uid;

      const userData = {
        n: document.getElementById('n').value,
        address: document.getElementById('ad').value,
        ph: document.getElementById('nnu').value
      };

      return fs.collection('users').doc(userId).set(userData);
    })
    .then(() => {
      alert("User account successfully created!");
      window.location.href="index.html"
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}