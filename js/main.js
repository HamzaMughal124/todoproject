showData();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let savetaskbtn = document.getElementById("savetaskbtn");
let searchtextbox = document.getElementById("searchtextbox");

//  Store Data in Localstorage
addtaskbtn.addEventListener("click", () => {
  let value = addtaskinput.value;
  if (value.trim() != 0) {
    let taskArray = localStorage.getItem("localtask");
    if (taskArray == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(taskArray);
    }
    taskObj.push(value);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }
  addtaskinput.value = "";
  showData();
});

// Show Data in Table After Storing in Localstorage
function showData() {
  let taskArray = localStorage.getItem("localtask");
  if (taskArray == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(taskArray);
  }
  let html = "";
  let table = document.getElementById("addedtasklist");
  taskObj.forEach((item, index) => {
    html += `<tr> 
    <th scope="row">${index + 1}</th>
    <td>${item}</td>
    <td><button type="button" clas="text-primary" onclick="Edit(${index})"><i class="fa fa-edit"></i>Edit</button></td>
    <td><button type="button" clas="text-danger" onclick="Delete(${index})"><i class="fa fa-trash"></i>Delete</button></td>
    </tr>`;
  });
  table.innerHTML = html;
}

// Edit Data
function Edit(index) {
  let saveindex = document.getElementById("saveindex");
  saveindex.value = index;
  let taskArray = localStorage.getItem("localtask");
  taskObj = JSON.parse(taskArray);
  addtaskinput.value = taskObj[index];
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  savetaskbtn.style.display = "block";
  addtaskbtn.style.display = "none";
}

// After Edit Save Data
savetaskbtn.addEventListener("click", () => {
  let saveindex = document.getElementById("saveindex").value;
  let taskArray = localStorage.getItem("localtask");
  taskObj = JSON.parse(taskArray);
  taskObj[saveindex] = addtaskinput.value;
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addtaskinput.value = "";
  showData();
});

//  Delete Data
function Delete(index) {
  let taskArray = localStorage.getItem("localtask");
  taskObj = JSON.parse(taskArray);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showData();
}

// Search Data
searchtextbox.addEventListener("input", () => {
  let trList = document.querySelectorAll("tr");
  Array.from(trList).forEach((item) => {
    let searchedText = item.getElementsByTagName("td")[0].innerText;
    let search = searchtextbox.value;
    let reg = new RegExp(search, "gi");
    if (searchedText.match(reg)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});
