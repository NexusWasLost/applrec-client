export const API_BASE = "https://applrec-serv.qe7.workers.dev";

export const formatDate = function (rawDate) {
    if (!rawDate) return "-";

    const formattedDate = new Date(rawDate).toLocaleDateString(undefined,
        {
            dateStyle: "medium"
        });

    return formattedDate;
}

export const renderItems = function (dataArray, placeholder, recordsList, total) {
    recordsList.innerHTML = "";

    if (!dataArray || dataArray.length === 0) {
        placeholder.innerText = "No records found.";
        placeholder.classList.remove("hidden");
        total.innerText = "0";
        return;
    }

    // Hide the placeholder and show the list
    placeholder.classList.add("hidden");

    dataArray.forEach(function (item) {
        //format date for each item
        item.appldate = formatDate(item.appldate);

        const li = document.createElement("li");
        li.setAttribute("data-id", item.appl_id);
        li.className = "record-item";

        li.innerHTML = `
        <strong>${item.companyname}</strong> - ${item.position}
        <br><small>${item.appldate || "No Date"} | Status: ${item.status}</small>
        <br><small>Link: <a href="${item.url}" target="_blank" rel="noopener">${item.url}</a></small>
        <br><small>Notes: ${item.notes || "N/A"}</small>
        <br><a href="/update.html?id=${ li.getAttribute("data-id") }">Update</a> | <a href="">Delete</a>
        `;

        recordsList.appendChild(li);
    });

    total.innerText = dataArray.length;
};
