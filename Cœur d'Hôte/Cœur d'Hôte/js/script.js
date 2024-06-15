function SignUp(role, statut) {
  let firstName = document.getElementById("firstName").value;

  let verifFirstname = firstName.length >= 3;

  if (verifFirstname) {
    document.getElementById("errorFirstName").innerHTML = "";
  } else {
    document.getElementById("errorFirstName").innerHTML =
      "first name not valid";
  }

  let lastName = document.getElementById("lastName").value;

  let verifLastName = lastName.length <= 12 && lastName.length !== 0;

  if (verifLastName) {
    document.getElementById("errorLastName").innerHTML = "";
  } else {
    document.getElementById("errorLastName").innerHTML = "last name not valid";
  }

  let email = document.getElementById("email").value;

  let verifFormatEmail = validateEmail(email);

  displayError(verifFormatEmail, "errorEmail", "email not valid");
  // problem email
  let verifCheckEmail = checkEmail(email);
  displayError(
    verifCheckEmail,
    "errorCheckEmail",
    "this email is already used"
  );
  let tel = document.getElementById("tel").value;

  let verifTel = tel.length == 8 && Number(tel);
  //   let verifTel = tel.length == 13 && !isNaN(tel);
  if (verifTel) {
    document.getElementById("errorTel").innerHTML = "";
  } else {
    document.getElementById("errorTel").innerHTML = "tel not valid";
  }

  let password = document.getElementById("password").value;

  let verifPassword = CheckPassword(password);

  if (verifPassword) {
    document.getElementById("errorPassword").innerHTML = "";
  } else {
    document.getElementById("errorPassword").innerHTML = "password not valid";
  }

  let cPassword = document.getElementById("cPassword").value;

  let verifCPassword = password === cPassword;
  if (verifCPassword) {
    document.getElementById("errorCPassword").innerHTML = "";
  } else {
    document.getElementById("errorCPassword").innerHTML = "cPassword not much";
  }
  let address = document.getElementById("address").value;

  let verifAddress = validateAddress(address);
  if (verifAddress) {
    document.getElementById("errorAddress").innerHTML = "";
  } else {
    document.getElementById("errorAddress").innerHTML = "address not valid";
  }

  if (
    verifFirstname &&
    verifLastName &&
    verifFormatEmail &&
    verifCheckEmail &&
    verifTel &&
    verifPassword &&
    verifAddress
  ) {
    let T = JSON.parse(localStorage.getItem("users") || "[]");

    let data = {
      id: generateId(T),
      firstName: firstName,
      lastName: lastName,
      email: email,
      tel: tel,
      password: password,
      address: address,
      role: role,
      statut: statut,
    };
    T.push(data);
    localStorage.setItem("users", JSON.stringify(T));
  }
}

function login() {
  let trusted = false;

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === email &&
      users[i].password === password &&
      users[i].statut === true
    ) {
      trusted = true;
      localStorage.setItem("connectedUser", JSON.stringify(users[i].id));
      break;
    }
  }
  if (trusted === true) {
    location.replace("index.html");
  } else {
    document.getElementById("errorLogin").innerHTML = "error";
  }
}

function tableUsers() {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let innerUsers = ``;
  for (let i = 0; i < users.length; i++) {
    innerUsers =
      innerUsers +
      `
     <tr>
     <th scope="row">${users[i].id}</th>
    <td>${users[i].firstName}</td>
     <td>${users[i].lastName}</td>
     <td>${users[i].email}</td>
     <td>${users[i].role}</td>
     <td>${users[i].statut}</td>
     <td><button class="btn btn-danger" onclick='deleteUsers(${
       users[i].id
     })'>Delete</button></td>
     <td><button class="btn btn-info" onclick='validateOwner(${
       users[i].id
     })'> ${users[i].statut === true ? "Refuse" : "Accept"} </button></td>
     </tr>
     `;
  }
  document.getElementById("tableUsers").innerHTML = innerUsers;
}

function validateOwner(id) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].statut = !users[i].statut;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));

  window.location.reload();
}

