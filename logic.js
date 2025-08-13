let box1 = document.querySelector(".list");
let det_div = document.querySelector(".detdiv_before");


const wikiTitleMap = {
    "Aryabhata": "Aryabhata (satellite)",
    "APPLE": "apple (satellite)",

};

async function spacecraft_details(name) {
    try {
        const wikiTitle = wikiTitleMap[name] || name;
        let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`);
        let data = await response.json();

        det_div.innerText = "";

        let desc = document.createElement("p");
        desc.innerText = data.extract || "No description available.";
        det_div.appendChild(desc);

        if (data.thumbnail && data.thumbnail.source) {
            let img = document.createElement("img");
            img.classList.add("imag");
            img.src = data.thumbnail.source;
            img.alt = wikiTitle + " image";
            det_div.appendChild(img);
        }
        if (desc.innerText !== "No description available.") {
            let btn = document.createElement("button");
            btn.classList.add("button");
            btn.innerText = "Read More";
            det_div.append(btn);
            btn.addEventListener('click', () => {
                window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`, '_blank');
            });
        }

    } catch (error) {
        det_div.innerText = "Failed to load details.";
        console.error(error);
    }
}

async function spacecrafts() {
    try {
        let promise = await fetch('https://isro.vercel.app/api/spacecrafts');
        let data = await promise.json();

        data.spacecrafts.forEach(element => {
            let list = document.createElement("li");
            list.classList.add("list");
            list.innerText = element.name;

            list.addEventListener("click", () => {
                det_div.classList.remove("detdiv_before");
                det_div.classList.add("detdiv");
                spacecraft_details(element.name);


            });

            box1.appendChild(list);
        });
    } catch (error) {
        box1.innerText = "Failed to load spacecrafts.";
        console.error(error);
    }
}
spacecrafts();
