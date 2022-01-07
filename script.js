/* ACCORDION */
function myAccFunc() {
    var x = document.getElementById("statusAccord");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-gray";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-gray", "");
    }
}

/* SIDEBAR 
function w3_open() {
  document.getElementById("header").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("header").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
*/


// MAP BOUNDS - set bounds so the map has limits for visibility 
var southWest = L.latLng(40.567, -74.050),
    northEast = L.latLng(40.749858, -73.865),
    bounds = L.latLngBounds(southWest, northEast);

// MAP OBJECT
var mymap = L.map('mapid', {
    maxBounds: bounds, // Then add it here..
    maxZoom: 18,
    minZoom: 12
}).setView([40.65, -73.97], 12);

// BASEMAP
var baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2hlZW5hcCIsImEiOiJja25hdXE3aGcxbGI4MnVxbnFoenhwdGRrIn0.DhFwD-KlRigYLaVwL8ipGA'
}).addTo(mymap);


var zipGroup = new L.layerGroup(); //MAP LAYER
var annualCheckHood = new Array(); //
var cervicalScreenZip = new Array(); // TEAL
var ColorectalScreenZip = new Array(); // NAVY BLUE
var MammographZip = new Array(); // PINK
var cancerZip = new Array(); //
var unInsuredZip = new Array(); //
var smokersZip = new Array(); //
var bingeDrinkers = new Array(); //
var obeseZip = new Array(); //
var inactiveZip = new Array(); //
var asthmaZip = new Array(); //
var kidneyZip = new Array(); //
var sleeplessZip = new Array(); //
var diabeticZip = new Array(); //
var zipData = new Array(); //

//=========================================================== LANGUAGE LAYERS =================================================================

var languageGroup = new L.featureGroup();
// homeLanguage LAYER ADD
var languageLayer = $.getJSON("Brooklyn_Language.geojson", function(data) {

    L.geoJson(data, {
        style: style,
        onEachFeature: function(feature, layer) {
            //ADD LANGUAGE POP UP
            layer.bindPopup('<h3>' + feature.properties.TractName + '</h3> <h5>(' + feature.properties.ntaname +
                ')</h5> <p>Approximately <strong>' + feature.properties.TotalPop +
                '</strong> people live in ' + feature.properties.TractName + ', and around <strong>' + feature.properties.Multi + '%</strong> of these residents speak a language other than English. <br><br> The predominant non-English spoken language is: <strong>' + feature.properties.Predominan + '</strong></p><p style="font-size: 9px;">Data is from the American Community Survey<br> <i>2014-2018 - Language Spoken at Home</i> </p>');

            // ADD MOUSEOVER 
            layer.on('mouseover', function() {
                layer.setStyle({
                    fillOpacity: 0.3
                })
            })
            layer.on('mouseout', function() {
                layer.setStyle({
                    fillOpacity: 0.7
                })
            });
        }
    }).addTo(languageGroup);
});
languageGroup.addTo(mymap)

// homeLanguage LANGUAGE LEGEND

var languageLegend = L.control({
    position: "bottomleft"
});
languageLegend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Predominant Languages</h4>";
    div.innerHTML += '<i style="background: #ccb8cbff"></i><span>African languages</span><br>';
    div.innerHTML += '<i style="background: #fa9993ff"></i><span>Arabic</span><br>';
    div.innerHTML += '<i style="background: #c7e9b4"></i><span>Chinese</span><br>';
    div.innerHTML += '<i style="background: #6b5b95"></i><span>French</span><br>';
    div.innerHTML += '<i style="background: #f7d9b6ff"></i><span>Greek</span><br>';
    div.innerHTML += '<i style="background: #30bfc7ff"></i><span>Haitian Creole</span><br>';
    div.innerHTML += '<i style="background: #eb554dff"></i><span>Hebrew</span><br>';
    div.innerHTML += '<i style="background: #91c1fdff"></i><span>Italian</span><br>';
    div.innerHTML += '<i style="background: #963f92ff"></i><span>Mixed Indic languages</span><br>';
    div.innerHTML += '<i style="background: #51eba6ff"></i><span>Polish</span><br>';
    div.innerHTML += '<i style="background: #e28513ff"></i><span>Russian</span><br>';
    div.innerHTML += '<i style="background: #41ab5d"></i><span>Spanish</span><br>';
    div.innerHTML += '<i style="background: #e7298a"></i><span>Urdu</span><br>';
    div.innerHTML += '<i style="background: #3288bd"></i><span>Yiddish</span><br>';
    div.innerHTML += '<i style="background: #606060"></i><span>No Data</span><br>';
    return div;
}
languageLegend.addTo(mymap);


