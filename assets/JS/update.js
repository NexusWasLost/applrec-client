import { API_BASE } from "./root.js";

const updateForm = document.querySelector("#update-form");

function getId(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");
    return id;
}

window.addEventListener("load", async function () {

    const id = getId();
    if (!id) return;

    try {
        const res = await fetch(API_BASE + "/api/search-by-id?id=" + encodeURIComponent(id));
        const json = await res.json();

        if (typeof json.data !== "object") {
            alert(json.message);
            return;
        }

        const data = json.data[0];
        document.querySelector("#company-name").value = data.companyname;
        document.querySelector("#position").value = data.position;
        document.querySelector("#appl-date").value = data.appldate;
        document.querySelector("#url").value = data.url;
        document.querySelector("#status").value = data.status;
        document.querySelector("#notes").value = data.notes;
    }
    catch (error) {
        console.log("Fetch by id failed: ", error);
    }
});

updateForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const payload = {
        companyname: document.querySelector("#company-name").value,
        position: document.querySelector("#position").value,
        appldate: document.querySelector("#appl-date").value || null,
        url: document.querySelector("#url").value,
        status: document.querySelector("#status").value || "applied",
        notes: document.querySelector("#notes").value || null,
        id: getId()
    };

    try {
        const res = await fetch(API_BASE + "/api/update-appl", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("Record updated successfully!");
            const json = await res.json();
            console.log(json.message);
        }
    }
    catch (error) {
        console.log("Update failed: ", error);
    }
});
