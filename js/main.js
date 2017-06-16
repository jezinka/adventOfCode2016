Array.prototype.byCount = function () {
    var array_length = this.length, dict = {};
    for (var i = 0; i < array_length; i++) {
        var letter = this[i];
        if (!letter) {
            continue
        }

        if (dict[letter] === undefined) {
            dict[letter] = 1
        } else {
            ++dict[letter]
        }
    }

    var keys = Object.keys(dict);

    return keys.sort(function (a, b) {
        if (dict[b] !== dict[a]) {
            return dict[b] - dict[a];
        }
        return a.charCodeAt(0) - b.charCodeAt(0);
    });
};

function solution() {

    var sumId = countSum(data);

    // 89274 - zły wynik
    // 361301 - też zły ;)
    console.log(sumId);
}

function countSum(data) {

    var instructions = data.trim().replace(/ {2,}/g, " ").replace(/-/gi, "").split(" ");

    var sumId = 0;

    for (var i = 0; i < instructions.length; i++) {
        var instruction = instructions[i];
        var encrypted = instruction.match(/^[a-z]+/)[0];
        var id = parseInt(instruction.match(/\d+/)[0]);
        var checksum = instruction.match(/\[([a-z]{5})\]/)[1];

        var letters_table = encrypted.split("");
        var sorted_letters_table = letters_table.byCount();
        var counted_checksum = sorted_letters_table.slice(0, 5).join('');

        if (checksum === counted_checksum) {
            sumId += id
        }
    }

    return sumId;
}

function test() {
    var data = "aaaaa-bbb-z-y-x-123[abxyz] a-b-c-d-e-f-g-h-987[abcde] not-a-real-room-404[oarel] totally-real-room-200[decoy]";
    if (countSum(data) === 1514) {
        console.log("Wynik testu prawidłowy")
    } else {
        console.log("Wynik testu nieprawidłowy")
    }
}

function test_equal_occurence_of_letters() {
    var data = "molgbzqfib-bdd-mrozexpfkd-289[bdfmo]";
    if (countSum(data) === 289) {
        console.log("Wynik testu prawidłowy")
    } else {
        console.log("Wynik testu nieprawidłowy")
    }
}