function addProperty() {
  let T = JSON.parse(localStorage.getItem("products") || "[]");
  let userId = JSON.parse(localStorage.getItem("connectedUser"));
  let houseName = document.getElementById("houseName").value;

  let houseAddress = document.getElementById("houseAddress").value;
  let ville = document.getElementById("ville").value;
  let file = document.getElementById("file").value;
  let description = document.getElementById("description").value;
  let data = {
    id: generateId(T),
    houseName: houseName,
    houseAddress: houseAddress,
    ville: ville,
    file: file,
    description: description,
    userId: userId,
  };
  T.push(data);
  localStorage.setItem("products", JSON.stringify(T));
  localStorage.setItem("propertyId", JSON.stringify(data.id));
}
// properties Admin
function properties() {
  console.log("eeeee");
  let innerProducts = ``;
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  for (let i = 0; i < products.length; i++) {
    innerProducts =
      innerProducts +
      `
      <div class="property-item col-lg-4 col-md-6 col-sm-6">
      <a class="img">
        <img src="images/img_1.jpg" alt="Image" class="img-fluid" />
      </a>
  
      <div class="property-content">
        <div class="mb-2">
      
          <h5 class="city d-block mb-3">${products[i].houseName}</h5>
        </div>
        <div>
          <h6 class="d-block mb-2 text-black-50"
            >${products[i].ville}</h6>
          
          <h6 class="d-block mb-2 text-black-50">${products[i].houseAddress}</h6>
          </div>

          <div
            class="btn btn-primary py-2 px-3" onclick="navigateTo(${products[i].id},'editProperty.html')"
            >Edit House</div
          >
          <div
          class="btn btn-outline-danger py-2 px-3" onclick="deleteProperty(${products[i].id})"
          >Delete House</div>
          
          </div>
    </div>
      
      `;
  }
  document.getElementById("properties").innerHTML = innerProducts;
}

function propertiesUsers() {
  let innerProducts = ``;
  let products = JSON.parse(localStorage.getItem("products") || "[]");

  for (let i = 0; i < products.length; i++) {
    innerProducts =
      innerProducts +
      `
      <div class="property-item col-lg-4 col-md-6 col-sm-6">
      <a class="img">
        <img src="images/img_1.jpg" alt="Image" class="img-fluid" />
      </a>
  
      <div class="property-content">
        <div class="mb-2">
      
          <h5 class="city d-block mb-3">${products[i].houseName}</h5>
        </div>
        <div>
          <h6 class="d-block mb-2 text-black-50"
            >${products[i].ville}</h6>
          
          <h6 class="d-block mb-2 text-black-50">${products[i].houseAddress}</h6>
          </div>

          <div
            class="btn btn-success py-2 px-3" onclick="navigateTo(${products[i].id},'rooms.html')"
            >selection
            </div
          >
        
    </div>
    </div>
      
      `;
  }
  document.getElementById("propertiesUsers").innerHTML = innerProducts;
}

function propertyDetails() {
  console.log("ddddd");
  let propertyId = JSON.parse(localStorage.getItem("propertyId"));
  let products = localStorage.getItem("products");
  let obj;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === propertyId) {
      obj = products[i];
      break;
    }
  }
  document.getElementById("houseName").innerHTML = obj.houseName;
  document.getElementById("description").innerHTML = obj.description;
}

function deleteProperty(id) {
  let T = JSON.parse(localStorage.getItem("products") || "[]");
  let pos;
  for (let i = 0; i < T.length; i++) {
    if (T[i].id === id) {
      pos = i;
      break;
    }
  }
  T.splice(pos, 1);
  localStorage.setItem("products", JSON.stringify(T));
  properties();
}
function deleteUsers(id) {
  let T = JSON.parse(localStorage.getItem("users") || "[]");
  let pos;
  for (let i = 0; i < T.length; i++) {
    if (T[i].id === id) {
      pos = i;
      break;
    }
  }
  T.splice(pos, 1);
  localStorage.setItem("users", JSON.stringify(T));
  tableUsers();
}
function deleteReservation(id) {
  let T = JSON.parse(localStorage.getItem("reservations") || "[]");
  let pos;
  for (let i = 0; i < T.length; i++) {
    if (T[i].id === id) {
      pos = i;
      break;
    }
  }
  T.splice(pos, 1);
  localStorage.setItem("reservations", JSON.stringify(T));
  tableReservations();
}

