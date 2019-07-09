/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        //Notification
        var app = this;
        app.push = PushNotification.init({
            "android": {
                "senderID": "1092837623102"
                //,"icon" : 	'android_icon'
                //,"iconColor": "#ff6600"
            },
            "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
            },
            "windows": {}
        });

        app.push.on('registration', function(data) {
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                console.log('new registrationId:', data.registrationId);
                var node = document.createElement("p");
                var textnode = document.createTextNode('registrationId:' + data.registrationId);
                node.appendChild(textnode);
                document.getElementById("deviceready").appendChild(node);

                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
            }
        });

        app.push.on('error', function(e) {
            console.log("push error = " + e.message);
        });
        
        app.push.on('notification', function(data) {
            app.push.finish(function() {
                //Force to show data
                console.log('notification-app-push-success');
            }, function() {
                console.log('notification-app-push-error');
            });
        });
        //End - Notification    
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        


        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();