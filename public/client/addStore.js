let storeForm = document.querySelector("#store-form");
let storeId = document.querySelector("#store-id");
let storeAddress = document.querySelector("#store-address");

storeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill all fields");
  } else {
    let body = {
      storeId: storeId.value,
      address: storeAddress.value,
    };
    try {
      let res = await fetch("/api/v1/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 400) {
        throw new Error("Store already exists");
      }
      alert("Store added");
      window.location.href = "/index.html";
    } catch (error) {
      alert(error.message);
    }
  }
});
