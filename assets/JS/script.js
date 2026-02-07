import { API_BASE, renderItems } from "./root.js";

const recordsList = document.querySelector("#records-list");
const placeholder = document.querySelector("#placeholder-text");
const btnSearch = document.querySelector("#btn-search");
const btnShowAll = document.querySelector("#btn-show-all");
const totalSpan = document.querySelector("#total-count");
const btnSearchDate = document.querySelector("#btn-search-date");
const searchDateInput = document.querySelector("#search-date");

const loadAll = async function () {
    try {
        const res = await fetch(API_BASE + "/api/get-appl");
        const json = await res.json();
        renderItems(json.data, placeholder, recordsList, totalSpan);
    }
    catch (err) {
        console.error("Fetch failed:", err);
    }
};

const searchCompany = async function () {
    const q = document.querySelector("#search-input").value;
    if (!q) return;
    try {
        const res = await fetch(API_BASE + "/api/search?q=" + encodeURIComponent(q));
        const json = await res.json();

        if (typeof json.data !== "object") {
            alert(json.data);
            return;
        }

        renderItems(json.data, placeholder, recordsList, totalSpan);
    }
    catch (error) {
        console.error("Search by Name failed:", error);
    }
};

const searchByDate = async function (){
    const date = searchDateInput.value;
    if(!date) return;

    try{
        const res = await fetch(API_BASE + "/api/search-by-date?d=" + encodeURIComponent(date));
        const json = await res.json();

        if (typeof json.data !== "object") {
            alert(json.data);
            return;
        }

        renderItems(json.data, placeholder, recordsList, totalSpan);
    }
    catch(error){
        console.error("Search by Date failed:", error);
    }
}

btnShowAll.addEventListener("click", loadAll);
btnSearch.addEventListener("click", searchCompany);
btnSearchDate.addEventListener("click", searchByDate);
