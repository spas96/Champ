const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var today = new Date();

var arr_exist = [];
var arr_left = [];
var arr_right = [];
var arr_quantity = [];

function calendar_init(database) {
    document.getElementById("content").style.display = "none";
    document.getElementById("loader").style.display = "block";
    var start = new Date(today.getFullYear(), today.getMonth()).getDay();
    var days_num = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    if (start == 0) {
        start = 7;
    }
    scale_cal(start, days_num);

    document.getElementById("m_center").innerHTML = monthNames[today.getMonth()] + " " + today.getFullYear();

    for (var i = 0; i < days_num; i++) {
        document.getElementById("pos" + (i + start)).innerHTML = i + 1;
        document.getElementById("pos" + (i + start)).onclick = function() {
            date_click(this, database, start);
        };
    }



    database.database().ref("Calendar").on('value', function(snapshot) {

        snapshot.forEach(function(child) {
            if (new Date(child.key) < new Date(today.getDate() + "-" + monthNames[today.getMonth()] + "-" + today.getFullYear())) {
                database.database().ref("Calendar/" + child.key).remove();
            }
        });
    });

    color_tasks(database, start, today.getMonth(), today.getFullYear());

    document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("border", "3px solid black");
    document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("width", "calc(100% / 7 - 6px)");
    document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("height", "64px");


    date_click(today.getDate(), database, start);

}

function change_month(dir, database) {
    var current_month = parseInt(monthNames.indexOf(document.getElementById("m_center").textContent.split(" ")[0]));
    var current_year = parseInt(document.getElementById("m_center").textContent.split(" ")[1]);
    var new_month;
    var new_year = current_year;

    if (dir) {
        if (current_month < 11) {
            new_month = current_month + 1;
        } else {
            new_month = 0;
            new_year += 1;
        }
    } else {
        if (current_month > 0) {
            new_month = current_month - 1;
        } else {
            new_month = 11;
            new_year -= 1;
        }
    }




    var start = new Date(new_year, new_month).getDay();
    var days_num = new Date(new_year, new_month + 1, 0).getDate();
    if (start == 0) {
        start = 7;
    }
    scale_cal(start, days_num);


    var clear = document.getElementsByClassName("days");
    var this_month = false;
    if (new_month == parseInt(today.getMonth()) && new_year == parseInt(today.getFullYear())) {
        document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("border", "3px solid black");
        document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("width", "calc(100% / 7 - 6px)");
        document.getElementById("pos" + (today.getDate() + start - 1)).style.setProperty("height", "64px");
        this_month = true;
    } else {
        this_month = false;
    }

    for (var i = 0; i < clear.length; i++) {
        if (!this_month) {
            clear[i].style = "background-color: none;";
        }
        clear[i].innerHTML = "";
    }



    document.getElementById("m_center").innerHTML = monthNames[new_month] + " " + new_year;
    for (var i = 0; i < days_num; i++) {
        document.getElementById("pos" + (i + start)).innerHTML = i + 1;
        document.getElementById("pos" + (i + start)).onclick = function() {
            date_click(this, database, start);
        }
    }

    color_tasks(database, start, new_month, new_year);
}