//=========================================================== PLACES ZIP CODE LEVEL =================================================================

var placesZipLayer = $.getJSON("ZIP_CODE.geojson", function(data) {
    var codes = new Array(); //ordered zip codes empty array

    L.geoJson(data, {
        style: styleCancer,
        onEachFeature: function(feature, layer) {
            //ADD POP UP
            layer.bindPopup('<h3> Zip code: ' + feature.properties.Zip + '</h3> <p>The estimated prevalence rate of cancer (excluding skin cancer) among adults, 18 years and older, for people living in <strong>' + feature.properties.Zip + ' (' + feature.properties.Hood + ') ' +
                '</strong> is <strong>' + feature.properties.CANCER + '%</strong>.</p><p style="font-size: 9px;">Data is from the 2020 PLACES: Local Data for Better Health project</p>');
            layer.on('mouseover', function() {
                layer.setStyle({
                    fillOpacity: 0.3
                })
            })
            layer.on('mouseout', function() {
                layer.setStyle({
                    fillOpacity: 0.7
                })
            });
        }
    }).addTo(zipGroup)



    data.features.forEach(function(feature) {
//$('#zipCodes').append('<option value "' + feature.properties.Zip + '">' + feature.properties.Zip + '</option>');
        // COLLECT NEIGHBORHOOD CHART DATA 
        cancerZip.push([feature.properties.Hood, feature.properties.Ncancer]);
        cervicalScreenZip.push([feature.properties.Hood, feature.properties.Ncervical]);
        ColorectalScreenZip.push([feature.properties.Hood, feature.properties.Ncolorecta]);
        MammographZip.push([feature.properties.Hood, feature.properties.Nmammogr]);
        smokersZip.push([feature.properties.Hood, feature.properties.Nsmoker]);
        bingeDrinkers.push([feature.properties.Hood, feature.properties.Ndrink]);
        obeseZip.push([feature.properties.Hood, feature.properties.Nobese]);
        inactiveZip.push([feature.properties.Hood, feature.properties.Ninactive]);
        unInsuredZip.push([feature.properties.Hood, feature.properties.Nuninsured]);
        annualCheckHood.push([feature.properties.Hood, feature.properties.Nannual]);
        asthmaZip.push([feature.properties.Hood, feature.properties.Nasthma]);
        kidneyZip.push([feature.properties.Hood, feature.properties.Nkidney]);
        sleeplessZip.push([feature.properties.Hood, feature.properties.Nannual]);
        diabeticZip.push([feature.properties.Hood, feature.properties.Ndiabetic]);

zipData.push([
feature.properties.Zip, '<h4><strong>Zip code: '+feature.properties.Zip  +'</strong>:</h4> <h6>Cancer prevelance '+feature.properties.CANCER  + '%</h6> <br> <p>Neighborhood: ' +feature.properties.Hood  +'</p> <p>Estimated Population: ' +feature.properties.Total_popu  +'</p><br> <h5><strong>Language Statistics</strong></h5> <li>Speakers of one or more language other than English: ' +feature.properties.P_bilingua  +'%</li><li>Percent non-English fluent: ' +feature.properties.P_nonFluen  +'%</li> <li>Most commonly spoken non-English language: ' +feature.properties.Predominan  +'</li><br> <h5><strong>Health Statistics</strong></h5> <li>Percent of people who are uninsured: ' +feature.properties.UNINSURED  +'%</li><li>Percent of people who have chronic kidney disease: ' +feature.properties.KIDNEY  +'%</li> <li>Percent of people who have asthma: ' +feature.properties.ASTHMA  +'%</li><li>Percent of people who have diabetes: ' +feature.properties.DIABETES  +'%</li> <li>Percent of people who are smokers: ' +feature.properties.SMOKING  +'%</li> <li>Percent of people who binge drink: ' +feature.properties.DRINK  +'%</li> <li>Percent of people who do not participate in physical activities or exercises: ' +feature.properties.INACTIVE  +'%</li> <li>Percent of people who are obese: ' +feature.properties.OBESITY  +'%</li><li>Percent of people who typically sleep fewer than 7 hours per night: ' +feature.properties.SLEEPLESS  +'%</li><li>Percent of people who have had a routine check up: ' +feature.properties.CHECKUP  +'%</li> <li>Percent of people who have had a colorectal cancer screening: ' +feature.properties.COLORECTAL  +'%</li> <li>Percent of people who have had a cervical cancer screening: ' +feature.properties.CERVICAL  +'%</li> <li>Percent of people who have visited a dentist or dental clinic: ' +feature.properties.DENTAL  +'%</li> <li>Percent of people who have had a mammogram (<i>women aged 50-74 years</i>): ' +feature.properties.MAMMO  +'%</li>'
]);

        // SORT ZIP CODES
        codes.push(feature.properties.Zip);
        codes.sort()
    });

    // ZIP CODE DROPDOWN
    codes.forEach(function(zip) {
        $('#zipCodes').append('<option value "' + zip + '">' + zip + '</option>');
    });



$(document).ready(function(){
  $('#zipCodes').on('change',function(){
  optionText = $("#zipCodes option:selected").text();
//console.log(optionText)
var result;
  for( var i = 0, len = zipData.length; i < len; i++ ) {
    if( zipData[i][0] == optionText ) {
        result = zipData[i];
        break;
    }
  }
displayData = result
displayData.shift()
  document.getElementById("mapContainer1").innerHTML = displayData;
//console.log(result)
 //console.log(typeof(result))
    });
});


    // CHARTS

    $('#CHART_screening').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Percentage of Screening by Neighborhood"
        },
        xAxis: {
            type: 'category',
            allowDecimals: false,
            title: {
                text: ""
            }
        },
        yAxis: {
            title: {
                text: "Percentage (%)"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    rotation: 270,
                    align: 'top',
                    //x: 10,
                    y: -5,
                    crop: true,
                    overflow: "none",
                    verticalAlign: 'top',
                    style: {
                        color: 'black',
                        font: '11px Arial, sans-serif',
                        //fontWeight: 'normal',
                    },
                    pointFormat: '{point.y}{point.percentage:.1f}%'
                }
            }
        },
        series: [{
            name: 'Colorectal Cancer Screening',
            data: ColorectalScreenZip,
            color: '#00008b'
        }, {

            name: 'Cervical Cancer Screening',
            data: cervicalScreenZip,
            color: '#008080'
        }, {

            name: 'Mammography Screening',
            data: MammographZip,
            color: '#ffc0cb'
        }, {
            name: 'Annual Check Up',
            data: annualCheckHood,
            color: '#c0dcec'
        }]
    }); // set container id and display chart*/



    $('#CHART_behavior').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Percentage of Unhealthy Behaviors by Neighborhood"
        },
        xAxis: {
            type: 'category',
            allowDecimals: false,
            title: {
                text: ""
            }
        },
        yAxis: {
            title: {
                text: "Percentage (%)"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    rotation: 270,
                    align: 'top',
                    //x: 10,
                    y: -5,
                    crop: true,
                    overflow: "none",
                    verticalAlign: 'top',
                    style: {
                        color: 'black',
                        font: '10px Arial, sans-serif',
                        //fontWeight: 'normal',
                    },
                    pointFormat: '{point.y}{point.percentage:.1f}%'
                }
            }
        },
        series: [{
            name: 'Uninsured',
            data: unInsuredZip,
            color: '#f1ced4'
        }, {
            name: 'Current Smokers',
            data: smokersZip,
            color: '#808080'
        }, {
            name: 'Binge Drinkers',
            data: bingeDrinkers,
            color: '#d8ddb8'
        }, {
            name: 'Obesity',
            data: obeseZip,
            color: '#e0ac8e'
        }, {
            name: 'Physical Inactivity',
            data: inactiveZip,
            color: '#6d3d38'
        }]
    });



    $('#CHART_health').highcharts({
        chart: {
            type: "column"
        },
        title: {
            text: "Percentage of Screening by Neighborhood"
        },
        xAxis: {
            type: 'category',
            allowDecimals: false,
            title: {
                text: ""
            }
        },
        yAxis: {
            title: {
                text: "Percentage (%)"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    align: 'top',
                    //x: 10,
                    y: -5,
                    crop: true,
                    overflow: "none",
                    verticalAlign: 'top',
                    style: {
                        color: 'black',
                        font: '11px Arial, sans-serif',
                        //fontWeight: 'normal',
                    },
                    pointFormat: '{point.y}{point.percentage:.1f}%'
                }
            }
        },
        series: [{
            name: 'Chronic Kidney Disease',
            data: kidneyZip,
            color: '#228b22'
        }, {
            name: 'Overall Cancer Prevelance',
            data: cancerZip,
            color: '#b394c1'
        }, {
            name: 'Asthma',
            data: asthmaZip,
            color: '#c0c0c0'
        }, {
            name: 'Diabetic',
            data: diabeticZip,
            color: '#db7093'
        }]
    });
});


