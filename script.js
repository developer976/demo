const fetchAll = async (pages) => {
    // e.preventDefault(); 
  let query = document.getElementById("input-field").value;
  let page = pages;
  const apiUrl = `https://www.eporner.com/api/v2/video/search/?query=${query}&per_page=30&page=${page}&thumbsize=big&order=top-weekly&gay=0&lq=1&format=json`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let html = "";
      data.videos.forEach((e) => {
        let thumbsHTML = "";
        for (const img of e.thumbs) {
          thumbsHTML += `<img src="${img.src}" alt="imgs" />`;
        }
        html += `
        <div class="card">
        <img class="mainImg" src="${e.default_thumb.src}" alt="Image 1" />
        <div class="images">
        ${thumbsHTML}
        </div>
        <div class="card-content">
        <a href="${e.embed}" target="_blank">
          <h2 class="card-title">${e.title}</h2></a>
          <p class="card-paragraph">
          Duration : 
          ${e.length_min}
          </p>
        </div>
      </div>
        `;
      });
      const cardgrid = document.getElementById("cardgrid");
      cardgrid.innerHTML = html;
      const pagination = (page) => {
        const pegination = document.getElementById("pegination-section");
        pegination.innerHTML = `
        <ul class="pagination">
        <li onClick="fetchAll(${
          page - 1
        })"><a href="#" class="prev">Previous</a></li>
        <li><a href="#" onClick="fetchAll(1);" class="next"><<</a></li>
        <li><a href="#" class="page current">${page}</a></li>
        <li onClick="fetchAll(${
          data.total_pages
        });"><a href="#" class="next">>></a></li>
        <li onClick="fetchAll(${
          page + 1
        })"><a href="#" class="next">Next</a></li>
      </ul>
          `;
      };
      pagination(pages);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
