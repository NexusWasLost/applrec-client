import { API_BASE, getId } from "./root.js";

const delBtn = document.querySelector(".del-btn");
const goBackBtn = document.querySelector(".go-back-btn");

function goback(){
    window.location.href = "/";
}

async function del(){
    const payload = {
        id: getId()
    }

    try {
        const res = await fetch(API_BASE + "/api/del-appl", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("Record Deleted successfully!");
            window.location.href = "/";
        }
    }
    catch (error) {
        console.log("Update failed: ", error);
    }
}

delBtn.addEventListener("click", del);
goBackBtn.addEventListener("click", goback);