//=========================================================== PLACES TRACT LEVEL =================================================================



// PLACES TRACT LEVEL GEOJSON
var tractGroup = new L.layerGroup();

var placesTractLayer = $.getJSON("PLACEStract_FeaturesToJSON.geojson", function(data) {
    L.geoJson(data, {
        style: styleCancer,
        onEachFeature: function(feature, layer) {
            //ADD POP UP
            layer.bindPopup('<h3>' + feature.properties.TractName + '</h3> <h5>(' + feature.properties.Hood +
                ')</h5> <p>Approximately <strong>' + feature.properties.POPULATION +
                '</strong>. In this tract, the estimated prevalence rate of cancer (excluding skin cancer) among adults, 18 years and older, is: <strong>' + feature.properties.CANCER + '%</strong> </p><p style="font-size: 9px;">Data is from the 2020 PLACES: Local Data for Better Health project</p>');
            layer.on('mouseover', function() {
                layer.setStyle({
                    fillOpacity: 0.3
                })
            })
            layer.on('mouseout', function() {
                layer.setStyle({
                    fillOpacity: 0.7
                })
            });
        }
    }).addTo(tractGroup)


});


//===================================================== CHARTS TABBED BOX  =============================================================

function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-blue", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-blue";
}


//=================================================== ZIPCODE OUTLINES =====================================================




