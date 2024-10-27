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
let userId;
let userName;

// Redirect Function
function redi() {
  sessionStorage.setItem('userName', userName);
  window.location.href = "home.html";
}

// Login Function
function sub() {
  var email = document.getElementById('user').value;
  var pass = document.getElementById('pass').value;

  aut.signInWithEmailAndPassword(email, pass)
    .then((creden) => {
      alert('Logged in');
      userId = creden.user.uid;
      console.log('User ID:', userId);
      
      fs.collection('users').doc(userId).get().then((doc) => {
        if (doc.exists) {
          const user = doc.data();
          if (user && user.n) {
            userName = user.n;
            console.log('User Name:', user.n);
            setTimeout(redi, 2000);
          } else {
            alert('No data');
          }
        } else {
          alert('No document found');
        }
      }).catch((error) => {
        alert('Firestore Error: ' + error.message);
      });
    })
    .catch((error) => {
      console.error('Authentication Error:', error.message);
    });
}

// New User Registration and File Upload Function
function newuser() {
  const data = {
    n: document.getElementById('n').value,     // User's name
    ph: document.getElementById('nnu').value,  // User's phone number
    address: document.getElementById('ad').value // User's address
  };

  aut.createUserWithEmailAndPassword(
      document.getElementById('user').value,
      document.getElementById('pass').value
    )
    .then((crede) => {
      alert('User Registered');
      userId = crede.user.uid;
      
      // Add user data to Firestore
      fs.collection('users').doc(userId).set(data)
        .then(() => {
          console.log('User data added to Firestore');
        })
        .catch((error) => {
          console.error('Error adding user data to Firestore:', error.message);
        });

      // File upload process
      var filein = document.getElementById('file');
      var file = filein.files[0]; // Ensure to get the file correctly

      if (!file) {
        document.getElementById('con').innerHTML += 'No file chosen';
        return;
      }

      var storageref = stor.ref('uploads/' + file.name);
      var uptask = storageref.put(file);

      uptask.on(
        'state_changed',
        (snapshot) => {
          const totalBytes = snapshot.totalBytes || 1; // Avoid division by zero
          const progress = (snapshot.bytesTransferred / totalBytes) * 100;
          document.getElementById('con').textContent = 'Upload is ' + progress.toFixed(2) + '% done';
        },
        (error) => {
          console.log('Upload Error:', error.message);
        },
        () => {
          // Get download URL after upload completion
          uptask.snapshot.ref.getDownloadURL().then((url) => {
            console.log('File URL:', url);

            // Update Firestore document with download URL
            const da = { link: url };
            fs.collection('users').doc(userId).set(da, { merge: true })
              .then(() => {
                console.log('Download link successfully added to Firestore:', url);
              })
              .catch((error) => {
                console.log('Error adding link to Firestore:', error.message);
              });
          }).catch((error) => {
            console.log('Error retrieving download URL:', error.message);
          });
        }
      );
    })
    .catch((error) => {
      console.error('User Registration Error:', error.message);
    });
}