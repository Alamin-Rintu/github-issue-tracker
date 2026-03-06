const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

const displayIssues = (issues) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  issues.forEach((issue) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
            <div class="card bg-white p-4 space-y-3 w-full">
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
          <div class="flex flex-wrap gap-2">
            <div class="badge badge-soft badge-secondary text-xs sm:text-sm">
              Secondary
            </div>
            <div class="badge badge-soft badge-warning text-xs sm:text-sm">
              Warning
            </div>
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
loadIssues();
