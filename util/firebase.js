const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyD6VED8cr6ShU62zfhIxNOVWZ6uOsoQkQA",
    authDomain: "ieeesbnitd-khvr.firebaseapp.com",
    databaseURL: "https://ieeesbnitd-khvr.firebaseio.com",
    projectId: "ieeesbnitd-khvr",
    storageBucket: "ieeesbnitd-khvr.appspot.com",
    messagingSenderId: "714823060380",
    appId: "1:714823060380:web:56296f85fb306692"
  };

firebase.initializeApp(firebaseConfig);

const fbdb = firebase.database();

fbdb.ref().set({
    name:'harsha'
});

fbdb.ref().update({
    name:'Harsha Services',
    'location/city':'nirmal'
});

// fbdb.ref().once('value').then().catch();

fbdb.ref().on('value',(snapshot)=>{
    const data=snapshot.val();
    console.log(data);
});

// on('child_added')
// on('child_removed')
// on('child_changed')

// fbdb.ref().off()
