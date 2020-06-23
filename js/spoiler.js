function clickRadio(el) {
    var siblings = document.querySelectorAll("input[type='radio'][name='" + el.name + "']");

    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] != el) {
            siblings[i].oldChecked = false;
        }
    }

    if (el.oldChecked) {
        el.checked = false;
    }

    el.oldChecked = el.checked;
}