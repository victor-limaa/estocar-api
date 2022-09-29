const firebase = require('firebase')
require('firebase/app')
require('firebase/firebase-app')
require('firebase/firebase-storage')


var config = {
  apiKey: "AIzaSyCE_SSQXqMW0i2X_caYSvLIIlFO1Yz2oqo",
  authDomain: "estocar-8dd7b.firebaseapp.com",
  databaseURL: "https://estocar-8dd7b.firebaseio.com",
  projectId: "estocar-8dd7b",
  storageBucket: "estocar-8dd7b.appspot.com",
  messagingSenderId: "685455654187",
  appId: "1:685455654187:web:c98d5c7ea5f9d2a031d96e"
};

const stg = firebase.initializeApp(config);

const storage = stg.storage()

var ref = storage.ref('images/')

function fbStorage(params) {
  ref.put(params)
}


module.exports = fbStorage