const API_BASE = "https://applrec-serv.qe7.workers.dev";

const recordsList = document.querySelector("#records-list");
const placeholder = document.querySelector("#placeholder-text");
const addForm = document.querySelector("#add-form");
const btnSearch = document.querySelector("#btn-search");
const btnShowAll = document.querySelector("#btn-show-all");
const totalSpan = document.querySelector("#total-count");

const formatDate = function (rawDate) {
    if (!rawDate) return "-";

    const formattedDate = new Date(rawDate).toLocaleDateString(undefined, {
        timeZone: "UTC",
        dateStyle: "medium"
    });

    return formattedDate;
}

const renderItems = function (dataArray) {
    recordsList.innerHTML = "";

    if (!dataArray || dataArray.length === 0) {
        placeholder.innerText = "No records found.";
        placeholder.classList.remove("hidden");
        totalSpan.innerText = "0";
        return;
    }

    // Hide the placeholder and show the list
    placeholder.classList.add("hidden");

    dataArray.forEach(function (item) {
        //format date for each item
        item.appldate = formatDate(item.appldate);

        const li = document.createElement("li");
        li.className = "record-item";
        li.innerHTML = "<strong>" + item.companyname + "</strong> - " + item.position +
            "<br><small>" + (item.appldate || 'No Date') + " | Status: " + item.status + "</small>";
        recordsList.appendChild(li);
    });

    totalSpan.innerText = dataArray.length;
};

const loadAll = async function () {
    try {
        const res = await fetch(API_BASE + "/api/get-appl");
        const json = await res.json();
        renderItems(json.data);
    }
    catch (err) {
        console.error("Fetch failed:", err);
    }
};

const searchCompany = async function () {
    const q = document.querySelector("#search-input").value;
    if (!q) return;
    try {
        const res = await fetch(API_BASE + "/api/search?q=" + q);
        const json = await res.json();

        if (typeof json.data !== "object") {
            alert(json.data);
            return;
        }

        renderItems(json.data);
    }
    catch (error) {
        console.error("Search failed:", error);
    }
};

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
    } catch (err) {
        console.error("Submission failed:", err);
    }
});

btnShowAll.addEventListener("click", function () {
    loadAll();
});

btnSearch.addEventListener("click", function () {
    searchCompany();
});
