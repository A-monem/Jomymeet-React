import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics"

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getStudents = () => {
  return new Promise((resolve, reject) => {
    firestore.collection("users").where("type", '==', 'student')
      .onSnapshot((snapshot) => {
        let updatedData = snapshot.docs.map(doc => doc.data())
        resolve(updatedData)
    }, reject)
  })
}

export const addStudent = (student) => {
    student['type'] = 'student'
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(student.email, "student123")
        .then((user) => {
          firestore.collection("users").doc(user.user.uid).set(student)
          resolve()
        })
        .catch(function(error) {
          console.log("error creating a user", error)
          reject()``
    });
    })
}

export const updateStudent = (student) => {
    student['type'] = 'student'
    return new Promise((resolve, reject) => {
      try{
        firestore.collection("users").where("email", '==', student.email).get()
          .then((snapshot) => {
            const id = snapshot.docs.map(doc => doc.id)
            firestore.collection("users").doc(id[0]).update(student)
            resolve()
        })
      } catch(e){
        console.log(e)
        reject()
      }
  })
}

export const deleteStudent = (student) => {
  return new Promise((resolve, reject) => {
    try{
      firestore.collection("users").where("email", '==', student.email).get()
        .then((snapshot) => {
          const id = snapshot.docs.map(doc => doc.id)
          firestore.collection("users").doc(id[0]).delete()
            .then(() => {
              resolve()
            })
      })
    } catch(e){
      console.log(e)
      reject()
    }
  })
}

export const getAllTimetables = () => {
  return new Promise((resolve, reject) => {
    try{
      const gradeTimetable = {}
      firestore.collection("timetable").get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          gradeTimetable[doc.id] = doc.data()
        })
      })
      .then(() => {
        resolve(gradeTimetable)
      })
    } catch(e) {
      console.log(e)
      reject()
    }
  })
}

export const getTimetable = (grade, classroom) => {
  return new Promise((resolve, reject) => {
    try{
      firestore.collection("timetable").doc(grade).get()
      .then((snapshot) => {
          resolve(snapshot.data()[classroom])
        })
    } catch(e) {
      console.log(e)
      reject()
    }
  })
}

export const addTimetable = (grade, timetable) => {
  return new Promise((resolve, reject) => {
    try{
        console.log(timetable)
        // const classroomTimetable = {}
        // classroomTimetable[classroom] = timetable
        firestore.collection("timetable").doc(grade).set(timetable)
        resolve()
    } catch(e) {
      console.log(e)
      reject()
    } 
  });
}