// PLACES TRACT LEVEL GEOJSON
var zipOutlines = new L.layerGroup();

var zipOutlines_layer = $.getJSON("ZIP_CODE_outlines.geojson", function(data) {
    L.geoJson(data, {
        style: styleZIP,
        interactive: false
    }).addTo(zipOutlines)

});




//=================================================== CONTROL LAYER VISIBILITY =====================================================



var layerControl = {
    "Brooklyn Language Map": languageGroup,
    "Cancer Prevalence Rates (census tract level)": tractGroup,
    "Cancer Prevalence Rates (zip code level)": zipGroup,
    //"Legend" : languageLegend
}

var overlay = {
    "zips": zipOutlines
}

L.control.layers(layerControl, overlay, {
    //collapsed:false
}).addTo(mymap);

currentLegend = languageLegend

//SWITCH LEGENDS
mymap.on('baselayerchange', function(eventLayer) {
    if (eventLayer.name === "Brooklyn Language Map") {
        mymap.removeControl(currentLegend);
        currentLegend = languageLegend;
        languageLegend.addTo(mymap);
    } else if (eventLayer.name === "Cancer Prevalence Rates (census tract level)" || "Cancer Prevalence Rates (zip code level)") { // Or switch to the Population Change legend...
        mymap.removeControl(currentLegend);
        currentLegend = cancerLegend;
        cancerLegend.addTo(mymap);
    }
    // Switch to the Population legend...
});


//=========================================================== STYLES =================================================================

var cancerLegend = L.control({
    position: "bottomleft"
});
cancerLegend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Cancer Prevelance</h4>";
    div.innerHTML += '<i style="background: #91003f"></i><span>9.9% - 15%</span><br>';
    div.innerHTML += '<i style="background: #ce1256"></i><span>7.9% - 9.8%</span><br>';
    div.innerHTML += '<i style="background: #e7298a"></i><span>6.7% - 7.8%</span><br>';
    div.innerHTML += '<i style="background: #df65b0"></i><span>5.8% - 6.6%</span><br>';
    div.innerHTML += '<i style="background: #c994c7"></i><span>5% - 5.7%</span><br>';
    div.innerHTML += '<i style="background: #d4b9da"></i><span>4.1% - 4.9%</span><br>';
    div.innerHTML += '<i style="background: #e7e1ef"></i><span>0% - 4.1%</span><br>';
    div.innerHTML += '<i style="background: #606060"></i><span>No Data</span><br>';
    return div;
}

// homeLanguage POLYGON FILL COLORS
function getColor(d) {
    return d == "African languages" ? '#ccb8cbff' :
        d == "Arabic" ? '#fa9993ff' :
        d == "Chinese" ? '#c7e9b4' :
        d == "French" ? '#6b5b95' :
        d == "Greek" ? '#f7d9b6ff' :
        d == "Haitian Creole" ? '#30bfc7ff' :
        d == "Hebrew" ? '#eb554dff' :
        d == "Italian" ? '#91c1fdff' :
        d == "Mixed Indic languages" ? '#963f92ff' :
        d == "Polish" ? '#51eba6ff' :
        d == "Russian" ? '#e28513ff' :
        d == "Spanish" ? '#41ab5d' :
        d == "Urdu" ? '#e7298a' :
        d == "Yiddish" ? '#3288bd' :
        '#606060';
}
// homeLanguage POLYGON OUTLINE COLORS
function style(feature) {
    return {
        fillColor: getColor(feature.properties.Predominan),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 0.7
    };
}


