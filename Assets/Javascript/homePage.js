// Go back to login page
var check = localStorage.getItem("status");
console.log(check);
if (check != "true") {
  window.location.href = "login.html";
}
// Logout
function logOut() {
  localStorage.clear();
  window.location.href = "login.html";
}

var firstName = localStorage.getItem("firstName");
var lastName = localStorage.getItem("lastName");
var email = localStorage.getItem("email");
var image = localStorage.getItem("image");

// Profile
document.getElementById("profile-data").innerHTML = ` <div>
<img
  class="rounded-circle border-0 nav-image"
  src="${image}"
  alt=""
/>
</div>
<div class="ms-2">
<h1 class="fs-6 fw-bold text-white mb-0">${firstName} ${lastName}</h1>
<p class="fst-italic m-0 text-muted">${email}</p>
</div>`;

// POSTs
fetch("https://dummyjson.com/products")
  .then((res) => res.json())

  .then((postsData) => {
    let data1 = "";

    postsData.products.map((item, index) => {
      // contenteditable="true"
      data1 += `<div id="card${index}" class="card m-3" style="width: 18rem" >
      <img
        src="${item.images[0]}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <h6 class="mb-0">Price:</h6>
        <p class="ms-2 mt-0 mb-0 text-muted">${item.price}$</p>
        <h5 class="mb-0">Description:</h5>
        <p class="ms-2 card-text text-muted">
        ${item.description}
        </p>
        <div>
        <button
        type="button"
        class="m-2 btn btn-info text-white"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal_${index}"
      >
        <i class="m-1 fa-solid fa-circle-info"></i> see details
      </button>
      <button type="button" class="m-2 btn btn-danger" onclick="del(${index})">
        <i class="m-1 fa-solid fa-trash-can"></i>delete
      </button>
      <button type="button" class="m-2 btn btn-success" onclick="edit(${index})"
      >
        <i class="m-1 fa-solid fa-pen-to-square"></i>Edit
      </button>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal_${index}"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div><img class="w-100" src="${item.images[1]}" alt="" /></div>
                <h4>${item.title}</h4>
                <p><b>Price:</b>${item.price}$</p>
                <p><b>Description:</b>${item.description}</p>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

    `;
    });
    document.getElementById("Post").innerHTML = data1;
  });

// categories
fetch("https://dummyjson.com/products/categories")
  .then((res) => res.json())
  .then((categoriesData) => {
    let data1 = "";
    categoriesData.map((item) => {
      data1 += `<li><a class="dropdown-item" href="#">${item}</a></li>`;
    });
    document.getElementById("categorieData").innerHTML = data1;
  });
// delete
function del(index) {
  fetch(`https://dummyjson.com/products/${index + 1}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then();
  document.getElementById(`card${index}`).innerHTML = "";
}

function edit(index) {
  const editProduct = document.querySelector(`#card${index}`);
  editProduct.setAttribute("contenteditable", "true");
}