function editPropertyId() {
  console.log("ffffff");
  let name = document.getElementById("houseName").value;
  let address = document.getElementById("houseAddress").value;
  let ville = document.getElementById("ville").value;
  let desc = document.getElementById("description").value;
  let products = JSON.parse(localStorage.getItem("products"));
  let propertyId = JSON.parse(localStorage.getItem("propertyId"));
  console.log("tttttttttt");
  for (let i = 0; i < products.length; i++) {
    console.log("ooooooooo");
    if (products[i].id === propertyId) {
      console.log("pppppppp");
      products[i].houseName = name;
      products[i].houseAddress = address;
      products[i].ville = ville;
      products[i].description = desc;

      localStorage.setItem("products", JSON.stringify(products));
      window.location.replace("properties.html");
    }
  }
}
function displayProperties() {
  let innerProperties = ``;
  let products = getFromLS("products");
  for (let i = 0; i < products.length; i++) {
    innerProperties =
      innerProperties +
      `<tr>
      <td>
        <h6 id="id">${products[i].id} </h6>
      </td>
      <td>
        <h6 id="name">${products[i].houseName} </h6>
      </td>
      <td>
      <h6 id="add">${products[i].houseAddress} </h6>
      </td>
      <td>
      <h6 id="ville">${products[i].ville}</h6>
      </td>
      <td>
      <h6 id="des">${products[i].description}</h6>
      </td>
      <td>
      <h6 id="userId">${products[i].userId}</h6>
      </td>
      <td>
      <button class="btn- btn-outline-danger rounded-pill" onclick="deleteProperty(${products[i].id})">Supp</button>
      </td>
  
     
  </tr>`;
  }

  document.getElementById("tableproperties").innerHTML = innerProperties;
}

function navigateToRoom(id, path) {
  localStorage.setItem("roomId", JSON.parse(id));
  window.location.replace(path);
}

function addRoom() {
  let T = JSON.parse(localStorage.getItem("rooms") || "[]");
  let roomName = document.getElementById("roomName").value;

  let capacity = document.getElementById("capacity").value;
  let price = document.getElementById("price").value;

  let file = document.getElementById("file").value;
  let description = document.getElementById("description").value;
  let propId = JSON.parse(localStorage.getItem("propertyId"));
  let idOwner = JSON.parse(localStorage.getItem("connectedUser"));

  if (T.length == 0) {
    let data = {
      id: generateId(T),
      roomName: roomName,
      capacity: capacity,
      price: price,
      file: file,
      description: description,
      idOwner: idOwner,
      propertyId: propId,
    };

    T.push(data);

    localStorage.setItem("rooms", JSON.stringify(T));
  } else {
    let maxRooms = 0;
    for (let i = 0; i < T.length; i++) {
      console.log("111111");
      if (Number(T[i].propertyId) === Number(propId)) {
        maxRooms = maxRooms + 1;
      }

      console.log(maxRooms);
    }

    if (maxRooms < 5) {
      let data = {
        id: generateId(T),
        roomName: roomName,
        capacity: capacity,
        price: price,
        file: file,
        description: description,
        idOwner: idOwner,
        propertyId: propId,
      };

      T.push(data);
      localStorage.setItem("rooms", JSON.stringify(T));
    } else {
      document.getElementById("error").innerHTML = "error";
    }
  }
}
function addNewRoom() {
  window.location.replace("addRoom.html");
}
function rooms() {
  let innerRooms = ``;
  let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  let propertyId = JSON.parse(localStorage.getItem("propertyId"));

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].propertyId === propertyId) {
      innerRooms =
        innerRooms +
        `
      <div class="property-item col-lg-4 col-md-6 col-sm-6">
      <a href="property-single.html" class="img">
        <img src="images/img_1.jpg" alt="Image" class="img-fluid" />
      </a>

      <div class="property-content">
        <div id="price" class="price mb-2">
          <span>${rooms[i].price}</span>
        </div>
        <div>
         
          <span class="city d-block mb-3">${rooms[i].roomName}</span>

          <div class="specs d-flex mb-4">
            <span class="d-block d-flex align-items-center me-3">
              <span class="icon-bed me-2"></span>
              <span class="caption">${rooms[i].capacity}</span>
            </span>
      
          </div>

          <div
            class="btn btn-success py-2 px-3" onclick="navigateToRoom(${rooms[i].id},'reservation.html')"
            >select</div
          >
        </div>
      </div>
    </div>
      
      `;
    }
  }
  document.getElementById("properties").innerHTML = innerRooms;
}

