mapboxgl.accessToken =
  "pk.eyJ1IjoiaG1kcnphYTExIiwiYSI6ImNrZXZlcmY1OTA1M2IyeWpwcTByajRvM3MifQ.OGq8xj7i3eUrl3kQO8VneQ";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [11.8472574, 42.9593083], //center or default position
});
//fetch stores
async function fetchStores() {
  let res = await fetch("/api/v1/stores");
  let data = await res.json();
  let stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [...store.location.coordinates],
      },
      properties: {
        storeId: store.storeId, //show id as the pointer
        icon: "shop", //icon
      },
    };
  });
  return stores;
}

//load maps
function loadMap(stores) {
  console.log(stores);
  map.on("load", function () {
    map.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("cat", image);
        map.addSource("point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stores,
          },
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "cat",
            "icon-size": 0.25,
            "text-field": "{storeId}",
            "text-offset": [0, 0.9],
            "text-anchor": "top",
          },
        });
      }
    );
  });
}
fetchStores().then((stores) => {
  loadMap(stores);
});
