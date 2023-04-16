function store() {
    // get first name
    let inputExampleInputEmail1 = document.getElementById("exampleInputEmail1");
    // save first name
    localStorage.setItem("user_id", inputExampleInputEmail1.value);
    
  }
     
      //document.body.onload = addUserName(); // attaching the event handler- addUserName function​​
      function addUserName() {
      const userName = localStorage.user_id;
       if (userName !== undefined) {
         document.getElementById("messagename").innerHTML =
         "Welcome, " + userName;
         document.getElementById("cartModalLabel").innerHTML =
         userName + "'s basket"
        }
      }
 