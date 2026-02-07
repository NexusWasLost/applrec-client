import { API_BASE } from "./root.js";

const addForm = document.querySelector("#add-form");

addForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const payload = {
        companyname: document.querySelector("#company-name").value,
        position: document.querySelector("#position").value,
        appldate: document.querySelector("#appl-date").value || null,
        url: document.querySelector("#url").value,
        status: document.querySelector("#status").value || "applied"
    };

    try {
        const res = await fetch(API_BASE + "/api/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            addForm.reset();
            alert("Record added successfully!");
        }
    }
    catch (err) {
        console.error("Submission failed:", err);
    }
});
