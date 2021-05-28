const url_base = "https://gateway.marvel.com";
const apikey = "<PUBLIC_KEY>";
const ts = Math.random();
const hash = md5(`${ts}<PRIVATE_KEY>${apikey}`);
let offset = 0,
  total;
const limit = 20;

let getCharanters = function (os = 0) {
  let superHeroes = "";
  $("input.right").hide();
  $.ajax({
    url: `${url_base}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&offset=${os}&limit=${limit}`,
    success: function (result) {
      createHeaderTable();
      total = result.data.total;
      offset = result.data.offset;
      for (const superHeroe of result.data.results) {
        superHeroes +=
          `<tr><td><a class="img_sh" id="${superHeroe.id}" href="javascript:void(0)">` +
          `<img src="${superHeroe.thumbnail.path}.${superHeroe.thumbnail.extension}" alt=""` +
          `</a></td><td><a class="name_sh" id="${superHeroe.id}"href="javascript:void(0)">` +
          superHeroe.name +
          "</a></td><tr>";
      }
      $("#table_sh").append(superHeroes);
      chagePage();
      showPage();
      showBtnPag();
      detailImage();
      detailName();
    },
  });
};

getCharanters();

let detailImage = function () {
  $(".img_sh").on("click", function () {
    localStorage.setItem("id_sh", $(this).attr("id"));
    location.assign("./detail.html");
  });
};

let detailName = function () {
  $(".name_sh").on("click", function () {
    localStorage.setItem("id_sh", $(this).attr("id"));
    location.assign("./detail.html");
  });
};

let chagePage = function () {
  $("#pages").text(
    `pages ${offset / limit + 1} of ${Math.round(total / limit)}`
  );
};

let hidePage = function () {
  $("#pages").hide();
};

let showPage = function () {
  $("#pages").show();
};

let hideBtnPag = function () {
  $(".next").hide();
  $(".prev").hide();
};

let showBtnPag = function () {
  $(".next").show();
  $(".prev").show();
};

let createHeaderTable = function () {
  $("table").append("<tr><th>Images</th><th>Names</th></tr>");
};

let cleanTable = function () {
  $("table tr").remove();
};
$(".prev").click(function () {
  if (offset > 0) {
    cleanTable();
    offset -= limit;
    getCharanters(offset);
  }
});

$(".next").click(function () {
  if (offset < total) {
    cleanTable();
    offset += limit;
    getCharanters(offset);
  }
});

let searchCharacter = function (name) {
  let superHeroes = "";
  if (name === "") {
    getCharanters();
    showPage();
    showBtnPag();
    return;
  }
  $("input.right").show();
  $.ajax({
    url: `${url_base}/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&name=${name}`,
    success: function (result) {
      if (result.data.results.length == 0) {
        alert("character no found or the name is not complete");
        return;
      }
      cleanTable();
      createHeaderTable();
      for (const superHeroe of result.data.results) {
        superHeroes +=
          `<tr><td><a class="img_sh" id="${superHeroe.id}" href="javascript:void(0)">` +
          `<img src="${superHeroe.thumbnail.path}.${superHeroe.thumbnail.extension}" alt=""` +
          `</a></td><td><a class="name_sh" id="${superHeroe.id}"href="javascript:void(0)">` +
          superHeroe.name +
          "</a></td></tr>";
      }
      $("#table_sh").append(superHeroes);
      hidePage();
      hideBtnPag();
      detailImage();
      detailName();
    },
  });
};

$("#button-submit").click(function (event) {
  event.preventDefault();
  searchCharacter($("#q").val());
});

$("input.right").click(function (event) {
  event.preventDefault();
  cleanTable();
  getCharanters();
});