// PLACES CHOROPLETH BY % CANCER PREVELANCE
function colorCancer(percent) {
    return percent > 9.8 ?
        "#91003f" :
        percent > 7.8 ?
        "#ce1256" :
        percent > 6.6 ?
        "#e7298a" :
        percent > 5.7 ?
        "#df65b0" :
        percent > 4.9 ?
        "#c994c7" :
        percent > 4.1 ?
        "#d4b9da" :
        percent > 0 ?
        "#e7e1ef" :
        "#606060";
}

// PLACES POLYGON OUTLINE COLORS
function styleCancer(feature) {
    return {
        fillColor: colorCancer(feature.properties.CANCER),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        //dashArray: '3',
        fillOpacity: 1
    };
};

function styleZIP(feature) {
    return {
        fillColor: feature.properties.ZIPCODE,
        weight: 2,
        opacity: 1,
        color: 'yellow',
        //dashArray: '3',
        fillOpacity: 0
    };
}

//=========================================================== NOTES =================================================================




//https://www.youtube.com/watch?v=fkVQiGAWM4k


// TABBED BOX SCRIPT

/*function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
} 



//https://www.youtube.com/watch?v=x51y0jhTqCE
//https://www.learnphalcon.com/post/show/43/creating-a-dynamic-chart-with-canvasjs
//https://jsfiddle.net/canvasjs/3c290nc1/
//https://canvasjs.com/samples/dashboards/
//https://jsfiddle.net/tdob14w2
//https://embed.plnkr.co/plunk/7TIkPR


//https://www.highcharts.com/demo/pie-drilldown
//https://www.highcharts.com/demo/chart-update
//https://www.highcharts.com/demo/responsive
//https://www.highcharts.com/demo/dumbbell
//https://www.highcharts.com/demo/column-basic
//https://www.highcharts.com/demo/column-stacked-and-grouped
//https://www.highcharts.com/demo/column-drilldown
//http://jsfiddle.net/wchmiel/enwz7bv8/
//http://jsfiddle.net/gh/get/jquery/1.7.2/highslide-software/highcharts.com/tree/master/samples/highcharts/drilldown/async/
//drill down - use screening % and drill by zip per category
//https://jsfiddle.net/tdob14w2

//languageLegend.addTo(languageGroup)
//layerControl.addOverlay(languageGroup, "Brooklyn Language Map");
//https://www.javaer101.com/en/article/12941644.html
//https://rdrr.io/cran/leaflet/man/remove.html



http://jsfiddle.net/nathansnider/ev3kojon/
https://learn.arcgis.com/en/projects/map-breast-cancer-differences-by-ethnicity/arcgis-pro/
https://datausa.io/profile/geo/new-york-ny#economy
https://stackoverflow.com/questions/35772717/searching-markers-with-leaflet-control-search-from-drop-down-list/35793616
https://jsfiddle.net/tdob14w2
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3843298/
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6625915/


  data.features.forEach(function(feature) {
    //PIE CHART
    languagePie.push([feature.properties.Predominan, feature.properties.TopLanCoun]);
  });

$('#mapContainer1').highcharts({
chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
series: [{
  name: 'Annual',
    data: languagePie
}]
});


https://www.tutorialspoint.com/display-the-dropdown-s-select-selected-value-on-console-in-javascript
https://www.encodedna.com/javascript/practice-ground/default.htm?pg=bind_xml_data_to_select_element_using_jquery_ajax
https://www.encodedna.com/jquery/dynamically-bind-populate-select-element-with-json-data-using-jquery-ajax.htm
https://gis.stackexchange.com/questions/179630/setting-bounds-and-making-map-bounce-back-if-moved-away
https://www.fla-shop.com/howto/map-with-dropdown/


Plunker - leaflet with custom dropdown list





https://stackoverflow.com/questions/35772717/searching-markers-with-leaflet-control-search-from-drop-down-list/35793616
https://www.stefanproell.at/2016/10/13/an-interactive-map-with-leaflet-geojson-and-jquery-using-bootstrap/


*/