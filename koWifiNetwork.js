function Wifi(data) {
    console.log(data);
    this.name = ko.observable(data.name);
    this.password = ko.observable(data.password);
    this.comment = ko.observable(data.comment);
}



function WifiListViewModel() {
    // Data
    var dataRef = new Firebase("https://wifinetwork.firebaseio.com");
    var self = this;
    self.wifis = ko.observableArray([]);
    self.newWifiName = ko.observable();
    self.newWifiPassword = ko.observable();
    self.newWifiComment = ko.observable();

    console.log("Wer are in th viewModel");
    dataRef.on("child_added", function(dbResult) {
       var result = eval(dbResult.val());
       console.log(result);
       self.wifis.push(result);
    });


    // Operations
    self.addWifi = function() {
        console.log("We are adding element");
        
        var newWifi = new Wifi({
            name: this.newWifiName(),
            password: this.newWifiPassword(),
            comment: this.newWifiComment()
        });
       // self.wifis.push(newWifi);

        dataRef.push({name: newWifi.name(), password: newWifi.password(), comment: newWifi.comment()});
        // Cleaning the form fields
        self.newWifiName("");
        self.newWifiPassword("");
        self.newWifiComment("");
    };

}


ko.applyBindings(new WifiListViewModel());