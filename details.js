const url_base = "https://gateway.marvel.com";
const apikey = "eb21a48643b2901fea305523c0c44e18";
const ts = Math.random();
const hash = md5(`${ts}0e3a61991d39296e0a077cc5d72cfb52017aa85d${apikey}`);
let idSuperHeroe = localStorage.getItem("id_sh");

$.ajax({
  url: `${url_base}/v1/public/characters/${idSuperHeroe}?ts=${ts}&apikey=${apikey}&hash=${hash}`,
  success: function (result) {
    $(".title").text(`${result.data.results[0].name} Details`);
    if (result.data.results[0].description === "") {
      $(".paragraph").append("No description");
    }
    $(".paragraph").append(
      document.createTextNode(result.data.results[0].description)
    );
    $("#image_sh").attr(
      "src",
      `${result.data.results[0].thumbnail.path}.${result.data.results[0].thumbnail.extension}`
    );
  },
});

$(".right").click(function (event) {
  event.preventDefault();
  location.assign("./index.html");
});
