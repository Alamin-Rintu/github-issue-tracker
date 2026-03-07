const loadingSpinner = document.getElementById("loadingSpinner");
const totalIssue = document.getElementById("total-issue");

const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  showLoading();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayIssues(data.data);
      hideLoading();
    });
};

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
    // labels loop
    const labelsHTML = issue.labels
      .map(
        (label) =>
          `<div class="badge badge-soft badge-warning text-xs sm:text-sm">
            ${label}
          </div>`,
      )
      .join("");
    createDiv.innerHTML = `
            <div onclick="loadIssueDetail(${issue.id})" class="card bg-white p-4 space-y-3 w-full">
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

          <!-- Badges -->

          <!-- Labels -->
          <div class="flex flex-wrap gap-2">
            ${labelsHTML}
          </div>
          <div class="border-b border-gray-200 my-3"></div>
          <div
            class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-[12px] text-gray-500"
          >
            <span>#1 by <span> ${issue.author}</span></span>
            <span>${issue.createdAt}</span>
          </div>
        </div>
    `;

    cardContainer.append(createDiv);
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

loadIssues();
