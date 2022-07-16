// ///////////////////////////////////////////////// Accordion FUnctionality ///////////////////////////////////////////////////////
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.children[2].children[0].classList.toggle("fa-angle-down");
        this.children[2].children[0].classList.toggle("fa-angle-up");
        var panel = this.nextElementSibling;
        if (panel.style.display === "flex") {
            panel.style.display = "none";
        } else {
            panel.style.display = "flex";
        }
    });
}
// ///////////////////////////////////////////////// On click SearchBar FUnctionality ///////////////////////////////////////////////////////
var search__input = document.getElementsByClassName("search__input")[0];
var main1 = document.getElementById("main1");
var main2 = document.getElementById("main2");
search__input.addEventListener("click", function () {
    document.getElementById("glass").style.display = "none";
    document.getElementById("xmark").style.display = "block";
    main1.style.display = "none";
    main2.style.display = "block";
})

// ///////////////////////////////////////////////Onclicking the cross button near search bar///////////////////////////////////////
document.getElementById("xmark").addEventListener("click", function () {
    main2.style.display = "none";
    main1.style.display = "block";
    search__input.children[0].value = "";
})
// ///////////////////////////////////////////////// On Key Up SearchBar FUnctionality ///////////////////////////////////////////////////////
let container = document.getElementsByClassName("accounts__container")[0];
const fetcher = async (e) => {
    try {
        const data = await fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${
            e.value
        }`).then(response => response.json());
        if (data) {
            container.innerHTML = "";
            console.log(data);
            data.forEach((result, idx) => { // Create card element
                const card = document.createElement('div');
                card.classList = 'account__card';
                let letter;

                if (!result.log0) {
                    letter = result.company.charAt(0);
                } else {
                    letter = `<img src=${
                        result.logo
                    }/>`;
                }
                // Construct card content
                const content = `
                <div class="account__card">
                            <div class="account__content">
                                <div class="account__avtar">
                                    ${letter}
                                </div>    
                                <div class="account__text">
                                    <div class="company__name">${
                    result.company
                }</div>
                                    <div class="company__site">${
                    result.website
                }</div>
                                </div>    
                            </div>
                            <div class="account__track">
                                <div class="track__button transform" onClick="tracking(this,'${
                    result.company
                }','${
                    result.slug
                }')">Track</div>
                            </div>
                        </div>
                `;

                // Append newyly created card element to the container
                container.innerHTML += content;
                if (!result.logo) {
                    container.getElementsByClassName("account__avtar")[idx].style.background = result.color;
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
};

const tracking = (e, name, slug) => {
    e.innerHTML = "<img src='./assests/spinner.gif' class='spinner'/> Tracking";
    console.log("" + name + " (" + slug + ") " + getTimeStamp());
    setTimeout(function () {
        e.innerHTML = "Tracking";
        e.style.border = "2px solid  #1AAB2B";
        e.style.bordeRadius = "2px";
        e.style.color = " #1AAB2B";
    }, 1000);
}
function getTimeStamp() {
    var now = new Date();
    return((now.getMonth() + 1) + '/' + (
        now.getDate()
    ) + '/' + now.getFullYear() + " " + now.getHours() + ':' + (
    (now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())
) + ':' + (
    (now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())
));
}
// ///////////////////////////////////////////// Hamburger Functiobnality ///////////////////////////////////////////////////////////
let ham = document.getElementById("hamburger");
let overlay = document.getElementsByClassName("overlay")[0];
ham.addEventListener("click", function () {
    document.getElementsByClassName("sideBar")[0].style.display = "flex";
    overlay.style.display = "block";
})
overlay.addEventListener("click", function () {
    document.getElementsByClassName("sideBar")[0].style.display = "none";
    overlay.style.display = "none";

})
