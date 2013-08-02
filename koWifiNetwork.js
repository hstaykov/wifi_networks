function Wifi(data) {
    console.log(data);
    this.name = ko.observable(data.name);
    this.password = ko.observable(data.password);
    this.comment = ko.observable(data.comment);
    this.ipaddress = ko.observable(data.ipaddress);
}



function WifiListViewModel() {
    // Data
    var dataRef = new Firebase("https://wifinetwork.firebaseio.com");
    var self = this;
    self.wifis = ko.observableArray([]);
    self.newWifiName = ko.observable();
    self.newWifiPassword = ko.observable();
    self.newWifiComment = ko.observable();
    self.newWifiIpAddress = ko.observable();

    //Other variables



    console.log("Wer are in th viewModel");
    dataRef.on("child_added", function(dbResult) {
        var result = eval(dbResult.val());
        // console.log(result);
        self.wifis.push(result);
    });


    // Operations
    self.addWifi = function() {
        console.log("We are adding element");

        if (ValidateIPaddress(this.newWifiIpAddress())) {

            var newWifi = new Wifi({
                name: this.newWifiName(),
                password: this.newWifiPassword(),
                comment: this.newWifiComment(),
                ipaddress: this.newWifiIpAddress()
            });
            // self.wifis.push(newWifi);

            dataRef.push({
                name: newWifi.name(),
                password: newWifi.password(),
                comment: newWifi.comment(),
                ipaddress: newWifi.ipaddress()
            });
            // Cleaning the form fields
            self.newWifiName("");
            self.newWifiPassword("");
            self.newWifiComment("");
            self.newWifiIpAddress("");
            $("#errorAdd").html("");
        }
        else{
            $("#errorAdd").html("This IP is not correct...");
        }
    };

    self.downloadClick = function() {
        

    };

}

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }

    return (false)
}

ko.applyBindings(new WifiListViewModel());