const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API,
    version: "weekly",
    ...additionalOptions,
});

loader.load().then(async () => {
    const position = { lat: 37.097871, lng: -86.251422 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
    });
});