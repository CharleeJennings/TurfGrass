function Weed(name, start, peak, base) {
    this.name = name;
    this.start = start;
    this.peak = peak;
    this.base = base;
    this.datalist = [];
    this.cumulativeHeatUnits = 0;
    this.color = '#FFFFFF';
}

var weeds = [];

var tropicalSignalgrass = new Weed("Tropical Signalgrass",
                              73, 156, 13);
var smoothCrabgrass = new Weed("Smooth Crabgrass",
                          42, 140, 12);
var henbit = new Weed("Henbit",
                  2300, 3200, 0);
var commonChickweed = new Weed("Common Chickweed",
                          2300, 3200, 0);
var giantFoxtail = new Weed("Giant Foxtail",
                       83, 245, 9);
var yellowFoxtail = new Weed("Yellow Foxtail",
                        121, 249, 9);
var greenFoxtail = new Weed("Green Foxtail",
                           116, 318, 9);
var woolyCupgrass = new Weed("Wooly Cupgrass",
                            106, 219, 9);
var fieldSanbur = new Weed("Field Sanbur",
                          99, 286, 9);
var goosegrass = new Weed("Goosegrass",
                         450, 550, 10);
var bluegrassSeedhead = new Weed("Bluegrass Seedhead",
                                30, 45, 13);

weeds.push(tropicalSignalgrass);
weeds.push(smoothCrabgrass);
weeds.push(henbit);
weeds.push(commonChickweed);
weeds.push(giantFoxtail);
weeds.push(yellowFoxtail);
weeds.push(greenFoxtail);
weeds.push(woolyCupgrass);
weeds.push(fieldSanbur);
weeds.push(goosegrass);
weeds.push(bluegrassSeedhead);  

