// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS1Lq4aOszUwl9CBBjHrFmMuEirNrmfjU",
  authDomain: "kraftech-community.firebaseapp.com",
  databaseURL: "https://kraftech-community-default-rtdb.firebaseio.com",
  projectId: "kraftech-community",
  storageBucket: "kraftech-community.appspot.com",
  messagingSenderId: "764221082991",
  appId: "1:764221082991:web:865efc9276f6a22972ec9a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database and storage
let jobFormDB = firebase.database().ref('jobForm');
let storageRef = firebase.storage().ref();

document.getElementById("jobForm").addEventListener("submit", submitForm);
function submitForm(e){
e.preventDefault();


let jobId = getElementVal("job-id");
let jobProfile = getElementVal("profile-name");
let name = getElementVal("name");
let phone = getElementVal("phone");
let gmail = getElementVal("gmail");
let gender = getElementVal("gender");
let options = getElementVal("options");
let university = getElementVal("university");
let resumeFile = document.getElementById("resume").files[0];

// Upload the resume file
let uploadTask = storageRef.child('resumes/' + resumeFile.name).put(resumeFile);

uploadTask.on('state_changed', 
  function(snapshot){
      // Progress function
  }, function(error){
      // Error function
      console.log('Error in uploading file: ', error);
  }, function(){
      // Complete function
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          saveMessages(jobId, jobProfile, name, phone, gmail, gender, options, university, downloadURL);
      });
  }
);

// Show alert after successful submission
alert("Your Form Submitted Successfully, Our Team Will Connect You ASAP!");

// Optionally, you can reset the form after submission
document.getElementById("jobForm").reset();
}

const saveMessages = (jobId, jobProfile, name, phone, gmail, gender, options, university, resumeURL) => {
  let newJobForm = jobFormDB.push();
  newJobForm.set({
      jobId: jobId,
      jobProfile: jobProfile,
      name: name,
      phone: phone,
      gmail: gmail,
      gender: gender,
      options: options,
      university: university,
      resumeURL: resumeURL
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
}