function date_click(day, database) {
    var ref = database.database().ref("Calendar");
    var ref1 = database.database().ref("Meals");
    var flag = false;

    arr_exist = [];
    arr_left = [];
    arr_right = [];


    document.getElementById("sub_right").innerHTML = "";
    ref.on('value', function(snapshot) {
        if (isNaN(day)) {
            day = day.innerHTML;
        }

        snapshot.forEach(function(childSnapshot) {
            if (day == parseInt(childSnapshot.key.split("-")[0]) && document.getElementById("m_center").textContent.split(" ")[0] == childSnapshot.key.split("-")[1] && parseInt(document.getElementById("m_center").textContent.split(" ")[1]) == parseInt(childSnapshot.key.split("-")[2])) {
                flag = true;
                if (childSnapshot.numChildren() == 1) {
                    document.getElementById("tasks").innerHTML = childSnapshot.numChildren() + " MEAL SELECTED";
                } else {
                    document.getElementById("tasks").innerHTML = childSnapshot.numChildren() + " MEALS SELECTED";
                }
                document.getElementById("sel_date").innerHTML = day + " " + document.getElementById("m_center").textContent.split(" ")[0] + " " + document.getElementById("m_center").textContent.split(" ")[1];




                childSnapshot.forEach(function(child) {
                    var div = document.createElement("div");
                    div.innerHTML = child.key + " - " + child.val();
                    arr_exist.push(child.key);
                    div.onclick = function() {
                        if (this.hasAttribute("style")) {
                            this.removeAttribute("style");
                            for (var i = 0; i < arr_right.length; i++) {
                                if (arr_right[i] == child.key) {
                                    arr_right.splice(i, 1);
                                }
                            }
                        } else {
                            this.style = "background-color: lightblue";
                            arr_right.push(child.key);
                        }
                    }
                    document.getElementById("sub_right").appendChild(div);
                });




            }
        });

        document.getElementById("left").style.display = "block";
        document.getElementById("loader").style.display = "none";
    });


    document.getElementById("sub_left").innerHTML = "";
    ref1.on('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {

            if (!arr_exist.includes(childSnapshot.key)) {

                var div = document.createElement("div");
                div.innerHTML = childSnapshot.key;
                div.onclick = function() {
                    if (this.hasAttribute("style")) {
                        this.removeAttribute("style");
                        for (var i = 0; i < arr_left.length; i++) {
                            if (arr_left[i] == childSnapshot.key) {
                                arr_left.splice(i, 1);
                            }
                        }
                    } else {
                        this.style = "background-color: lightblue";
                        arr_left.push(childSnapshot.key);
                    }



                }

                document.getElementById("sub_left").appendChild(div);

            }

        });


    });


    if (!flag) {
        document.getElementById("tasks").innerHTML = "NO MEALS SELECTED";
        document.getElementById("sel_date").innerHTML = day + " " + document.getElementById("m_center").textContent.split(" ")[0] + " " + document.getElementById("m_center").textContent.split(" ")[1];
    }

    //alert(day.innerHTML + "-" + monthNames[parseInt(monthNames.indexOf(document.getElementById("m_center").textContent.split(" ")[0]))] + "-" + parseInt(document.getElementById("m_center").textContent.split(" ")[1]));   
}

function color_tasks(database, start, month, year) {
    var ref = database.database().ref("Calendar");

    ref.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (parseInt(monthNames.indexOf(childSnapshot.key.split("-")[1])) == month && childSnapshot.key.split("-")[2] == year) {
                document.getElementById("pos" + (parseInt(childSnapshot.key.split("-")[0]) + start - 1)).style.setProperty("background-color", "lightblue");
            }
        });

        document.getElementById("content").style.display = "block";
        document.getElementById("loader").style.display = "none";
    });


}

function add(database) {
    var ref;

    var input;
    var data;

    arr_quantity = [];

    for (var i = 0; i < arr_left.length; i++) {
        while (isNaN(input)) {
            input = prompt("Number of portions for '" + arr_left[i] + "':");
            if (isNaN(input)) {
                alert("Not a number!");
            }
        }
        arr_quantity.push(input);
        input = NaN;
    }
    for (var i = 0; i < arr_quantity.length; i++) {

        document.getElementById("sub_right").innerHTML = "";
        data = "{\"" + arr_left[i] + "\" : \"" + arr_quantity[i] + "\"}";
        ref = database.database().ref("Calendar/" + document.getElementById("sel_date").innerHTML.replace(/ /g, "-") + "/" + arr_left[i]);
        ref.set(arr_quantity[i]);
    }
    date_click(document.getElementById("sel_date").innerHTML.split(" ")[0], database);
}

function remove(database) {
    var ref = database.database().ref("Calendar/" + document.getElementById("sel_date").innerHTML.replace(/ /g, "-"));

    for (var i = 0; i < arr_right.length; i++) {
        document.getElementById("sub_right").innerHTML = "";
        ref.child(arr_right[i]).remove();
    }
    date_click(document.getElementById("sel_date").innerHTML.split(" ")[0], database);
}

function scale_cal(start, days_num) {

    if (days_num + start > 36) {
        document.getElementById("calendar").style = "height: 535px;";
    } else {
        if (days_num + start < 30) {
            document.getElementById("calendar").style = "height: 400px;";
        } else {
            document.getElementById("calendar").style = "height: 460px;";
        }
    }
}