function reservation() {
  let T = JSON.parse(localStorage.getItem("reservations") || "[]");
  let room = JSON.parse(localStorage.getItem("roomId"));
  let connectedUser = localStorage.getItem("connectedUser");
  let dateOne = document.getElementById("dateOne").value;

  let dateTwo = document.getElementById("dateTwo").value;
  let persons = document.getElementById("persons").value;
  let inclus = true;
  let nbreRes = 0;
  document.getElementById("error").innerHTML = "";
  if (T.length == 0) {
    let data = {
      id: generateId(T),
      dateOne: dateOne,
      dateTwo: dateTwo,
      persons: persons,
      roomId: room,
      userId: connectedUser,
    };

    T.push(data);
    localStorage.setItem("reservations", JSON.stringify(T));
  } else {
    for (let i = 0; i < T.length; i++) {
      if (Number(T[i].roomId) == Number(room)) {
        const a = moment(dateOne);
        const b = moment(dateTwo);
        const c = moment(T[i].dateOne);
        const d = moment(T[i].dateTwo);
        const range1 = moment.range(a, b);
        const range2 = moment.range(c, d);
        inclus = range1.overlaps(range2);

        console.log(a, "DE");
        console.log(b, "DS");
        console.log(c, "DEr");
        console.log(d, "DSr");
        console.log(range1, "peride demandee");
        console.log(range2, "periode existante");

        console.log(inclus, "occupée");
        if (inclus == true) {
          nbreRes = nbreRes + 1;
        }
      }
      console.log("nbrereservation:" + nbreRes);
    }
    if (nbreRes == 0) {
      let data = {
        id: generateId(T),
        dateOne: dateOne,
        dateTwo: dateTwo,
        persons: persons,
        roomId: room,
        userId: connectedUser,
      };

      T.push(data);
      localStorage.setItem("reservations", JSON.stringify(T));
    } else {
      document.getElementById("error").innerHTML = "Already exist";
    }
  }
}
function tableReservations() {
  console.log("rani 5demt");
  let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  console.log("qqqqq");
  let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  console.log("qqqqq");

  let innerReservation = ``;
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].userId == connectedUser) {
      innerReservation =
        innerReservation +
        `
     <tr>
    <td>${reservations[i].id}</td>
    <td>${reservations[i].roomId}</td>
    <td>${reservations[i].dateOne}</td>
     <td>${reservations[i].dateTwo}</td>
     <td>${reservations[i].persons}</td>
     <td><button class="btn btn-info" onclick='deleteReservation(${reservations[i].id})'>Delete</button></td>
     </tr>
     `;
    }
    console.log("aaaa");
  }
  document.getElementById("tableReservations").innerHTML = innerReservation;
}
function tableReservationsOwner() {
  console.log("ggggg");
  let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  let innerReservation = ``;
  let rooms = JSON.parse(localStorage.getItem("rooms"));
  for (let i = 0; i < reservations.length; i++) {
    let R = findElementById(rooms, Number(reservations[i].roomId));

    if (Number(R.idOwner) == Number(connectedUser)) {
      innerReservation =
        innerReservation +
        `
     <tr>
    <td>${reservations[i].id}</td>
    <td>${reservations[i].roomId}</td>
    <td>${reservations[i].dateOne}</td>
     <td>${reservations[i].dateTwo}</td>
     <td>${reservations[i].persons}</td>
     <td>${reservations[i].userId}</td>
     <!--<td><button class="btn btn-info" onclick='deleteReservation(${reservations[i].id})'>Delete</button></td>;-->
     </tr>
     `;
    }
  }
  document.getElementById("tableReservationsOwner").innerHTML =
    innerReservation;
}
function tableReservationsAdmin() {
  let reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  let connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  let innerReservation = ``;
  let rooms = JSON.parse(localStorage.getItem("rooms"));
  for (let i = 0; i < reservations.length; i++) {
    let R = findElementById(rooms, Number(reservations[i].roomId));

    innerReservation =
      innerReservation +
      `
     <tr>
    <td>${reservations[i].id}</td>
    <td>${reservations[i].roomId}</td>
    <td>${reservations[i].dateOne}</td>
     <td>${reservations[i].dateTwo}</td>
     <td>${reservations[i].persons}</td>
     <td>${reservations[i].userId}</td>
     <td>${R.idOwner}</td>
     <td><button class="btn btn-info" onclick='deleteReservation(${reservations[i].id})'>Delete</button></td>;
     </tr>
     `;
  }
  document.getElementById("tableReservationsAdmin").innerHTML =
    innerReservation;
}

