$("#add_user").submit(function (event) {
    alert("Data inserted successfully")
})

$("#update_user").submit(function (event) {
    console.log('-> Update triggered')
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    var id

    $.map(unindexed_array, function (n, i) {
        if (n['name'] !== 'id') {
            data[n['name']] = n['value']
        } else {
            id = n['value']
        }
    })

    for (key in data) {
        console.log(`data[${key}]: ${data[key]}`)
    }

    var request = {
        type: 'PUT',
        url: "http://localhost:3000/users/" + id,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        error: function (e) {
            console.log(e)
        }
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    })

})

if (window.location.pathname == "/home") {
    $ondelete = $(".table tbody tr.make-changes td a.delete")
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            url: "http://localhost:3000/users/" + id,
            method: "DELETE",
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully")
                location.reload()
            })
        }
    })
}