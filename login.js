function store() {
    // get first name
    let inputExampleInputEmail1 = document.getElementById("exampleInputEmail1");
    // save first name
    localStorage.setItem("exampleInputEmail1", inputExampleInputEmail1.value);
    
  }
     
      //document.body.onload = addUserName(); // attaching the event handler- addUserName function​​
      function addUserName() {
      const userName = localStorage.exampleInputEmail1;
       if (userName !== undefined) {
         document.getElementById("messagename").innerHTML =
         "Welcome, " + userName;
         document.getElementById("cartModalLabel").innerHTML =
         userName + "'s cart"
        }
      }
 