//   const role = new URLSearchParams().get(role);
// }
// function getSingupStatus() {
//   //   const statut = window.location.search.slice(2);
//   const role = new URLSearchParams().get(statut);
// }

// function Generique
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function getPropertyById() {
  let propertyId = JSON.parse(localStorage.getItem("propertyId"));
  let products = JSON.parse(localStorage.getItem("products"));
  let obj;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === propertyId) {
      obj = products[i];
      break;
    }
  }
  document.getElementById("houseName").value = obj.houseName;
  document.getElementById("houseAddress").value = obj.houseAddress;
  document.getElementById("ville").value = obj.ville;
  document.getElementById("description").value = obj.description;
}

function navigateTo(id, path) {
  localStorage.setItem("propertyId", JSON.parse(id));
  window.location.replace(path);
}
function validateEmail(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

function checkEmail(email) {
  let T = JSON.parse(localStorage.getItem("users") || "[]");
  let trusted = true;
  if (T.length === 0) {
    trusted = true;
  } else {
    for (let i = 0; i < T.length; i++) {
      if (T[i].email === email) {
        trusted = false;
        break;
      } else {
        trusted = true;
      }
    }
  }
  return trusted;
}

function CheckPassword(password) {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return re.test(password);
}

function validateAddress(address) {
  let re = /^[a-zA-Z0-9\s,'.-]+$/i;

  return re.test(address);
}

function displayError(condition, id, message) {
  if (condition) {
    document.getElementById(id).innerHTML = "";
  } else {
    document.getElementById(id).innerHTML = message;
  }
}
function generateId(T) {
  if (T.length === 0) {
    return 0;
  } else {
    let maxId = T[0].id;
    for (let i = 0; i < T.length; i++) {
      if (T[i].id > maxId) {
        maxId = T[i].id;
      }
    }
    return maxId + 1;
  }
}
function findElementById(T, id) {
  for (let i = 0; i < T.length; i++) {
    if (T[i].id === id) {
      return T[i];
    }
  }
}

function header() {
  let connectedUser = localStorage.getItem("connectedUser");
  let innerHeader = ``;

  if (connectedUser == null) {
    innerHeader = `


    <div class="container">
    <div>
      <div class="site-navigation">
        <a href="index.html" class="m-0 float-start color="#005555">
          <img src="images/logo-white.png" alt="" />
        </a>
        <ul
          class="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end"
        >
          <li class="active"><a href="index.html">Home</a></li>

          <li class="has-children">
            <a href="signUpAdmin.html">SignUp</a>
            <ul class="dropdown">
              <li><a href="signUpOwner.html">Owner</a></li>
              <li><a href="signUpOwner.html">Client</a></li>
            </ul>
          </li>
          <li><a href="login.html">Login</a></li>
          <!-- <li><a href="contact.html">Contact Us</a></li> -->
        </ul>

        <a
          href="#"
          class="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
          <span></span>
        </a>
      </div>
    </div>
  </div>
   
 `;
  } else {
    let users = getFromLS("users");
    let user = findElementById(users, Number(connectedUser));
    if (user.role == "admin") {
      innerHeader = `
      <div class="container">
      <div class="menu-bg-wrap">
        <div class="site-navigation">
        
        <a href="index.html" class="logo m-0 float-start">
        <img src="images/logo-white.png" alt="" />
      </a>

          <ul class="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
          <li class="active"><a href="index.html">Home</a></li>
          <li class="active"><a href="tableReservationsAdmin.html">Table Reservations</a></li>
          <li class="active"><a href="tableUsers.html">Table Users</a></li>
          <li class="active"><a href="properties.html">Table Properties</a></li>
          <li class="active"><a href="index.html" onclick="logOut()">LogOut</a></li>
          </ul>

          <a href="#"
            class="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
            data-toggle="collapse" data-target="#main-navbar">
            <span></span>
          </a>
        </div>
      </div>
    </div>

   
   `;
    } else {
      if (user.role == "Owner") {
        innerHeader = `

        <div class="container">
        <div class="menu-bg-wrap">
        <div class="site-navigation">
        <a href="index.html" class="logo m-0 float-start">
          <img src="images/logo-white.png" alt="" />
        </a>
  
            <ul class="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
            
            <li class="active"><a href="index.html">Home</a></li>
            <li class="active"><a href="tableReservationsOwner.html">Table Reservations</a></li>
            <li class="active"><a href="tableUsers.html">Table Users</a></li>
            <li class="active"><a href="properties.html">Table Properties</a></li>
            <li class="active"><a href="index.html" onclick="logOut()">LogOut</a></li>
            </ul>
  
            <a href="#"
              class="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
              data-toggle="collapse" data-target="#main-navbar">
              <span></span>
            </a>
          </div>
        </div>
      </div>


     `;
      } else {
        innerHeader = innerHeader = `


        <div class="container">
        <div class="menu-bg-wrap">
        <div class="site-navigation">
        <a href="index.html" class="logo m-0 float-start">
          <img src="images/logo-white.png" alt="" />
        </a>
  
            <ul class="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end">
         
            <li class="active"><a href="index.html">Home</a></li>
            <li class="active"><a href="tableReservations.html">Table Reservations</a></li>
            <li class="active"><a href="propertiesUsers.html">Properties</a></li>
            <li class="active"><a href="index.html" onclick="logOut()">LogOut</a></li>
        
            </ul>
  
            <a href="#"
              class="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
              data-toggle="collapse" data-target="#main-navbar">
              <span></span>
            </a>
          </div>
        </div>
      </div>


     `;
      }
    }
  }
  document.getElementById("headerMenu").innerHTML = innerHeader;
}

function logOut() {
  localStorage.removeItem("connectedUser");
  location.replace("index.html");
}

function search() {
  let word = document.getElementById("word").value;
  let products = getFromLS("products");
  let filtred = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].houseName.toLowerCase().includes(word.toLowerCase())) {
      filtred.push(products[i]);
    }
  }
  console.log(filtred);
  let innerProperties = ``;
  for (let i = 0; i < filtred.length; i++) {
    innerProperties =
      innerProperties +
      `
      <div class="property-item col-lg-4 col-md-6 col-sm-6">
      <a class="img">
        <img src="images/img_1.jpg" alt="Image" class="img-fluid" />
      </a>
  
      <div class="property-content">
        <div class="mb-2">
      
          <h5 class="city d-block mb-3">${filtred[i].houseName}</h5>
        </div>
        <div>
          <h6 class="d-block mb-2 text-black-50"
            >${filtred[i].ville}</h6>
          
          <h6 class="d-block mb-2 text-black-50">${filtred[i].houseAddress}</h6>
          </div>

          <div
            class="btn btn-success py-2 px-3" onclick="navigateTo(${filtred[i].id},'rooms.html')"
            >selection
            </div
          >
        
    </div>
    </div>`;
  }
  document.getElementById("propertiesUsers").innerHTML = innerProperties;
}
