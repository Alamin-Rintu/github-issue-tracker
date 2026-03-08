const loadingSpinner = document.getElementById("loadingSpinner");
const totalIssue = document.getElementById("total-issue");
let allIssuesData = [];
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const allBtn = document.getElementById("all-btn");

const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  showLoading();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssuesData = data.data;
      displayIssues(allIssuesData);
      hideLoading();
    });
};

const setActive = (btn) => {
  [openBtn, closedBtn, allBtn].forEach((b) =>
    b.classList.remove("btn-primary"),
  );
  btn.classList.add("btn-primary");
};

openBtn.addEventListener("click", () => {
  setActive(openBtn);
  const openIssues = allIssuesData.filter((issue) => issue.status === "open");
  displayIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActive(closedBtn);
  const closedIssues = allIssuesData.filter(
    (issue) => issue.status === "closed",
  );
  displayIssues(closedIssues);
});

allBtn.addEventListener("click", () => {
  setActive(allBtn);
  displayIssues(allIssuesData);
});

const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
};

const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
};

const displayIssues = (issues) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  totalIssue.innerText = issues.length;

  issues.forEach((issue) => {
    const createDiv = document.createElement("div");

    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    // Labels
    const labelsHTML = issue.labels
      .map(
        (label) => `
        <div class="badge badge-soft badge-warning text-xs sm:text-sm">
          ${label}
        </div>
      `,
      )
      .join("");

    createDiv.innerHTML = `
      <div onclick="loadIssueDetail(${issue.id})" class="card ${borderColor} bg-white p-4 space-y-3 w-full rounded-md shadow-sm">

        <div class="flex justify-between items-center">
          <div class="badge badge-soft badge-secondary text-xs sm:text-sm">
            ${issue.priority}
          </div>
        </div>

        <h3 class="text-sm sm:text-[14px] font-semibold">
          ${issue.title}
        </h3>

        <p class="text-xs sm:text-[12px] text-gray-500">
          ${issue.description}
        </p>

        <div class="flex flex-wrap gap-2">
          ${labelsHTML}
        </div>

        <div class="border-b border-gray-200 my-3"></div>

        <div class="flex justify-between text-xs text-gray-500">
          <span>#${issue.id} by ${issue.author}</span>
          <span>${issue.createdAt}</span>
        </div>

      </div>
    `;

    cardContainer.appendChild(createDiv);
  });
};

const loadIssueDetail = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((details) => displayIssueDetail(details.data));
};

const displayIssueDetail = (issue) => {
  const issueContainer = document.getElementById("issue-container");

  const labelsHTML = issue.labels
    .map(
      (label) => `
        <div class="badge badge-soft badge-warning text-xs sm:text-sm">
          ${label}
        </div>
      `,
    )
    .join("");

  issueContainer.innerHTML = `
    <div class="space-y-4">
      <h3 class="text-lg font-bold">
        ${issue.title}
      </h3>
      <div class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-[12px] text-gray-500">
        <div class="badge badge-soft badge-secondary text-xs sm:text-sm">
          ${issue.status}
        </div>

        <span>
          Opened by <span>${issue.author}</span>
        </span>

        <span>
          ${issue.updatedAt}
        </span>

      </div>

      <div class="flex flex-wrap gap-2">
        ${labelsHTML}
      </div>

      <p class="py-4">
        ${issue.description}
      </p>

      <div class="bg-gray-100 p-4 rounded-md space-y-3">

        <div class="flex justify-between items-center">
          <p>Assignee:</p>
          <p>Priority:</p>
        </div>

        <div class="flex justify-between items-center">
          <p>${issue.assignee || "Not assigned"}</p>

          <div class="badge badge-soft badge-secondary text-xs sm:text-sm">
            ${issue.priority}
          </div>
        </div>

      </div>

    </div>
  `;

  document.getElementById("issue_modal").showModal();
};

/** search**/
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (event) => {
  const value = event.target.value;

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)
    .then((res) => res.json())
    .then((data) => {
      const issues = data.data;
      displayIssues(issues);
    });
});

loadIssues();
