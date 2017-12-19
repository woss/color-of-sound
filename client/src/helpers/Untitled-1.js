// CHANGE TEXTFIELD VALUES:
function set_rgb(field, r, g, b) {
    field.value = r + ', ' + g + ', ' + b;
}
// UPDATE DISPLAY:
function update_sample(sample, color) {
    sample.style.backgroundColor = '#' + color;
}
// PROCESS INPUT:
function submit_action() {
    var field1 = document.mixer.enter1; var field2 = document.mixer.enter2;
    if (!valid_color(field1.value) || field1.value.length < 6) field1.value = '000000';
    if (!valid_color(field2.value) || field2.value.length < 6) field2.value = '000000';
    enter_color(field1);//(initiate once!)
}
function enter_color(source, sample) {
    if (valid_color(source.value)) { set_uppercase(source); combine(); }
    else if (source.value.length == 6) { source.value = sample.style.backgroundColor.substring(1); }
}
// CONVERSIONS:
function get_dec(hex) {
    if (hex == 'F') return 15; else if (hex == 'E') return 14; if (hex == 'D') return 13; else if (hex == 'C') return 12;
    if (hex == 'B') return 11; else if (hex == 'A') return 10; else return hex;
}
function get_hex(dec) {
    if (dec == 15) return 'F'; else if (dec == 14) return 'E'; if (dec == 13) return 'D'; else if (dec == 12) return 'C';
    if (dec == 11) return 'B'; else if (dec == 10) return 'A'; else return '' + dec;
}
function dec_to_hex(r, g, b) {
    var c1 = get_hex(Math.floor(r / 16));
    var c2 = get_hex(Math.floor(r % 16));
    var c3 = get_hex(Math.floor(g / 16));
    var c4 = get_hex(Math.floor(g % 16));
    var c5 = get_hex(Math.floor(b / 16));
    var c6 = get_hex(Math.floor(b % 16));
    return c1 + c2 + c3 + c4 + c5 + c6;
}
function hex_to_dec(c, start) {
    var c1 = get_dec(c.substring(start, start + 1));
    var c2 = get_dec(c.substring(start + 1, start + 2));
    return (c1 * 16) + c2 * 1;
}
function web_safe(r, g, b) {
    var tmp;//(holds remainder of modulus)
    tmp = r % 51; if (tmp > 25) { tmp = r + 51 - tmp; } else { tmp = r - tmp; }
    var c1 = get_hex(rounded(tmp / 17));
    tmp = g % 51; if (tmp > 25) { tmp = g + 51 - tmp; } else { tmp = g - tmp; }
    var c2 = get_hex(rounded(tmp / 17));
    tmp = b % 51; if (tmp > 25) { tmp = b + 51 - tmp; } else { tmp = b - tmp; }
    var c3 = get_hex(rounded(tmp / 17));
    return c1 + c1 + c2 + c2 + c3 + c3;
}
// CALCULATE OUTPUT:
function combine() {
    var mixer = document.mixer;
    var c1 = mixer.enter1.value;
    var c2 = mixer.enter2.value;
    var r1, r2, g1, g2, b1, b3;
    r1 = hex_to_dec(c1, 0); r2 = hex_to_dec(c2, 0);
    g1 = hex_to_dec(c1, 2); g2 = hex_to_dec(c2, 2);
    b1 = hex_to_dec(c1, 4); b2 = hex_to_dec(c2, 4);

    var r3, g3, b3;
    r3 = rounded((r1 + r2) / 2); g3 = rounded((g1 + g2) / 2); b3 = rounded((b1 + b2) / 2);
    var result = dec_to_hex(r3, g3, b3);
    var result_ws = web_safe(r3, g3, b3);
    var r4, g4, b4;
    r4 = hex_to_dec(result_ws, 0); g4 = hex_to_dec(result_ws, 2); b4 = hex_to_dec(result_ws, 4);

    mixer.result.value = result;
    mixer.result_ws.value = result_ws;

    update_sample(mixer.sample1, c1);
    update_sample(mixer.sample2, c2);
    update_sample(mixer.sample3, result);
    update_sample(mixer.sample4, result_ws);

    set_rgb(mixer.rgb1, r1, g1, b1);
    set_rgb(mixer.rgb2, r2, g2, b2);
    set_rgb(mixer.rgb3, r3, g3, b3);
    set_rgb(mixer.rgb4, r4, g4, b4);
}